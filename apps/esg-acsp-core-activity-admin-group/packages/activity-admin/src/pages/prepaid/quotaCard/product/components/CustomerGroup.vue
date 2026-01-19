<script setup lang="ts">
import { computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { FormItemType, TableColumnType } from '@fpkg/components-web';
import { queryQuotaGoodsIntelligence } from '@/apis/methods/activity/quotaCard';
import type { IIntelligenceList } from '@/apis/methods/activity/quotaCard/types';
import type { IPageParams } from '@/types';

const props = defineProps({
  intelligenceRespList: {
    type: Array<IIntelligenceList>,
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
      label: '客群编码',
      fieldProps: {
        placeholder: '请输入客群编码',
        clearable: true,
        modelModifiers: { trim: true },
      },
    },
    {
      type: FormItemType.Input,
      name: 'name',
      label: '客群名称',
      fieldProps: {
        placeholder: '请输入客群名称',
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
            const index = intelligenceList.value.findIndex((i) => i.code === row.code);
            if (index === -1) intelligenceList.value.push(row);
            else ElMessage.warning(`${row.name}已存在，请无重复添加！`);
          },
        },
      },
    ],
  };
};

const columns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '客群编码',
      prop: 'code',
      minWidth: 200,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '客群名称',
      prop: 'name',
      minWidth: 200,
    },
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '客群状态',
      prop: 'status',
      minWidth: 100,
    },
    render: '进行中',
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '客群人数',
      prop: 'cardQuantity',
      minWidth: 100,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '创建人',
      prop: 'creator',
      minWidth: 100,
    },
  },
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

// 客群工号
const intelligenceList = ref<IIntelligenceList[]>([]);

// 客群选择 popup 状态
const popup = ref(false);
// 打开客群选择
const openCustomerGroupPopup = async () => {
  popup.value = true;
  await nextTick();
  searchTableRef.value?.onSearch();
};

/* 搜索数据 */
const formData: IIntelligenceList = reactive({
  /** 商品状态 - 默认进行中 */
  status: 2,
  /** 客群编码 */
  code: '',
});

/* 查询列表数据 */
const searchAction = async (pageInfo: IPageParams) => {
  const { pageSize, pageNum } = pageInfo;
  try {
    const { obj } = await queryQuotaGoodsIntelligence({
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

// 删除客群工号
const closeintelligenceList = (tag: IIntelligenceList) => {
  const index = intelligenceList.value.findIndex((item: IIntelligenceList) => item.code === tag.code);
  if (index > -1) intelligenceList.value.splice(index, 1);
};
// 提交客群工号
const handleSubmit = () => {
  if (intelligenceList.value.length === 0) {
    return ElMessage.warning('请选择客群！');
  }
  emits('change', intelligenceList.value);
  popup.value = false;
};

// 清除标签
const clearTag = async (tag: IIntelligenceList) => {
  closeintelligenceList(tag);
  emits('change', intelligenceList.value);
};

// 监听列表数据
watch(() => props.intelligenceRespList, (list: IIntelligenceList[]) => {
  intelligenceList.value = [...list];
}, { deep: true });

// 计算客群总人数
const total = computed(() => {
  return props.intelligenceRespList.reduce((acc: number, cur: any) => acc + cur.cardQuantity, 0);
});

</script>

<template>
  <div class="customer-group">
    <div class="customer-group-input">
      <el-tag
        v-for="tag in props.intelligenceRespList"
        :key="tag.name"
        :closable="!props.disabled"
        :disable-transitions="false"
        @close="clearTag(tag)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div class="customer-group-total-card-number">未去重卡号数: {{ total }} 个</div>
    <el-button
      type="primary"
      :disabled="props.disabled"
      @click="openCustomerGroupPopup"
    >
      选择
    </el-button>

    <el-dialog
      v-model="popup"
      title="选择客群"
      width="900px"
    >
      <SearchTable
        ref="searchTableRef"
        :searchHeader="searchHeader"
        :searchData="formData"
        :searchAction="searchAction"
        :columns="columns"
        :pagination="pagination"
        :rowKey="(row: any) => row.id"
        max-height="max(calc(100vh - 380px),300px)"
      >
        <template #suffixBtn>
          <el-button type="primary" icon="plus" @click="handleSubmit">提交</el-button>
        </template>
        <template #belowHeader>
          <div class="choose-customer-group">
            <span>选中客群: </span>
            <el-tag
              v-for="tag in intelligenceList"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="closeintelligenceList(tag)"
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
  .customer-group-total-card-number {
    margin-top: 10px;
    font-size: 12px;
  }
  .choose-customer-group {
    margin: 10px 0;
    padding-left: 10px;
  }
}
</style>
