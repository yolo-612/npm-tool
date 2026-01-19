<script lang="ts" setup>
// import { ElSteps, ElStep } from 'element-plus';
import AcspForm from '@/src/form';
import type { IStepFormConfigItem } from './types';

export interface IStepFormProps {
  modelValue: number;
  formConfig: IStepFormConfigItem[];
  submitBtnText: string;
}
const props = withDefaults(defineProps<IStepFormProps>(), {
  modelValue: 0,
  submitBtnText: '提交',
});

const emits = defineEmits(['update:modelValue', 'change', 'pre', 'next']);

defineOptions({
  name: 'StepForm',
  inheritAttrs: false,
});

/** 状态 */
const active = ref(props.modelValue);
/** step的长度 */
const stepLen = computed(() => props.formConfig.length);
/** 当前表单配置 */
const currentFormConfig = computed(() => {
  const { subFormList = [] } = props.formConfig[active.value] || {};
  return { subFormList };
});
/** 表单数据 */
const currentFormData = computed(() => props.formConfig[active.value]?.dataSource || {});

/** 上一步  */
const onClickPre = () => {
  active.value--;
  emits('update:modelValue', active.value);
  emits('pre', active.value);
};
/** 下一步  */
const onClickNext = async () => {
  /** 校验表单 */
  if (acspFormRef.value) {
    const res = await acspFormRef.value.validate();
    if (!res) return;
  }
  active.value++;
  emits('update:modelValue', active.value);
  emits('next', active.value);
};
const acspFormRef = ref();

defineExpose({
  formRef: acspFormRef,
});

const stepSlotNameList = ref(['icon', 'description', 'title']);
</script>

<template>
  <div class="acsp-step-form">
    <el-steps :active="active" v-bind="$attrs" class="acsp-step-form-steps">
      <el-step v-for="({ dataSource, subFormList, ...rest }, index) in props.formConfig" :key="index" v-bind="rest">
        <template  v-for="slotName in stepSlotNameList" :key="slotName" #[slotName]>
          <slot v-if="$slots[slotName]" :name="slotName" v-bind="rest" />
        </template>
      </el-step>
    </el-steps>
    <div class="acsp-step-form-content">
      <AcspForm ref="acspFormRef" v-model="currentFormData" :formConfig="currentFormConfig" />
      <div class="acsp-step-form-footer">
        <el-button v-if="active > 0" @click="onClickPre">上一步</el-button>
        <el-button v-if="active < stepLen" type="primary" @click="onClickNext">
          {{ active === stepLen - 1 ? submitBtnText : '下一步' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.acsp-step-form {
  padding: 20px;
}
.acsp-step-form:has(.el-steps--vertical) {
  display: flex;
  .acsp-step-form-steps {
    max-width: 30%;
    height: 80%;
    margin-top: 16px;
  }
  .acsp-step-form-content {
    flex: 1;
  }
}
</style>
