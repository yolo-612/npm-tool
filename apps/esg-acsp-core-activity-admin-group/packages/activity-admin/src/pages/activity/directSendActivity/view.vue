<script setup lang="ts">
import { AcspForm } from '@fpkg/components-web';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { PAGE_ACTION } from './types';

definePage({
  meta: {
    title: '查看直接发券',
    permission: ['directSendView'],
  },
});
const route = useRoute();
const code = ref<string>();
if (typeof route.query.code === 'string') {
  code.value = route.query.code;
}

const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, code.value, PAGE_ACTION.DETAIL);

const { formConfig } = useConfig(state, PAGE_ACTION.DETAIL);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain
      ><AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" /><RightsSearchDialog
        v-model="state.rights.value.isShowRight"
        :columns="['name', 'pkgDataId', 'equities', 'equityPkgCount']"
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
