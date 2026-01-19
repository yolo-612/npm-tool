<script setup lang="ts">
import { ElMessage, ElUpload, genFileId } from 'element-plus';
import type {
  UploadRawFile, UploadUserFile, UploadProps, UploadInstance,
} from 'element-plus';
import { UPLOAD_URL } from '@/apis/methods/common';

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

/* 上传前大小校验 */
const onBeforeUpload = async (file: UploadRawFile) => {
  console.log('beforeupload', file);
  // 判断是否是 jpeg、jpg、png 格式的图片
  const isJPEG = /\.jpe?g$/.test(file.name);
  const isPNG = /\.png$/.test(file.name);
  if (!isPNG && !isJPEG) {
    ElMessage.error('请上传 png 或者 jpg 图片!');
    return false;
  }
  const { width, height } = (await getImageSize(file)) ?? {};

  if (width !== 540 || height !== 842) {
    ElMessage.error('请上传540*842的图片!');
    return false;
  }
  if (file.size / 1024 > 200) {
    ElMessage.error('上传图片大小不能超过 200KB');
    return false;
  }

  return true;
};

/** 获取上传文件的图片尺寸 */
const getImageSize = async (file: UploadRawFile): Promise<{ width: number; height: number } | undefined> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
  });
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
  console.log('change', uploadFile);
  if (uploadFile.status === 'success' && uploadFile.response) {
    const { success, obj, errorMessage } = (uploadFile.response || {}) as any;
    if (success) return emits('change', obj?.url || '');
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
  <div class="upload-poster">
    <el-upload
      ref="uploadRef"
      :show-file-list="false"
      :disabled="props.disabled"
      accept="image/png, image/jpg, image/jpeg"
      type="primary"
      :limit="1"
      drag
      :action="UPLOAD_URL"
      :on-change="onChange"
      :on-remove="() => emits('change', '')"
      :before-upload="onBeforeUpload"
      :on-exceed="handleExceed"
    >
      <img v-if="url" :src="url" class="upload-picture">
      <template #tip>
        <div class="el-upload__tip">上传图片格式: PNG 或者 JPG，尺寸 540 * 842，大小 200KB 以内</div>
      </template>
    </el-upload>
  </div>
</template>

<style scoped lang="scss">
  .upload-poster {
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
    .upload-picture {
      width: 91px;
      height: 178px;
      display: block;
    }
  }
</style>
