<script lang="ts" setup>
import { AcspForm } from '@fpkg/components-web';
import { useTemplateConfig } from './composables/useTemplateConfig';
import { useTemplateAction } from './composables/useTemplateAction';

definePage({
  meta: {
    title: '申请券管理-查看',
    permission: ['applySendView'],
  },
});
const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useTemplateAction(formRef, 'detail');
const { formConfig } = useTemplateConfig(state, 'detail');

</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" />
      <RightsSearchDialog
        v-model="state.rights.isShowRight"
        :columns="['name', 'pkgDataId', 'equities', 'equityPkgCount']"
        :types="[Number(state.formData.equityType) as 1 | 2]"
        :submit-validate-rights="state.submitValidateRights"
    />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep(.sub-form-body .el-row) {
  .send-weight-range-col .send-weight-range-form-item {
    align-items: flex-start;
    .el-form-item__content {
      max-width: 52%;
    }
  }
  .city-flow-direction-col .el-form-item {
    align-items: flex-start;
  }
  .limit-time-col .el-form-item {
    align-items: flex-start;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #f6c1c2;
    border-color: #f6c1c2;
  }
  .el-range-editor.is-disabled {
    background-color: #f5f5f5;
  }
  .el-range-editor.is-disabled input {
    background-color: #f5f5f5;
  }
  .el-cascader .el-input.is-disabled .el-input__inner {
    background-color: #f5f5f5;
  }
  .el-select__wrapper.is-disabled {
    background-color: #f5f5f5;
  }
  .el-cascader .el-cascader__tags .el-tag + .el-tag {
    margin-top: 0;
  }
}
.range-number-field__tips {
  margin-top: 5px;
}
</style>
