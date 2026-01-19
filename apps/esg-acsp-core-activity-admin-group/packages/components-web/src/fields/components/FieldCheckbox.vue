<script lang="ts" setup>
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';
import { recompute } from '@/utils';

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
const opts = computed(() => recompute(props.options));
const outOpts = computed(() => recompute(props.outOptions));
</script>

<template>
  <div class="field-checkbox">
    <div v-if="outOpts?.length" class="field-checkbox-out">
      <el-checkbox v-for="out in (outOpts as any)" :key="out.value" v-bind="out" :label="out.value">
        {{ out.label }}
      </el-checkbox>
    </div>
    <el-checkbox-group v-bind="$attrs">
      <el-checkbox v-for="item in (opts as any)" :key="item.value" v-bind="item" :label="item.value">
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
