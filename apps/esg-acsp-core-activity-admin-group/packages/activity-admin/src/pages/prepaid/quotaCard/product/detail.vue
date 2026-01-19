<script lang='ts' setup>
import { AcspForm } from '@fpkg/components-web';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { E_PAGE_ACTION } from './composables/types';

definePage({
  meta: {
    title: '额度卡详情',
    permission: ['quotaCardProductDetail'],
  },
});
const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, E_PAGE_ACTION.DETAIL);
const { formConfig } = useConfig(state, E_PAGE_ACTION.DETAIL);
</script>

<template>
  <div v-loading="state.loading.page">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" />
    </PageMain>
  </div>
</template>

<style lang="scss">
.el-form-item {
  align-items: flex-start !important;
}

.el-button.is-disabled {
  background: #eeeeee;
  color: #606266;

  &:hover {
    background: #eeeeee;
    color: #606266;
  }
}
</style>
