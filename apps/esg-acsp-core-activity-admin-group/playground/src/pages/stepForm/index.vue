<script lang="ts" setup>
import { AcspStepForm } from '@fpkg/components-web';
import useAction from './composables/useDemoActions';
import useConfig from './composables/useDemoConfig';
import { nextTick, onMounted, ref } from 'vue';

const state = useAction();
const config = useConfig(state);

const activeOut = ref(0);
const stepFormRef = ref();

onMounted(async () => {
  await nextTick();
  const formRef = stepFormRef.value.formRef;
  formRef.validate();
});
const onNext = () => {
  /* 测试表单ref会不会变动 会的！*/
  const formRef = stepFormRef.value.formRef;
  formRef.validate();
};
</script>

<template>
  <div>
    <AcspStepForm
      v-model="activeOut"
      :form-config="config"
      ref="stepFormRef"
      @next="onNext"
      simple
      finish-status="success" />
  </div>
</template>

<style lang="less" scoped></style>
