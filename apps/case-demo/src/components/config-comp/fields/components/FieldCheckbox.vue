<script lang="ts" setup>
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';

const props = defineProps({
  options: {
    type: Array as () => any[],
  },
  outOptions: {
    type: Array as () => any[],
  },
});
defineOptions({
  name: 'FieldCheckbox',
  inheritAttrs: false,
});
</script>

<template>
  <div class="field-checkbox">
    <div v-if="props.outOptions?.length" class="field-checkbox-out">
      <el-checkbox v-for="out in props.outOptions" :key="out.value" v-bind="out" :label="out.value">
        {{ out.label }}
      </el-checkbox>
    </div>
    <el-checkbox-group v-bind="$attrs">
      <el-checkbox v-for="item in props.options" :key="item.value" v-bind="item" :label="item.value">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style lang="scss" scoped>
.field-checkbox {
  display: flex;
}
.field-checkbox-out{
  margin-right: 20px;
}
</style>
