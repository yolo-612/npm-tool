<script lang="ts" setup>
import { MenuItemWithLink } from '../../core';
import VPSidebarLink from './VPSidebarLink.vue';
import { isActive } from '../support/utils';
import { useData } from 'vitepress';

const props = defineProps<{
  text: string;
  items: MenuItemWithLink[];
}>();

const { page } = useData();
function hasActiveLink() {
  const { relativePath } = page.value;
  return props.items.some((item) => isActive(relativePath, item.link));
}
</script>

<template>
  <section class="VPSidebarGroup">
    <div class="title">
      <h2 class="title-text" :class="{ active: hasActiveLink() }">
        {{ text }}
      </h2>
    </div>

    <template v-for="item in items" :key="item.link">
      <VPSidebarLink :item="item" />
    </template>
  </section>
</template>

<style scoped>
.title {
  padding: 6px 0;
}

@media (min-width: 960px) {
  .title {
    padding: 4px 0;
  }
}

.title-text {
  padding: 0.35rem 1.5rem 0.35rem 1.25rem;
  /* font-size: 1rem; */
  color: var(--vt-text-color);
  font-size: 13px;
  /* font-weight: 700; */
  margin: 0;
}
</style>
