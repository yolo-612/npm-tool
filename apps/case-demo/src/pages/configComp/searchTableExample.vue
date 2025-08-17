<route lang="json5">
{
  name: "configCompSearchTableExample",
  meta: {
    title: "搜索表格案例",
    permission: ["*"],
    order: 100,
    icon: 'HomeFilled',
  }
}
</route>
<template>
  <PageMain title='搜索表格案例'>
    <SearchTable :searchHeader="formConfig" :searchData="formData"/>
  </PageMain>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchTable from '@/components/config-comp/table/SearchTable.vue';
import { FormItemType } from '@/components/config-comp/form/types'
import type { ISearchTableHeader } from '@/components/config-comp/table/types';

const formData = ref({
  customerName: '',
  customerMobile: '',
  foodType: null,
  appointmentTime: '',
  address: ''
});

const formConfig: ISearchTableHeader = {
  searchBtnTxt: '查结果',
  searchItemList: [
    {
      type: FormItemType.Input,
      fieldProps: {
        placeholder: '请填写姓名',
        clearable: true,
      },
      name: 'customerName',
      label: '姓名',
      rules: [{
        required: true,
        message: '请填写姓名',
      }]
    },
    {
      type: FormItemType.Input,
      fieldProps: {
        placeholder: '请填写联系方式',
        clearable: true,
      },
      name: 'customerMobile',
      label: '联系方式',
      rules: [{
        required: true,
        message: '请填写联系方式',
      }]
    },
    {
      type: FormItemType.Select,
      fieldProps: {
        placeholder: '请填写菜类型',
        options: [{
          label: '鸽子汤',
          value: 1,
        }, {
          label: '黑鱼汤',
          value: 0,
        }]
      },
      name: 'foodType',
      label: '菜类型',
      rules: [{
        required: true,
        message: '请填写菜类型',
      }]
    },
    {
      type: FormItemType.DatePicker,
      fieldProps: {
        placeholder: '请选择预约时间',
        clearable: true,
        type: 'datetime',
      },
      name: 'appointmentTime',
      label: '预约时间',
      rules: [{
        required: true,
        message: '请选择预约时间',
      }]
    },
    {
      type: FormItemType.Input,
      fieldProps: {
        placeholder: '请填写地址',
        clearable: true,
      },
      name: 'address',
      label: '地址',
      rules: [{
        required: true,
        message: '请填写地址',
      }]
    },
  ]
};
</script>

<style lang='scss' scoped>
</style>
