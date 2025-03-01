<script lang="ts" setup>
import { useData } from 'vitepress';
import { inject } from 'vue';
import { MenuItemWithLink } from '../../core';
import { isActive } from '../support/utils';

defineProps<{
  item: MenuItemWithLink;
}>();

const { page } = useData();
const closeSideBar = inject('close-sidebar') as () => void;
</script>

<template>
  <a
    :class="{ link: true, active: isActive(page.relativePath, item.link) }"
    :href="item.link"
    @click="closeSideBar"
  >
    <p class="link-text">{{ item.text }}</p>
  </a>
</template>

<style lang="scss" scoped>
.link {
  display: block;
  padding: 0.625rem 4px 0.625rem 1.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
  margin-left: 4px;
  border-radius: 8px;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link.active .link-text {
  font-weight: 600;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link.active {
  background-color: var(--vt-c-brand-light);
  .link-text {
    font-weight: 600;
    color: var(--vt-c-brand);
    transition: color 0.25s;
  }
}

.link-text {
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
}
</style>
