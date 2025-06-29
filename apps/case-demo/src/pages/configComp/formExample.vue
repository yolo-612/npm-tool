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
    <ConfigForm 
      ref="configFormRef"
      v-model="formData"
      :formConfig="formConfig" 
    />
    <el-button @click="handleEmitFormRule">触发表单校验</el-button>
  </PageMain>
</template>

<script setup lang='ts'>
import type { IFormConfig } from '@/components/config-comp/form/types'
import { FormItemType } from '@/components/config-comp/form/types'
import { ref, reactive } from 'vue'
import ConfigForm from '@/components/config-comp/form/ConfigForm.vue'
import CustomFormItem from '@/components/config-comp/CustomFormItem.vue'
import DemoSlot from '@/components/config-comp/DemoSlot.vue'

const configFormRef = ref()
const handleEmitFormRule = ()=>{
  console.log(formData, 'formData===>')
  configFormRef.value?.validate()
}

const formConfig: IFormConfig = {
  type: 'edit',
  formProps: {
    labelWidth: '120',
  },
  rowProps: {},
  colProps: {},
  subFormList: [{
    rowProps: {},
    colProps: {},
    hidden: false,
    header: {
      title: '用户信息',
      subTitle: '基本信息'
    },
    formItemList: [{
      colProps: { span: 12 },
      type: FormItemType.Input,
      hidden: false,
      fieldProps: {
        placeholder: '请填写姓名',
        slots: {
          'prepend': {
            component: h('div', { width: '50px', height: '20px', background: 'red' }),
            props: { data: [1,2,3] }
          },
          'append': '12222'
        }
      },
      name: 'name',
      label: '姓名示例',
      rules: [{
        required: true,
        message: '请填写姓名',
      }]
    },{
      colProps: { span: 12 },
      type: FormItemType.Input,
      hidden: false,
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
      colProps: { span: 12 },
      type: FormItemType.Select,
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
    },{
      colProps: { span: 12 },
      type: FormItemType.Custom,
      label: "活动",
      name: 'activity',
      customLabel: {
        component: DemoSlot,
        props: {
          testName: '活动'
        }
      },
      customComponent: {
        component: CustomFormItem,
        props: {
          subfixTxt: 'activity',
        },
      },
    }]
  },{
    rowProps: {},
    colProps: {},
    hidden: false,
    customHeader: {
      component: h('div', { class: 'custom-header' }, '测试自定义表头'),
      props: {},
    },
    customContent: {
      component: CustomFormItem,
      props: {
        subfixTxt: '表单列表自定义组件',
      },
    },
    customFooter: {
      component: h('div', { class: 'custom-footer' }, '测试自定义表底部'),
      props: {},
    },
  }]
}

const formData = reactive({
  name: '',
  school: '1222',
  sex: undefined,
})
</script>

<style lang='scss' scoped>
</style>
