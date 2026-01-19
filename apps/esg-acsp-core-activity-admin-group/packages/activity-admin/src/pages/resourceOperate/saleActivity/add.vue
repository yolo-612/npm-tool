<script lang='ts' setup>
import { AcspForm } from '@fpkg/components-web';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { PAGE_ACTION } from './composables/types';

const route = useRoute();

definePage({
  meta: {
    title: '销售营销管理-添加',
    permission: ['saleActivity'],
  },
});
const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, route.query.type === 'copy' ? PAGE_ACTION.COPY : PAGE_ACTION.ADD);
const { formConfig } = useConfig(state, route.query.type === 'copy' ? PAGE_ACTION.COPY : PAGE_ACTION.ADD);
</script>

<template>
  <div v-loading="state.loading.page" class="page">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.page :deep(.el-form-item) {
  align-items: flex-start !important;
}

.page :deep(.el-button.is-disabled) {
  background: #eeeeee;
  color: #606266;

  &:hover {
    background: #eeeeee;
    color: #606266;
  }
}
</style>
