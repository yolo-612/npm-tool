<script lang='ts' setup>
import { AcspForm } from '@fpkg/components-web';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { E_PAGE_ACTION } from './composables/types';

definePage({
  meta: {
    title: '创建商品',
    permission: ['quotaCardProductAdd'],
  },
});

const route = useRoute();
const action = route.query.goodsCode ? E_PAGE_ACTION.COPY : E_PAGE_ACTION.ADD;
const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, action);
const { formConfig } = useConfig(state, action);
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
</style>
