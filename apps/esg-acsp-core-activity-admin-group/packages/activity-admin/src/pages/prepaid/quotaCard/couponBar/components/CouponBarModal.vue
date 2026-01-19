<script lang="ts" setup>
import { PureTable, TableColumnType } from '@fpkg/components-web';
import { ElMessage } from 'element-plus';
import type { PropType } from 'vue';
import rightsSearchDialog from '@/components/common/rightsSearchDialog/index.vue';
import { columns } from '../composables/useCouponConfig';
import type { IResQueryCoupon } from '@/apis/methods/common/types';
import { queryQuotaCouponBarDetail, queryQuotaCouponBarCreate } from '@/apis/methods/activity/quotaCard';
import type { IQuotaCouponBarCreateParams } from '@/apis/methods/activity/quotaCard/types';

/* 入参 */
const props = defineProps({
  type: {
    type: String as PropType<'add' | 'detail'>,
    default: '',
  },
  equityCode: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['submit']);

/* 当前弹窗 */
const visible = defineModel({ required: true, default: false });

/* 展示搜索权益弹窗 */
const showSelectRights = ref(false);

/* 提交按钮loading */
const loading = ref(false);

/* 选中的权益数据 */
const list = ref<IQuotaCouponBarCreateParams[]>([]);

/* 校验权益数据 */
const validateSearchRights = (obj: IResQueryCoupon) => {
  const { equities } = obj || {};
  const { equityValue } = equities?.[0] || {};
  if (equities?.length !== 1 || Number(equityValue) !== 1) return { isValid: false, message: '券包仅支持配置1张券' };
  const { deductionType } = equities?.[0] || {};
  if (deductionType !== '20') return { isValid: false, message: '仅支持立减类型券' };
  return { isValid: true };
};

/* 校验添加数据 */
const validateAddRights = (obj:IResQueryCoupon) => {
  const { equities } = obj || {};
  const { deductionValue } = equities?.[0] || {};
  const num = Number(deductionValue);
  if (!Number.isInteger(num)) return { isValid: false, message: '券包金额必须为整数' };
  return { isValid: true };
};

/* 添加券 */
const handleAddCoupon = (obj: IResQueryCoupon) => {
  showSelectRights.value = false;
  const {
    pkgDataId: equityCode,
    name: equityName,
    equities = [],
    startTm: validDate,
    endTm: invalidDate,
  } = obj || {};
  const { deductionValue, equityValue: pieceNum, equityAlias: name } = equities?.[0] || {};
  list.value = [
    {
      equityCode,
      equityName,
      name,
      amount: Number(deductionValue),
      pieceNum,
      validDate,
      invalidDate,
    },
  ];
};

/* 确认创建券 */
const createCouponBar = async () => {
  try {
    const data = list.value[0];
    loading.value = true;
    const { success } = await queryQuotaCouponBarCreate(data);
    if (!success) return ElMessage.error('创建失败');
    visible.value = false;
    ElMessage.success('创建成功');
    emits('submit');
  } catch (error: any) {
    ElMessage.error(error?.message || '创建失败');
  } finally {
    loading.value = false;
  }
};

/* 拉取券详情 */
const tableLoading = ref(false);
const getCouponBarDetail = async () => {
  try {
    tableLoading.value = true;
    const { obj } = await queryQuotaCouponBarDetail({ code: props.equityCode });
    if (!obj) return ElMessage.error('获取失败');
    list.value = [obj];
  } catch (error: any) {
    ElMessage.error(error?.message || '获取失败');
  } finally {
    tableLoading.value = false;
  }
};

/* 是否展示按钮 */
const showAction = computed(() => props.type === 'add');

/* 删除券配置 */
const actionBtnConfig = {
  renderType: TableColumnType.Button,
  hidden: !showAction.value,
  columnProps: {
    label: '操作',
    prop: 'action',
    minWidth: 80,
  },
  fieldProps: {
    label: '删除',
    props: {
      type: 'primary',
      size: 'small',
      onClick: () => { list.value = []; },
    },
  },
};

const applyColumn = computed(() => (showAction.value ? [...columns, actionBtnConfig] : columns));

</script>

<template>
  <el-dialog
    v-model="visible"
    :title="`${showAction ? '新增' : '查看'}调价券包`"
    width="70%"
    @open="() => props.type === 'detail' && getCouponBarDetail()"
    @closed="list = []"
  >
    <div>
      <el-button v-if="showAction" type="primary" class="ext-btn" @click="showSelectRights = true">
        新增立减券
      </el-button>
      <PureTable v-loading="tableLoading" :columns="applyColumn" :data="list" />
      <rightsSearchDialog
        v-model="showSelectRights"
        :types="[1]"
        :columns="['pkgDataId', 'name', 'equities', 'equityPkgCount', 'startTm', 'endTm']"
        :isShowTypeSelect="false"
        :searchValidateRights="validateSearchRights"
        :submit-validate-rights="validateAddRights"
        @submit="handleAddCoupon"
      />
    </div>
    <template v-if="showAction" #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="loading" :disabled="!list.length" @click="createCouponBar">
          确认创建
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
  :deep(.el-table .el-table__empty-text) {
    padding-top: 0;
    margin-bottom: 0;
  }
  .ext-btn {
    margin-bottom: 10px;
  }
</style>
