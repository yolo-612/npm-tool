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
    <SearchTable 
      ref="searchTableRefInstance"
      :searchHeader="formConfig" 
      :searchData="formData"
      :columns="columns"
      :searchAction="searchAction"
    />
  </PageMain>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import SearchTable from '@/components/config-comp/table/SearchTable.vue';
import { FormItemType } from '@/components/config-comp/form/types'
import type { ISearchTableHeader } from '@/components/config-comp/table/types';
import { type ITableColumnItem, TableColumnType } from '@/components/config-comp/table/types';

import { ElMessage } from 'element-plus';

/* 分页参数 */
export interface IPageParams {
  /* 当前页码 */
  pageNum: number;
  /* 每页条数 */
  pageSize: number;
}

const queryTableList = (params: any) => {
  return Promise.resolve({
    obj: {
      totalSize: 100,
      list: Array.from({ length: params.pageSize }, (_, index) => ({
        customerName: `顾客${params.pageNum * index + 1}`,
        customerMobile: `1380000000${index}`,
        foodType: params.foodType === 1 ? '鸽子汤' : '黑鱼汤',
        appointmentTime: new Date().toISOString(),
        address: `地址${index + 1}`,
      }))
    }
  })
}

/* 查询列表数据 */
const searchAction = async (pageInfo: IPageParams) => {
  const { pageSize, pageNum } = pageInfo;
  try {
    const { obj } = await queryTableList({
      pageNum,
      pageSize,
      ...formData,
    });
    if (!obj || !obj.list) {
      return { totalSize: 0, list: [] };
    }
    return obj;
  } catch (error) {
    ElMessage.error('查询失败');
    return { totalSize: 0, list: [] };
  }
};

const searchTableRefInstance = ref<any>(null);

onMounted(() => {
  // 默认加载第一页数据
  nextTick(() => {
    searchTableRefInstance.value?.fetchData();
  });
})

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
    },
    {
      type: FormItemType.Input,
      fieldProps: {
        placeholder: '请填写联系方式',
        clearable: true,
      },
      name: 'customerMobile',
      label: '联系方式',
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
    },
    {
      type: FormItemType.Input,
      fieldProps: {
        placeholder: '请填写地址',
        clearable: true,
      },
      name: 'address',
      label: '地址',
    },
  ]
};

const columns : ITableColumnItem[] = [{
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'customerName',
    label: '顾客姓名',
    width: '180'
  }
}, {
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'customerMobile',
    label: '顾客手机号',
    width: '180'
  }
}, {
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'foodType',
    label: '餐品类型',
    width: '180'
  }
}, {
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'appointmentTime',
    label: '预约时间',
    width: '180'
  }
}, {
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'address',
    label: '地址',
    width: '180'
  }
}, {
  renderType: TableColumnType.Buttons,
  columnProps: {
    prop: 'action',
    label: '操作',
    fixed: 'right',
    minWidth: '180'
  },
  fieldProps: (scope)=> {
    return {
      list: [{
        label: '编辑',
        props: {
          link: true,
          type: 'primary',
          size: 'small',
          debounce: 1000,
          onClick: ()=> {
            console.log('开始操作', scope.row);
          }
        },
      }, {
        label: '删除',
        props: {
          link: true,
          type: 'danger',
          size: 'small',
          debounce: 1000,
          onClick: ()=> {
            console.log('删除操作', scope.row);
          }
        },
      }]
    }
  }
}];
</script>

<style lang='scss' scoped>
</style>
