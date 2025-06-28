<route lang="json5">
{
  name: "configCompFormExample",
  meta: {
    title: "表单案例",
    permission: ["*"],
    icon: 'Opportunity',
  }
}
</route>
<template>
  <PageMain title='表单案例'>
    <ConfigForm :formConfig="formConfig" :formData="formData"/>
  </PageMain>
</template>

<script setup lang='ts'>
import type { IFormConfig } from '@/components/config-comp/form/types'
import { reactive } from 'vue'
import ConfigForm from '@/components/config-comp/form/ConfigForm.vue'

const formConfig: IFormConfig = {
  type: 'edit',
  formProps: {
    labelWidth: '80',
  },
  rowProps: {},
  colProps: {},
  subFormList: [{
    rowProps: {},
    colProps: {},
    hidden: false,
    formItemList: [{
      colProps: { span: 12 },
      type: 'el-input',
      hidden: false,
      fieldProps: {
        placeholder: '请填写姓名'
      },
      name: 'name',
      label: '姓名示例',
      rules: [{
        required: true,
        message: '请填写姓名',
      }]
    },{
      colProps: { span: 12 },
      type: 'el-input',
      hidden: true,
      fieldProps: {
        placeholder: '请填写学校'
      },
      name: 'school',
      label: '学校',
      rules: [{
        required: true,
        message: '请填写学校',
      }]
    },{
      colProps: { span: 8 },
      type: 'FieldSelect',
      hidden: false,
      fieldProps: {
        placeholder: '请填写性别',
        options: [{
          label: '男',
          value: 1,
        }, {
          label: '女',
          value: 0,
        }]
      },
      name: 'sex',
      label: '性别',
      rules: [{
        required: true,
        message: '请填写性别',
      }]
    }]
  }]
}

const formData = reactive({
  name: '122',
  school: '1222',
  sex: undefined,
})
</script>

<style lang='scss' scoped>
</style>
