<script setup lang="ts">
import { ElMessage, ElUpload, genFileId } from 'element-plus';
import { watch } from 'vue';
import type {
  UploadRawFile, UploadUserFile, UploadProps, UploadInstance, UploadFile,
} from 'element-plus';

export interface IFieldUploadProps {
  modelValue: string | string[];
  /** 上传数量限制 */
  limit?: number;
  /** 上传大小限制 单位KB */
  size?: number;
  /** 文件类型 */
  accept?: string;
  /** 提示 */
  tips?: string;
  getUrl?: (obj: any) => string;
  beforeUpload?: UploadProps['beforeUpload'];
}

const props = defineProps<IFieldUploadProps>();

const emits = defineEmits(['update:modelValue', 'change']);

const attrs = useAttrs();

/* 上传数量限制 */
const uploadLimit = computed(() => {
  if (typeof props.modelValue === 'string') return 1;
  return props.limit;
});

/* 本地维护的文件列表 */
const fileList = ref<UploadUserFile[]>([]);

const uploadRef = ref<UploadInstance>();

const formatToM = (size: number) => {
  return parseFloat((size / 1024).toFixed(2));
};

/* 上传前大小校验 */
const onBeforeUpload = async (file: UploadRawFile) => {
  /* 文件类型 */
  let isTypeOk = true;
  if (props.accept) {
    const fileNameExt = file.name.split('.').pop() || '';
    const fileType = file.type;
    isTypeOk = props.accept.split(',').some((type:string) => {
      if (type.includes('/*')) return fileType.includes(type.split('/').shift() as string);
      return type.includes(fileNameExt);
    });
  }
  if (!isTypeOk) {
    ElMessage.error(`请上传${props.accept}类型的文件`);
    return false;
  }
  /* 文件大小 */
  const isSizeOk = props.size ? file.size / 1024 < props.size : true;
  if (!isSizeOk) {
    const msg = (props.size as number) < 1024 ? `${props.size}KB` : `${formatToM(props.size as number)}MB`;
    ElMessage.error(`文件大小超过限制${msg}`);
    return false;
  }
  /* 其他限制 */
  const isExtOK = props.beforeUpload ? await props.beforeUpload(file) : true;
  return isExtOK;
};

/* 覆盖前一个文件 */
const onExceed: UploadProps['onExceed'] = (files) => {
  if (uploadLimit.value && uploadLimit.value > 1) return ElMessage.error('上传数量超过限制');
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  handleBind('');
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
  uploadRef.value!.submit();
};

/* 处理地址变动 */
const onChange = (uploadFile: UploadUserFile) => {
  if (uploadFile.status === 'success' && uploadFile.response) {
    const { success, obj, errorMessage } = uploadFile.response || ({} as any);
    if (!success) {
      uploadRef.value!.handleRemove(uploadFile.raw as UploadRawFile);
      ElMessage.error(errorMessage || '上传失败');
      return;
    }
    const content = props.getUrl ? props.getUrl(obj) : obj?.url;
    // eslint-disable-next-line no-param-reassign
    uploadFile.url = content;
    handleBind(content);
  }
};

/* 处理移除数据 */
const onRemove = (uploadFile: UploadFile) => {
  if (uploadFile.status === 'success') {
    const index = fileList.value.findIndex((item:UploadUserFile) => item.uid === uploadFile.uid);
    fileList.value.splice(index, 1);
    handleBind('');
  }
};
/* 处理数据绑定 */
const handleBind = (content: string) => {
  if (typeof props.modelValue === 'string') {
    emits('update:modelValue', content);
    emits('change', content);
  } else {
    const list = fileList.value.map((item:UploadUserFile) => item.url);
    emits('update:modelValue', list);
    emits('change', list);
  }
};

watch(
  () => props.modelValue,
  (value) => {
    if (!value || !value?.length) {
      fileList.value = [];
      return;
    }
    const list = typeof props.modelValue === 'string' ? [props.modelValue] : props.modelValue;
    fileList.value = list.map((item:string) => ({
      uid: genFileId(),
      name: item,
      url: item,
      status: 'success',
    }));
  },
  { deep: true, immediate: true },
);
</script>
<template>
  <ElUpload
    ref="uploadRef"
    v-model:file-list="fileList"
    :limit="uploadLimit"
    :before-upload="onBeforeUpload"
    :on-exceed="onExceed"
    :on-change="onChange"
    :on-remove="onRemove"
    v-bind="attrs">
    <el-button type="primary" :disabled="(attrs.disabled as boolean)">上传</el-button>
    <template v-if="props.tips" #tip>
      <div class="el-upload__tip">{{ props.tips }}</div>
    </template>
  </ElUpload>
</template>

<style scoped lang="scss">
:deep(.el-upload-list--text) {
  border: none;
  margin: 0;
  padding: 1px;
}
:deep(.el-upload__tip) {
  margin: 0;
}
</style>
