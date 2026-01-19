<script lang="ts" setup>
import { PureTable, TableColumnType } from '@fpkg/components-web';
import { ref } from 'vue';
const columns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '编号',
      prop: 'code',
      minWidth: 180,
    },
  },
  {
    renderType: TableColumnType.Input,
    columnProps: {
      label: '姓名',
      prop: 'name',
      minWidth: 180,
    },
    fieldProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    renderType: TableColumnType.InputNumber,
    columnProps: {
      label: '年龄',
      prop: 'age',
      minWidth: 180,
    },
    fieldProps: {
      placeholder: '请输入年龄',
    },
  },
  {
    renderType: TableColumnType.Select,
    columnProps: {
      label: '年龄',
      prop: 'gender',
      minWidth: 180,
    },
    fieldProps: {
      placeholder: '请选择年龄',
      options: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
    },
  },
  {
    renderType: TableColumnType.Button,
    columnProps: {
      label: '按钮',
      prop: 'gender',
      minWidth: 180,
    },
    fieldProps: {
      label: '123',
      debounce: 100,
      props: {
        type: 'primary',
        onClick: () => {},
      },
    },
  },
];

const data = ref([
  {
    code: '1',
    name: '张三',
    age: 18,
    gender: '1',
  },
  {
    code: '2',
    name: '李四',
    age: 19,
    gender: '2',
  },
]);
</script>

<template>
  {{ data }}
  <div>
    <PureTable :columns="columns" :data="data" :row-key="(row) => row.code" />
  </div>
</template>

<style lang="less" scoped></style>
