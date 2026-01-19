<script lang="ts" setup>
import { PureTable, SearchTable } from '@fpkg/components-web';
import useDemoConfig1 from './composables/useDemoConfig1';
import useDemoAction1, { data1 } from './composables/useDemoAction1';
import { toRaw, ref } from 'vue';
import type { TableInstance } from 'element-plus';
import { columns } from 'element-plus/es/components/table-v2/src/common.mjs';
const { data, formData } = useDemoAction1();
const config = useDemoConfig1();

// const onUpdateParam = (val: any) => {
//   console.log('val=====', val,state.formData);
// };
const tableLayout = ref<TableInstance['tableLayout']>('fixed');

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    phone: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    phone: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    phone: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    phone: 'No. 189, Grove St, Los Angeles',
  },
]);

const handelSearch = (params: any) => {
  console.log('params=====', params);
};
</script>

<template>
  <div>
    {{ JSON.stringify(formData) }}
    <SearchTable
      :searchHeader="config.tableConfig.searchHeader"
      :searchData="formData"
      :columns="config.tableConfig.columns"
      :data="data"
      highlight-current-row
      :pagination="{ total: 100 }"
      @search="handelSearch">
      <template #suffixBtn>
        <span @click="console.log('suffixBtn')">suffixBtn</span>
      </template>
      <template #prefixBtn>prefixBtn</template>
      <template #belowHeader>
        <span class="select_icon"></span>
        <span class="unselect_icon"></span>
      </template>
      <template #belowTable>belowTable</template>
    </SearchTable>
  </div>
  <br/>
  <br/>
  <br/>
  <div>
    <PureTable :columns="config.tableConfig.columns" :data="tableData" :table-layout="tableLayout" />
  </div>
</template>

<style lang="css" scoped>
.select_icon{
  width: 14px;
  height: 14px;
  border: 3px solid red;
  box-sizing: border-box;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.unselect_icon{
  width: 14px;
  height: 14px;
  position: relative;
  background-color: red;
  box-sizing: border-box;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.unselect_icon::after{
  position: absolute;
  content: '';
  width: 6px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  top: 3px;
  left: 3px;
  transform: rotate(-45deg);
  border-radius: 2px;
}
</style>
