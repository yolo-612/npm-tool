<script setup lang="ts">
import { AcspForm } from '@fpkg/components-web';
import useListAction from './composables/useListAction';
import useListConfig from './composables/useListConfig';
import useEditAction from './composables/useEditAction';
import useEditConfig from './composables/useEditConfig';

definePage({
  meta: {
    title: '活动效果',
    permission: ['MarketActivityEffect'],
    ignoreCache: true,
  },
});

const route = useRoute();

/** 活动效果的tabs */
const TABS_STATUS = {
  EFFECT: 'effect',
  SUPPLEMENT: 'supplement',
};
const code = route.query?.code as string;
const popTabsStatus = ref(TABS_STATUS.EFFECT);
const activityCode = computed(() => code);

// ******************** 留资明细列表 **********************

/** 活动留资明细 - 列表数据 */
// list
const searchTableRef = ref();
const listState = useListAction(activityCode, searchTableRef);
const listConfig = useListConfig();
const pagination = { defaultPageSize: 10, pageSizes: [10, 20, 50, 100] };

// ********************* 活动效果补充 **********************

// form
const formRef = ref<InstanceType<typeof AcspForm>>();
const formState = useEditAction(formRef, activityCode);
const { formConfig } = useEditConfig(formState);
</script>

<template>
  <PageHeader :title="$route.meta.title" />
  <PageMain>
    <el-tabs v-model="popTabsStatus" class="activity-tabs">
      <el-tab-pane label="活动留资明细" :name="TABS_STATUS.EFFECT">
        <SearchTable
          ref="searchTableRef"
          :searchAction="listState.searchAction"
          :columns="listConfig.columns"
          :pagination="pagination"
          :rowKey="(row: any) => row.id"
          max-height="max(calc(100vh - 420px),300px)"
        >
          <template #belowHeader>
            <div class="table-header">
              <span>预估参与人数：{{ listState?.participantCount?.estimateParticipantCount || 0 }}</span>
              <span>留资人数：{{ listState?.participantCount?.currentParticipantCount || 0 }}</span>
            </div>
          </template>
        </SearchTable>
      </el-tab-pane>
      <el-tab-pane label="活动效果补充" :name="TABS_STATUS.SUPPLEMENT">
        <div class="dialog-footer">
          <AcspForm ref="formRef" v2 :model-value="formState.formData" label-width="auto" :form-config="formConfig" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </PageMain>
</template>

<style lang="scss" scoped>
.activity-tabs {
  .el-table--fit {
    min-height: 300px;
  }
  :deep(.el-form-item) {
    align-items: flex-start!important;
  }
  .table-header {
    margin-top: 10px;
    span {
      display: inline-block;
      margin-right: 50px;
    }
  }
}
</style>
