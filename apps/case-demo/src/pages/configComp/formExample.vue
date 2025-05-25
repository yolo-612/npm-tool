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
    <IntroButton></IntroButton>
    <ConfigForm :formConfig="step1Form"></ConfigForm>
  </PageMain>
</template>

<script setup lang='ts'>
import { FormItemType } from '@yolo/config-comp'
import { IntroButton, ConfigForm } from  '@yolo/config-comp'
const colProps = { span: 8 };

const testOpt = [
  {
    key: '123',
    label: 'android',
    value: '123',
  },
  {
    key: '234',
    label: 'ios',
    value: '234',
  },
];

const step1Form = {
  subFormList: [
    {
      header: {
        title: '表头Title1',
        subTitle: '表头subTitle',
        isActive: true,
        foldEnable: true,
        intro: 'intro',
      },
      formItemList: [
        {
          colProps,
          type: FormItemType.Select,
          name: 'select',
          label: '下拉选择',
          fieldProps: {
            // name: 'contract_type',
            placeholder: '这是placeholder',
            // noDataText: '这是没有数据',
            options: testOpt,
            slots: {
              header: 'header',
              footer: 'footer',
              prefix: 'prefix',
            },
          },
          rules: {
            required: true,
            message: '请选择合同类型',
          },
        },
      ],
    },
  ],
}



</script>

<style lang='scss' scoped>

</style>
