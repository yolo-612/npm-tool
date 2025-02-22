<script lang="ts" setup>
import VPNavBarTitle from './VPNavBarTitle.vue';
import VPNavBarSearch from './VPNavBarSearch.vue';
import VPNavBarMenu from './VPNavBarMenu.vue';
import VPNavBarAppearance from './VPNavBarAppearance.vue';
import VPNavBarSocialLinks from './VPNavBarSocialLinks.vue';
import VPNavBarExtra from './VPNavBarExtra.vue';
import VPNavBarHamburger from './VPNavBarHamburger.vue';

defineProps<{
  isScreenOpen: boolean;
}>();
</script>

<template>
  <div class="VPNavBar">
    <div class="container">
      <div class="title">
        <VPNavBarTitle />
        <VPNavBarSearch class="search" />
        <VPNavBarHamburger
          class="hamburger"
          :active="isScreenOpen"
          @click="$emit('toggle-screen')"
        />
      </div>

      <div class="content">
        <VPNavBarMenu class="menu" />
        <VPNavBarAppearance class="appearance" />
        <VPNavBarSocialLinks class="social-links" />
        <VPNavBarExtra class="extra" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VPNavBar {
  position: relative;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 0 12px 0 24px;
  height: var(--vt-nav-height);
  background-color: var(--vt-c-bg);
  transition: border-color 0.5s, background-color 0.5s;
}

@media (min-width: 768px) {
  .VPNavBar {
    padding: 0 40px 0 40px;
  }
}

@media (min-width: 1280px) {
  .VPNavBar {
    padding: 0 40px;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  // max-width: var(--vp-screen-max-width);
  height: 60px;
}

.title {
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: var(vt-c-text-1);
}

.search {
  height: 22px;
  border-left: 1px solid #d8dada;
  margin-left: 140px;
}
.VPNavBarSearch {
  padding-left: 20px;
}

:deep(.DocSearch-Button) {
  &:hover {
    .DocSearch-Button-Placeholder,
    .DocSearch-Search-Icon,
    .DocSearch-Button-Key {
      color: var(--vt-c-brand);
    }
  }
}

:deep(.DocSearch-Button-Placeholder) {
  color: var(--vt-c-text-1);
}
:deep(.DocSearch-Search-Icon) {
  color: var(--vt-c-text-1);
  top: 0;
}
:deep(.DocSearch-Button-Key) {
  background-color: var(--vt-c-divider);
  color: var(--vt-c-text-1);
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.menu + .appearance {
  margin-left: 8px;
}
.menu + .social-links {
  margin-left: 12px;
}
.appearance + .social-links {
  margin-left: 12px;
}
</style>
