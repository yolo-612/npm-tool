<script setup lang="ts">
import { Header, useData } from 'vitepress';
import { resolveHeaders, useActiveAnchor } from '../composables/outline';
import {
  computed,
  inject,
  ref,
  onBeforeUnmount,
  onMounted,
  getCurrentInstance,
  watch
} from 'vue';
import bus from '../bus';

const { page, frontmatter } = useData();
const container = ref();
const marker = ref();
useActiveAnchor(container, marker);

const filterHeaders = inject('filter-headers', null) as any;
const pagepipeHeaders = ref([] as Header[]);
const isPagepipe = ref(false);

const filteredHeaders = computed(() => {
  return filterHeaders
    ? page.value.headers.map((h) => {
        return filterHeaders(h) ? h : Object.assign({}, h, { hidden: true });
      })
    : page.value.headers;
});

const handleClick = ({ target: el }: Event) => {
  const id = '#' + (el as HTMLAnchorElement).href!.split('#')[1];
  const heading = document.getElementById(id) as HTMLAnchorElement;
  heading?.focus();
};

watch(
  () => page.value,
  (newValue, oldValue) => {
    isPagepipe.value = false;
  }
);
const handleFilterHeaders = (id: string): void => {
  var headers: Header[] = [];
  var content = Array.from(
    document.querySelectorAll(`.${id} .header-anchor`)
  ) as HTMLAnchorElement[];

  content.map((x) => {
    var name = decodeURIComponent(x.hash).replace('#', '');
    headers.push({
      level: 2,
      slug: name,
      title: name
    });
  });

  pagepipeHeaders.value = headers;
  isPagepipe.value = true;
};
// 获取组件ID
bus.on('changePagePipe', handleFilterHeaders as any);

onBeforeUnmount(() => {
  bus.off('changePagePipe', handleFilterHeaders as any);
  isPagepipe.value = false;
});
</script>

<template>
  <div class="VPContentDocOutline" ref="container">
    <div class="outline-marker" ref="marker" />
    <div
      class="outline-title"
      v-if="
        resolveHeaders(isPagepipe ? pagepipeHeaders : filteredHeaders).length >
        0
      "
    >
      子目录
    </div>
    <nav aria-labelledby="doc-outline-aria-label">
      <span id="doc-outline-aria-label" class="visually-hidden"
        >Table of Contents for current page</span
      >
      <ul class="root">
        <li
          v-for="({ text, link, children, hidden }, index) in resolveHeaders(
            isPagepipe ? pagepipeHeaders : filteredHeaders
          )"
          :key="index"
          v-show="!hidden"
        >
          <a class="outline-link" :href="link" @click="handleClick">{{
            text
          }}</a>
          <ul v-if="children && frontmatter.outline === 'deep'">
            <li
              v-for="({ text, link, hidden }, index) in children"
              v-show="!hidden"
              :key="index"
            >
              <a
                class="outline-link nested"
                :href="link"
                @click="handleClick"
                >{{ text }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.VPContentDocOutline {
  font-size: 13px;
  font-weight: 500;
  position: relative;
}

.outline-title {
  font-weight: 700;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.4px;
}

.outline-link {
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  line-height: 28px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-left: 1em;
}

.outline-marker {
  opacity: 0;
  position: absolute;
  background-color: var(--vt-c-brand);
  border-radius: 4px;
  width: 4px;
  height: 20px;
  top: 32px;
  left: -12px;
  z-index: 0;
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), opacity 0.25s,
    background-color 0.5s;
}

.root {
  z-index: 1;
  position: relative;
}
</style>
