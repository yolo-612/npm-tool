<script lang="ts" setup>
// import { ElDialog } from 'element-plus';
import AcspForm, { type ISubForm } from '@/src/form';

export interface DialogForm {
  /** 弹窗是否显示 */
  modelValue: boolean;
  /** 表单配置 */
  subFormList: ISubForm[];
  /** 表单数据源 */
  formData: any;
}

const props = withDefaults(defineProps<DialogForm>(), {
  modelValue: false,
});

// const emits = defineEmits({
//   'update:modelValue': (val: boolean) => true,
//   close: (val: any) => true,
// });
const emits = defineEmits<{(e: 'update:modelValue', val: boolean): void; (e: 'close', val: any): void }>();

defineOptions({
  name: 'DialogForm',
  inheritAttrs: false,
});

const applyConfig = computed(() => ({ subFormList: props.subFormList }));
const applyData = computed(() => props.formData);
</script>

<template>
  <div>
    <el-dialog
      :model-value="props.modelValue"
      v-bind="$attrs"
      class="dialog-form-wrapper"
      @close="emits('update:modelValue', false)">
      <template v-if="$slots.header" #header>
        <slot name="header"></slot>
      </template>
      <template v-if="$slots.footer" #footer>
        <slot name="footer"></slot>
      </template>
      <AcspForm v-model="applyData" :form-config="applyConfig" />
    </el-dialog>
  </div>
</template>
