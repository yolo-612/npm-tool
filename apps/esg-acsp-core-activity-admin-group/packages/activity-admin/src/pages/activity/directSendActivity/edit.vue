<script setup lang="ts">
import { AcspForm } from '@fpkg/components-web';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { PAGE_ACTION } from './types';

definePage({
  meta: {
    title: '编辑直接发券',
    permission: ['directSendEdit'],
  },
});
const route = useRoute();
const code = ref<string>();
if (typeof route.query.code === 'string') {
  code.value = route.query.code;
}

const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, code.value);

const { formConfig } = useConfig(state, PAGE_ACTION.EDIT);

// FIXME: 这里不知道为什么，如果用 state.loadingDetail 直接给 v-loading，则不会自动更新
const isLoading = ref(state.loadingDetail);
watch(state.loadingDetail, () => {
  isLoading.value = state.loadingDetail.value;
});
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain v-loading="isLoading"
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
