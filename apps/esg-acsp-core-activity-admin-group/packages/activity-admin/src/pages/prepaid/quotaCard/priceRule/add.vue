<script lang="ts" setup>
import { AcspForm } from '@fpkg/components-web';
import useAddConfig from './composables/useAddConfig';
import useAddAction from './composables/useAddAction';

definePage({
  meta: {
    title: '新增计价规则',
    permission: ['quotaCardPriceRuleAdd'],
  },
});
const formRef = ref<typeof AcspForm>();
const state = useAddAction(formRef, 'add');
const { formData, loading } = state;
const formConfig = useAddConfig(state, 'add');
</script>

<template>
  <div v-loading="loading.page">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <AcspForm ref="formRef" :form-config="formConfig" :model-value="formData" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped></style>
