<script setup lang="ts">
import { ElMessage, ElUpload, genFileId } from 'element-plus';
import type {
  UploadRawFile, UploadUserFile, UploadProps, UploadInstance,
} from 'element-plus';
import { IMPORT_PORTRAIT_URL } from '@/apis/methods/activity/courierPersona';
import { exportDataByExcel } from '@/utils/downloadTool';

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['change']);

const fileList = ref<UploadUserFile[]>([]);

const uploadRef = ref<UploadInstance>();
const downloadTemplate = () => {
  const tHeader = ['小哥工号'];
  exportDataByExcel([tHeader, []], '小哥画像上传模板.xlsx');
};

/* 上传前大小校验 */
const onBeforeUpload = (file: UploadRawFile) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  const isExcel = /\.(xls|xlsx)$/.test(file.name);
  if (!isLt2M || !isExcel) {
    ElMessage.error('请上传大小不超过2MB的Excel文件!');
  }
  return isLt2M && isExcel;
};

/* 覆盖前一个文件 */
const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    uploadRef.value!.handleStart(file);
    uploadRef.value!.submit();
};

const onChange = (uploadFile: UploadUserFile) => {
  if (uploadFile.status === 'success' && uploadFile.response) {
    const { success, obj, errorMessage } = (uploadFile.response || {}) as any;
    if (success) return emits('change', obj?.pmpOssPath || '');
    ElMessage.error(errorMessage ?? '上传失败');
    uploadRef.value!.clearFiles();
  }
};

/* 给list赋默认值 */
watch(
  props,
  () => {
    if (!props.url) return;
    fileList.value = [
      {
        uid: genFileId(),
        name: props.url,
        url: props.url,
      },
    ];
  },
  { immediate: true },
);
</script>
<template>
  <div class="upload-persona">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :disabled="props.disabled"
      accept=".xls,.xlsx"
      type="primary"
      :limit="1"
      drag
      :action="IMPORT_PORTRAIT_URL"
      :on-change="onChange"
      :on-remove="() => emits('change', '')"
      :before-upload="onBeforeUpload"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">上传画像</el-button>
      <template #tip>
        <div class="el-upload__tip">*小哥数量不超过50000</div>
      </template>
    </el-upload>
    <el-button text type="primary" class="btn-template" @click="downloadTemplate">下载模板</el-button>
  </div>
</template>

<style scoped lang="scss">
  .upload-persona {
    position: relative;

    :deep(.el-upload-list--text) {
      border: none;
      margin: 0;
      padding: 0;
    }
    :deep(.el-upload__tip) {
      margin: 0;
    }
    .btn-template {
      position: absolute;
      top: 40px;
      right: -100px;
    }
  }
</style>
