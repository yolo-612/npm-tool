<script lang="ts" setup>
import FieldButton from '@/components/config-comp/fields/components/FieldButton.vue';
import type { IFieldButtonProps } from '@/components/config-comp/fields/types';

defineProps<{ list: IFieldButtonProps[] }>();
</script>

<template>
  <div class="column-field-buttons">
    <template v-for="btn in list" :key="btn.code || btn.label">
      <FieldButton v-if="!btn.hidden" v-bind="btn" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.column-field-buttons {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}
</style>
