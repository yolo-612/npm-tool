<script setup lang="ts">
import { watch } from 'vue';
import { ElMessage } from 'element-plus';
import { FormItemType, TableColumnType, SearchTable } from '@fpkg/components-web';
import { queryQuotaConfigList } from '@/apis/methods/activity/quotaCard';
import type { IQuotaConfigListParams } from '@/apis/methods/activity/quotaCard/types';
import type { IPageParams } from '@/types';

const props = defineProps({
  configRespList: {
    type: Array<IQuotaConfigListParams>,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['change']);

/* 分页 */
const pagination = { defaultPageSize: 10, layout: 'total, prev, pager, next, jumper' };
const searchTableRef = ref();
const searchHeader = {
  showBtnList: true,
  showResetBtn: false,
  searchItemList: [
    {
      type: FormItemType.Input,
      name: 'code',
      label: '计价规则编码',
      fieldProps: {
        placeholder: '请输入计价规则编码',
        clearable: true,
        modelModifiers: { trim: true },
      },
    },
    {
      type: FormItemType.Input,
      name: 'name',
      label: '计价规则名称',
      fieldProps: {
        placeholder: '请输入计价规则名称',
        clearable: true,
        modelModifiers: { trim: true },
      },
    },
  ],
};
/* 操作列表 */
const actionList = ({ row }: any) => {
  return {
    list: [
      {
        label: '添加',
        props: {
          link: true,
          type: 'primary',
          size: 'small',
          onClick: () => {
            const index = ruleList.value.findIndex((i) => i.code === row.code);
            if (index === -1) ruleList.value.push(row);
            else ElMessage.warning(`${row.name}已存在，请无重复添加！`);
          },
        },
      },
    ],
  };
};
// 表单列表
const columns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '计价规则名称',
      prop: 'name',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '计价规则编码',
      prop: 'code',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '计价规则状态',
      prop: 'statusDesc',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '主产品',
      prop: 'mainProductTypeName',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '子产品',
      prop: 'subProductTypeName',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '卡额度(元)',
      prop: 'quota',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '卡折扣',
      prop: 'discount',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '生效日',
      prop: 'validTimeStart',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '失效日',
      prop: 'validTimeEnd',
      minWidth: 120,
    },
  },
];
// 弹窗中的 column
const searchColumns = [
  ...columns,
  {
    renderType: TableColumnType.Buttons,
    columnProps: {
      label: '操作',
      prop: 'action',
      fixed: 'right',
      minWidth: 60,
    },
    fieldProps: actionList,
  },
];

// 计价规则工号
const ruleList = ref<IQuotaConfigListParams[]>([]);

// 计价规则选择 popup 状态
const popup = ref(false);
// 打开计价规则选择
const openPopup = async () => {
  popup.value = true;
  await nextTick();
  searchTableRef.value?.onSearch();
};
// 删除计价规则
const clearRule = () => {
  ruleList.value = [];
  emits('change', ruleList.value);
};

/* 搜索数据 */
const formData: Omit<IQuotaConfigListParams, 'pageSize' | 'pageNum'> = reactive({
  /** 计价规则编码 */
  code: '',
  /** 计价规则名称 */
  name: '',
});

/* 查询列表数据 */
const searchAction = async (pageInfo: IPageParams) => {
  const { pageSize, pageNum } = pageInfo;
  try {
    const { obj } = await queryQuotaConfigList({
      pageNum,
      pageSize,
      status: '1',
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

// 删除计价规则工号
const closeRuleListt = (rule: IQuotaConfigListParams) => {
  const index = ruleList.value.findIndex((i) => i.code === rule.code);
  if (index > -1) ruleList.value.splice(index, 1);
};
// 提交计价规则工号
const handleSubmit = () => {
  if (ruleList.value.length === 0) {
    return ElMessage.warning('请选择计价规则！');
  }
  if (ruleList.value.length > 1) {
    return ElMessage.warning('最多只能选择一个计价规则！');
  }
  emits('change', ruleList.value);
  popup.value = false;
};

// 监听列表数据
watch(() => props.configRespList, (list: IQuotaConfigListParams[]) => {
  ruleList.value = [...list];
}, { deep: true });

</script>

<template>
  <div class="customer-group">
    <el-button
      v-if="props.configRespList.length > 0"
      type="primary"
      :disabled="props.disabled"
      @click="clearRule"
    >删除</el-button>
    <el-button
      v-else
      type="primary"
      :disabled="props.disabled"
      @click="openPopup"
    >选择</el-button>

    <PureTable
      style="margin-top: 20px;"
      :columns="columns"
      :data="props.configRespList"
      border
    />

    <!-- 弹窗路由 -->
    <el-dialog
      v-model="popup"
      title="选择计价规则"
      width="1200px"
    >
      <SearchTable
        ref="searchTableRef"
        :searchHeader="searchHeader"
        :searchData="formData"
        :searchAction="searchAction"
        :columns="searchColumns"
        :pagination="pagination"
        :rowKey="(row: any) => row.id"
        max-height="max(calc(100vh - 380px),300px)"
      >
        <template #suffixBtn>
          <el-button type="primary" icon="plus" @click="handleSubmit">提交</el-button>
        </template>
        <template #belowHeader>
          <div class="choose-customer-group">
            <span>选中计价规则: </span>
            <el-tag
              v-for="tag in ruleList"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="closeRuleListt(tag)"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </template>
      </SearchTable>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.customer-group {
  .customer-group-input {
    width: 300px;
    min-height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 0 5px;
    :deep(.el-tag) {
      margin-right: 2px;
    }
  }
  .choose-customer-group {
    margin: 10px 0;
    padding-left: 10px;
  }
}
</style>
