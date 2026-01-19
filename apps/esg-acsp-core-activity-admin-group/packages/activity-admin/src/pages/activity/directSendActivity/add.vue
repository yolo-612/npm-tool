<script setup lang="ts">
import { AcspForm } from '@fpkg/components-web';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { PAGE_ACTION } from './types';

definePage({
  meta: {
    title: '新增直接发券',
    permission: ['directSendAdd'],
  },
});

const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef);

const { formConfig } = useConfig(state, PAGE_ACTION.ADD);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain
      ><AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" /><RightsSearchDialog
        v-model="state.rights.value.isShowRight"
        :columns="['name', 'pkgDataId', 'equities', 'equityPkgCount']"
        :submit-validate-rights="state.validateRightsAdd"
        @submit="state.handleRightDialogSubmit"
    /></PageMain>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-tag--info) {
  border-color: #cccccc;
  span {
    color: #666666;
  }
}
</style>
