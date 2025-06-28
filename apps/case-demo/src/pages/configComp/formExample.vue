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
import { reactive } from 'vue'
import ConfigForm from '@/components/config-comp/form/ConfigForm.vue'

const formConfig = [{
  colProps: { span: 8 },
  type: 'el-input',
  fieldProps: {
    placeholder: '请填写姓名'
  },
  name: 'name',
  label: '姓名',
  rules: [{
    required: true,
    message: '请填写姓名',
  }]
},{
  colProps: { span: 8 },
  type: 'el-input',
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

const formData = reactive({
  name: '122',
  school: '1222',
  sex: undefined,
})
</script>

<style lang='scss' scoped>
</style>
