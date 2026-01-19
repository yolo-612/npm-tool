<script lang="ts" setup>
import FieldButton from '@/src/fields/components/FieldButton.vue';
import { IFieldButtonProps } from '@/src/fields';

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
