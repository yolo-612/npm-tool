<route lang="json5">
{
  name: "configCompFormExampleNpm",
  meta: {
    title: "表单案例-NPM包",
    permission: ["*"],
    icon: 'Opportunity',
  }
}
</route>
<template>
  <PageMain title='表单案例-NPM包'>
    <IntroButton content="Top Left prompts info"></IntroButton>
    <ConfigForm 
      ref="configFormRef"
      v-model="formData"
      :formConfig="formConfig" 
    />
    <el-button @click="handleEmitFormRule">触发表单校验</el-button>
  </PageMain>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

import type { IFormConfig } from '@yolo/ele-config-comp'
import { FormItemType } from '@yolo/ele-config-comp'
import { ConfigForm, IntroButton } from '@yolo/ele-config-comp'
import CustomFormItem from '@/components/config-comp/CustomFormItem.vue'
import DemoSlot from '@/components/config-comp/DemoSlot.vue'

const configFormRef = ref()
const handleEmitFormRule = ()=>{
  console.log(formData, 'formData===>')
  configFormRef.value?.validate()
}

const baseFormConfig = {
  rowProps: {},
  colProps: {},
  hidden: false,
  header: {
    title: '基本表单',
    subTitle: '经过二次封装'
  },
  formItemList: [{
    colProps: { span: 12 },
    type: FormItemType.Cascader,
    hidden: false,
    fieldProps: {
      placeholder: "请填写",
      options: [{
        label: '寄付月结',
        value: 1,
        children: [{
          label: '7558116666',
          value: '7558116666',
        }, {
          label: '7558110000',
          value: '7558110000',
        }]
      },{
        label: '寄付现结',
        value: 2,
        children: []
      },{
        label: '第三方付',
        value: 3,
        children: [{
          label: '7558116666',
          value: '7558116666',
        }, {
          label: '7558110000',
          value: '7558110000',
        }]
      }]
    },
    name: 'payWayMonthCard',
    label: '寄件方式',
    rules: [{
      required: true,
      message: '请填写寄件方式',
    }]
  },{
    colProps: { span: 12 },
    type: FormItemType.Checkbox,
    hidden: false,
    fieldProps: {
      outOptions: [{
        label: '香蕉',
        value: 1,
      },{
        label: '苹果',
        value: 0,
      }]
    },
    name: 'fruit',
    label: '水果种类',
  },{
    colProps: { span: 12 },
    type: FormItemType.DatePicker,
    hidden: false,
    fieldProps: {
      placeholder: '请选择日期',
      clearable: true,
    },
    name: 'date',
    label: '选择日期',
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
    type: FormItemType.InputNumber,
    hidden: false,
    fieldProps: {
      min: 1,
      max: 100,
    },
    name: 'price',
    label: '价格',
  },{
    colProps: { span: 12 },
    type: FormItemType.InputNumberRange,
    hidden: false,
    fieldProps: {
      placeholder: ['最低价格', '最高价格']
    },
    name: 'priceRange',
    label: '价格范围',
  },{
    colProps: { span: 12 },
    type: FormItemType.Label,
    hidden: false,
    fieldProps: {
      thousandsSeparator: true,
    },
    name: 'numScale',
    label: '数量级',
  },{
    colProps: { span: 12 },
    type: FormItemType.Link,
    hidden: false,
    fieldProps: {
      label: 'www.yolo.com',
      action: ()=> {console.log('跳转链接')}
    },
    name: 'buyLink',
    label: '购买链接',
  },{
    colProps: { span: 12 },
    type: FormItemType.Radio,
    hidden: false,
    fieldProps: {
      options: [{
        label: "买",
        value: '1'
      },{
        label: "不买",
        value: '0'
      }]
    },
    name: 'isBuy',
    label: '是否购买',
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
    type: FormItemType.Switch,
    hidden: false,
    fieldProps: {
    },
    name: 'switch',
    label: '开关',
  },{
    colProps: { span: 12 },
    type: FormItemType.TimePicker,
    hidden: false,
    fieldProps: {
      isRange: true,
      arrowControl: true,
      rangeSeparator: "到",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
    name: 'timeRange',
    label: '时间跨度',
  },{
    colProps: { span: 12 },
    type: FormItemType.TreeSelect,
    hidden: false,
    fieldProps: {
      placeholder: '树没怎么用过'
    },
    name: 'tree',
    label: '树形结构',
  }]
}

const customFormConfig = {
  rowProps: {},
  colProps: {},
  hidden: false,
  header: {
    title: '表单自定义能力',
    subTitle: '支持表单列表项内部插槽、自定义表单项等'
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
}

const formConfig: IFormConfig = {
  type: 'edit',
  formProps: {
    labelWidth: '120',
  },
  rowProps: {},
  colProps: {},
  subFormList: [
    baseFormConfig,
    customFormConfig,
    // 自定义完整的表单列表单元
    {
      rowProps: {},
      colProps: {},
      hidden: false,
      customHeader: {
        component: h('div', { class: 'custom-header' }, '自定义完整的表单列表单元'),
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
    }
  ]
}

const baseFormData = {
  payWayMonthCard: [],
  fruit: [],
  date: '',
  school: '',
  price: 1,
  priceRange: [],
  numScale: 10000000,
  buyLink: '',
  isBuy: undefined,
  sex: undefined,
  switch: true,
  timeRange: [],
  tree: undefined
}

const customFormData = {
  name: '',
  activity: ''
}

const formData = reactive({
  ...baseFormData,
  ...customFormData
})




</script>

<style lang='scss' scoped>
</style>
