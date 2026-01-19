<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { uGetImageDimensions } from '@/utils/tool';

interface IPropImgUpload {
  /** 绑定字段名 */
  name: string;
  /** 文件地址 */
  url: string;
  /** 上传的地址 */
  action: string;
  /** 是否显示文案 */
  showTip?: boolean;
  /** listType */
  listType?: 'text' | 'picture' | 'picture-card';
  /** 是否为图片 */
  isImage?: boolean;
  /** 提示文案 */
  tip?: string;
  /** 组件属性 */
  fieldProps?: any;
}

/** props */
const props = withDefaults(defineProps<IPropImgUpload>(), {
  isImage: true,
  showTip: true,
  listType: 'picture-card',
});

/** emits */
const emits = defineEmits(['uploadSuccess', 'removeImg']);

/** 文件上传loading中 */
const loading = ref(false);
/** 弹窗的显隐 */
const dialogVisible = ref(false);
/** 视频组件 */
const videoRef = ref();

/** 上传成功返回对象 */
interface IUploadRes {
  /** 是否成功 */
  success: boolean;
  /** 返回对象 */
  obj: { url: string };
}

/** 上传成功的回调函数 */
const handleImgSuccess = (res: IUploadRes, file: File) => {
  const { success, obj } = res || {};
  if (success && obj) {
    emits('uploadSuccess', props.name, obj.url);
  } else {
    ElMessage.error('上传失败');
  }
  loading.value = false;
};

/** 移除文件 */
const handleImgRemove = () => {
  emits('removeImg', props.name);
};

/** 上传失败的回调函数 */
const handleImgError = (err: any) => {
  console.log('上传失败', err);
  loading.value = false;
  ElMessage.error(`上传失败: ${err}`);
};

/**
 * 显示错误信息
 * @param msg 信息
 */
const showErrorMessage = (msg: string) => {
  ElMessage.error(msg);
  loading.value = false;
  return false;
};

/**
 * 上传前的验证函数
 * @param file 文件
 */
const beforeImgUpload = async (file: File) => {
  loading.value = true;
  const {
    width, height, accept, size,
  } = props?.fieldProps || {};
  /** 文件格式 */
  const isFile = accept.indexOf(file.type) !== -1;
  const isSize = file.size / 1024 / 1024 < size;
  if (!isFile) {
    return showErrorMessage(`上传文件只能是 ${accept} 格式!`);
  }
  if (!isSize) {
    return showErrorMessage(`上传文件大小不能超过 ${size < 1 ? size * 1000 + 'KB' : size * 1000 + 'M'}!`);
  }
  if (props?.isImage) {
    const obj: any = await uGetImageDimensions(file);
    if (width && obj?.width !== width) {
      return showErrorMessage(`上传的图片宽度尺寸不一致，宽度尺寸为 ${width}`);
    }
    if (height && obj?.height !== height) {
      return showErrorMessage(`上传的图片高度尺寸不一致，高度尺寸为 ${height}`);
    }
  }
  return true;
};

/**
 * 弹窗关闭事件
 */
const handleDialogClose = () => {
  // 延迟关闭，防止点击关闭按钮时，图片还没加载完就关闭了
  if (videoRef.value) {
    videoRef.value.pause(); // 暂停视频播放
    videoRef.value.currentTime = 0; // 将播放进度重置为0
  }
};
</script>

<template>
  <div class="file-upload-container">
    <div v-if="url" class="file-upload-preview">
      <el-image v-if="isImage" class="file-upload-preview-area" :src="url" fit="contain" />
      <video v-else class="file-upload-preview-area" :src="url" controls></video>
      <div class="file-upload-preview-options">
        <el-icon
          class="file-upload-preview-options-btn"
          size="20"
          color="#fff"
          @click="dialogVisible = true"
        ><ZoomIn /></el-icon>
        <el-icon
          v-if="!fieldProps.disabled"
          class="file-upload-preview-options-btn"
          size="20"
          color="#fff"
          @click="handleImgRemove"
        ><Delete /></el-icon>
      </div>
    </div>
    <div v-else-if="loading" class="file-upload-loading">
      <el-icon class="is-loading" :size="28" color="#fff">
        <Loading />
      </el-icon>
    </div>
    <el-upload
      v-else
      class="file-upload-component"
      :list-type="listType"
      :action="action"
      :accept="fieldProps?.accept"
      :show-file-list="false"
      :on-success="handleImgSuccess"
      :on-error="handleImgError"
      :before-upload="beforeImgUpload"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <div v-if="showTip" class="file-upload-tip">{{ tip }}</div>
    <el-dialog v-model="dialogVisible" class="file-upload-container-dialog" @close="handleDialogClose">
      <el-image v-if="isImage" class="file-upload-container-dialog-img" fit="contain" :src="url" alt="预览图片" />
      <video v-else ref="videoRef" class="file-upload-container-dialog-img" :src="url" controls></video>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
$file-upload-width: 550px;
$file-upload-height: 150px;

.file-upload-container {
  .file-upload-component {
    width: $file-upload-width;
    height: $file-upload-height;
    .el-upload--picture-card {
      width: $file-upload-width;
      height: $file-upload-height;
    }
  }
  .file-upload-preview {
    width: $file-upload-width;
    height: $file-upload-height;
    border: 1px dashed #cdd0d6;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .file-upload-preview-area {
      width: 100%;
      height: 100%;
    }
    .file-upload-preview-options {
      display: none;
      opacity: 0;
    }
    &:hover {
      .file-upload-preview-options {
        width: $file-upload-width;
        height: $file-upload-height;
        border-radius: 6px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        transition: opacity .3;
        .file-upload-preview-options-btn {
          cursor: pointer;
          &:first-child {
            margin-right: 15px;
          }
        }
      }
    }
  }
  .file-upload-loading {
    width: $file-upload-width;
    height: $file-upload-height;
    border: 1px dashed #cdd0d6;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .1);
  }
  .file-upload-tip {
    font-size: 12px;
    color: #999;
  }
}
</style>

<style lang="scss">
.file-upload-container {
  .file-upload-component {
    .el-upload--picture-card {
      width: 550px;
      height: 150px;
    }
  }
  .file-upload-container-dialog {
    text-align: center;
    .file-upload-container-dialog-img {
      height: 550px;
    }
  }
}
</style>
