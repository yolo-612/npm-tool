<script lang="ts" setup>
import { computed } from 'vue';
import VTIconExternalLink from './icons/VTIconExternalLink.vue';

const props = defineProps<{
  href?: string;
  noIcon?: boolean;
  self?: boolean;
}>();

const isExternal = computed(
  () => props.href && /^[a-z]+:/i.test(props.href) && !props.self
);
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    class="vt-link"
    :class="{ link: href }"
    :href="href"
    :target="isExternal ? '_blank' : '_self'"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <VTIconExternalLink v-if="isExternal && !noIcon" class="vt-link-icon" />
  </component>
</template>
