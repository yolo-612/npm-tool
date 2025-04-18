import { onMounted, onUnmounted, onUpdated, Ref } from 'vue';
import { Header } from 'vitepress';
import { useMediaQuery } from '@vueuse/core';
import { MenuItemWithLink } from '../../core';

interface HeaderWithChildren extends Header {
  children?: Header[];
  hidden?: boolean;
}

interface MenuItemWithLinkAndChildren extends MenuItemWithLink {
  children?: MenuItemWithLinkAndChildren[];
  hidden?: boolean;
}

export function resolveHeaders(headers: HeaderWithChildren[]) {
  return mapHeaders(groupHeaders(headers));
}

function groupHeaders(headers: Header[]): HeaderWithChildren[] {
  headers = headers.map((h) => Object.assign({}, h));
  let lastH2: HeaderWithChildren | undefined;
  for (const h of headers) {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2 && h.level <= 3) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  }
  return headers.filter((h) => h.level === 2);
}

function mapHeaders(
  headers: HeaderWithChildren[]
): MenuItemWithLinkAndChildren[] {
  return headers.map((header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children: header.children ? mapHeaders(header.children) : undefined,
    hidden: header.hidden
  }));
}

export function useActiveAnchor(
  container: Ref<HTMLElement>,
  bg: Ref<HTMLElement>
) {
  const isOutlineEnabled = useMediaQuery('(min-width: 1280px)');
  const onScroll = throttleAndDebounce(setActiveLink, 150);

  function setActiveLink(): void {
    if (!isOutlineEnabled.value) {
      return;
    }

    const links = getSidebarLinks();
    const anchors = getAnchors(links);

    // page bottom - highlight last one
    if (
      anchors.length &&
      window.scrollY + window.innerHeight === document.body.scrollHeight
    ) {
      activateLink(anchors[anchors.length - 1].hash);
      return;
    }

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];

      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);

      if (isActive) {
        history.replaceState(null, document.title, hash ? hash : ' ');
        activateLink(hash);
        return;
      }
    }
  }

  let prevActiveLink: HTMLAnchorElement | null = null;

  function activateLink(hash: string | null): void {
    if (prevActiveLink) {
      prevActiveLink.classList.remove('active');
    }

    const activeLink = (prevActiveLink =
      hash == null
        ? null
        : (container.value.querySelector(
            `a[href="${decodeURIComponent(hash)}"]`
          ) as HTMLAnchorElement));
    if (activeLink) {
      activeLink.classList.add('active');
      bg.value.style.opacity = '1';
      bg.value.style.top = activeLink.offsetTop + 32 + 'px';
    } else {
      bg.value.style.opacity = '0';
      bg.value.style.top = '32px';
    }
  }

  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener('scroll', onScroll);
  });

  onUpdated(() => {
    // sidebar update means a route change
    activateLink(location.hash);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
}

function getSidebarLinks() {
  return Array.from(
    document.querySelectorAll('.outline-link')
  ) as HTMLAnchorElement[];
}
function getAnchors(sidebarLinks: HTMLAnchorElement[]) {
  return (
    Array.from(
      document.querySelectorAll('.content .header-anchor')
    ) as HTMLAnchorElement[]
  ).filter((anchor) =>
    sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash)
  );
}

// magic number to avoid repeated retrieval
function getPageOffset() {
  return (document.querySelector('.nav-bar') as HTMLElement)?.offsetHeight;
}
function getAnchorTop(anchor: HTMLAnchorElement) {
  const pageOffset = getPageOffset();
  try {
    return anchor.parentElement!.offsetTop - pageOffset - 15;
  } catch (e) {
    return 0;
  }
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement | undefined
): [boolean, string | null] {
  const scrollTop = window.scrollY;

  if (index === 0 && scrollTop === 0) {
    return [true, null];
  }

  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null];
  }

  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, decodeURIComponent(anchor.hash)];
  }

  return [false, null];
}

function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeout: number;
  let called = false;

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    } else {
      timeout = setTimeout(fn, delay) as any;
    }
  };
}
