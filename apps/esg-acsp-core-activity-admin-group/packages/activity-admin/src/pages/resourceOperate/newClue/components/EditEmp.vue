<script lang="ts" setup>
import { PureTable } from '@fpkg/components-web';
import { ElMessage, ElMessageBox } from 'element-plus';
import { debounce } from 'lodash-es';
import { editClueTableColumn } from '../composables/useConfig';
import type { IClueEditData } from '../composables/types';
import { queryStaff, transferEmp } from '@/apis/methods/activity/newClue';
import { useUserStore } from '@/stores';

  interface IEmpOptionItem {
    label: string;
    value: string;
  }
  /* 接收的参数 */
const props = withDefaults(defineProps<IClueEditData>(), {
  show: false,
  action: 'single',
});
const emits = defineEmits(['success', 'close']);
/* 登录账号角色信息 */
const userStore = useUserStore();
const singleRenderList = editClueTableColumn.map((item) => item.columnProps);

/* 表单数据 */
const empCode = ref<string>();

const currentInfo = ref<IEmpOptionItem>();

const loading = ref(false);

/* 下拉选项数据 */
const options = ref<IEmpOptionItem[]>();

/* 确认绑定 */
const onConfirm = () => {
  resetDialog();
  emits('close');
  emits('success');
};

/* 取消绑定 */
const onClose = () => {
  resetDialog();
  emits('close');
};

/* 重置框框数据 */
const resetDialog = () => {
  empCode.value = '';
  currentInfo.value = undefined;
  options.value = [];
};

/* 查询小哥 */
const getStaff = debounce(async (query: string) => {
  const data = query.trim();
  if (!data) return;
  try {
    const { obj = [] } = await queryStaff(query.trim());
    const list = (obj || []).slice(0, 5).map((item) => ({
      label: item.empName,
      value: item.empCode,
    }));
    const isExist = list?.find((item) => item.value === currentInfo.value?.value);
    if (!isExist && currentInfo.value) list.push(currentInfo.value);
    options.value = list;
  } catch (error) {
    ElMessage.error('查询小哥失败');
  }
}, 300);

/* 操作划转 */
const onClickToTransfer = async () => {
  if (props.action === 'single' && props.list[0]?.empCode === empCode.value) {
    ElMessage.warning('您选择的小哥已经是当前线索的接收小哥');
    return;
  }
  try {
    loading.value = true;
    const data = {
      idList: props.list?.map((item) => item.id),
      empCode: empCode.value || '',
      empName: currentInfo.value?.label || '',
      role: userStore.roleCode,
    };
    await transferEmp(data);
    ElMessageBox.confirm('您已成功划转', {
      closeOnClickModal: false,
      showCancelButton: false,
      showClose: false,
      closeOnPressEscape: false,
      center: true,
    })
      .then(onConfirm)
      .catch(() => {});
  } catch (error: any) {
    ElMessage.error(error?.message || '划转失败');
  } finally {
    loading.value = false;
  }
};

/* 值变化 */
const onChange = () => {
  currentInfo.value = options.value?.find((item) => item.value === empCode.value);
};
</script>

<template>
  <el-dialog :model-value="props.show" title="选择接收小哥" width="800" align-center @close="onClose">
    <!-- 单个编辑线索展示 -->
    <template v-if="props.action === 'single'">
      <div v-for="{ label, prop } in singleRenderList" :key="prop" class="single-info">
        <span>{{ label }}：</span>
        <span>{{ props.list?.[0]?.[prop] || '--' }}</span>
      </div>
    </template>
    <!-- 批量编辑线索展示 -->
    <template v-if="props.action === 'batch'">
      <PureTable :columns="editClueTableColumn" :data="props.list || []" autoHeight size="small" max-height="200" />
    </template>
    <!-- 搜索 -->
    <div class="select-emp">
      <div class="select-label">选择接收小哥：</div>
      <el-select
        v-model="empCode"
        placeholder="请输入小哥工号/姓名搜索"
        value-key="value"
        remote
        filterable
        :remote-method="getStaff"
        clearable
        @change="onChange"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        <template #label>
          <span>{{ currentInfo?.label }} {{ currentInfo?.value }}</span>
        </template>
      </el-select>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" :disabled="!empCode" :loading="loading" @click="onClickToTransfer">
          确认绑定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .single-info {
    span:first-of-type {
      font-weight: bold;
    }
  }
  .single-info + .single-info {
    margin-top: 10px;
  }
  .select-emp {
    width: 60%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    .select-label {
      white-space: nowrap;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .btn-list {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
