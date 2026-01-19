<script setup lang="ts">
defineProps<{
    title?: string;
    content?: string;
  }>();

const slots = useSlots();
</script>

<template>
  <div class="PageHeader">
    <div class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-if="content || slots.content" class="content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .PageHeader {
    background-color: var(--sdesign-color-bg-1);
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .title {
      font-size: var(--sdesign-font-size-extra-large);
      font-weight: var(--sdesign-font-weight-medium);
    }
    .content {
      font-size: var(--sdesign-font-size-regular);
      color: var(--sdesign-font-color-2);
      margin-top: 8px;
      line-height: var(--sdesign-font-line-height-regular);
    }
  }
</style>
