<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useListConfig from './composables/useListConfig';
import useListAction from './composables/useListAction';
import CouponBarModal from './components/CouponBarModal.vue';

definePage({
  meta: {
    title: '调价券包列表',
    permission: ['quotaCardCouponBarList'],
    ignoreCache: true,
  },
});

const tableRef = ref<any>();
const state = useListAction(tableRef);
const {
  searchAction, formData, openCouponModel, addCouponData,
} = state;
const { searchHeader, columns } = useListConfig(state);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <SearchTable
        ref="tableRef"
        :search-header="searchHeader"
        :columns="columns"
        :search-action="searchAction"
        :search-data="formData"
        max-height="max(calc(100vh - 380px),300px)"
      >
        <template #suffixBtn>
          <el-button type="primary" icon="plus" @click="() => openCouponModel('add')">新增调价券包</el-button>
        </template>
      </SearchTable>
    </PageMain>
    <CouponBarModal
      v-model="addCouponData.showModel"
      :type="addCouponData.type"
      :equity-code="addCouponData.equityCode"
      @submit="tableRef?.fetchData"
    />
  </div>
</template>

<style lang="scss" scoped>
  .test-range {
    width: 600px;
  }
</style>
