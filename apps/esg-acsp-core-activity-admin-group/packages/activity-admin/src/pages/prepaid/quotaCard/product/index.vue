<script lang='ts' setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useListAction';
import useConfig from './composables/useListConfig';
import { E_PAGE_ACTION } from './composables/types';

definePage({
  meta: {
    title: '商品列表',
    permission: ['quotaCardProductList'],
    ignoreCache: true,
  },
});
// 搜索table
const searchTableRef = ref();
// 库存弹窗
const stockVisible = ref(false);
const state = useAction(searchTableRef, stockVisible);

// 列表配置
const { searchHeader, columns, pagination } = useConfig(state);

</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <SearchTable ref="searchTableRef" :searchHeader="searchHeader" :searchData="state.formData"
        :searchAction="state.searchAction" :columns="columns" :pagination="pagination" :rowKey="(row: any) => row.id"
        max-height="max(calc(100vh - 380px),300px)">
        <template #suffixBtn>
          <el-button type="primary" icon="plus" @click="state.pageJump(E_PAGE_ACTION.ADD)">创建商品</el-button>
        </template>
      </SearchTable>
    </PageMain>
    <el-dialog v-model="stockVisible" title="调整库存" width="460px">
      <el-form :ref="state.stockFormRef" :model="state.stockFrom" :rules="state.stockRules" label-width="100px
      ">
        <el-form-item prop="stock" label="当前库存">
          <span>{{ state.stockFrom.stock }}</span>
        </el-form-item>
        <el-form-item prop="operateType" label="操作类型">
          <el-select v-model="state.stockFrom.operateType" placeholder="请选择操作类型" size="large">
            <el-option v-for="item in state.stockOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="counts" label="数量">
          <el-input-number v-model="state.stockFrom.counts" :min="1" :precision="0" controls-position="right"
            placeholder="请输入正整数" />
        </el-form-item>
        <el-form-item>
          <el-button @click="stockVisible = false;">取消</el-button>
          <el-button type="primary" @click="state.submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-tooltip .el-link {
    color: #bd332d;
  }
}
</style>
