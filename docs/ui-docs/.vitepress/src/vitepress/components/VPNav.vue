<script setup lang="ts">
import { useNav } from '../composables/nav';
import { useSidebar } from '../composables/sidebar';
import VPNavBar from './VPNavBar.vue';
import VPNavScreen from './VPNavScreen.vue';
import { provide, onMounted } from 'vue';

const { isScreenOpen, closeScreen, toggleScreen } = useNav();
const { hasSidebar } = useSidebar();

provide('close-screen', closeScreen);
onMounted(() => {
  window.addEventListener('scroll', () => {
    window.document.querySelector('.VPNavBar').style.opacity =
      window.scrollY < 10 ? '0.85' : '1';
  });
});
</script>

<template>
  <header class="VPNav nav-bar" :class="{ stick: !hasSidebar }">
    <VPNavBar :is-screen-open="isScreenOpen" @toggle-screen="toggleScreen" />
    <VPNavScreen :open="isScreenOpen" />
  </header>
</template>

<style lang="scss" scoped>
.VPNav {
  position: relative;
  top: 0;
  left: 0;
  z-index: var(--vp-z-index-nav);
  .VPNavBar {
    opacity: 0.85;
  }
}

@media (min-width: 960px) {
  .VPNav {
    position: fixed;
    top: var(--vt-banner-height, 0px);
    width: 100%;
  }
}
</style>
