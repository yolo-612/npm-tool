<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import { FieldUpload } from '@fpkg/components-web';
import { postUploadFile } from '@/apis/methods/activity/business';

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: '.jpg,.png,.gif',
  },
  tips: {
    type: String,
    default: '',
  },
  listType: {
    type: String,
    default: 'picture-card',
  },
  size: {
    type: Number,
    default: 1024 * 5, // 5MB
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 200,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  beforeUpload: {
    type: Function,
    default: null,
  },
});

// Emits
const emit = defineEmits(['update:modelValue']);

/** 上传input ref */
const fileInput = ref<HTMLInputElement>();

/** 上传框以及预览框的宽高 */
const imgStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };
});

// 内部模型绑定
const internalModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

// 图片上传前校验
const beforeUploadHandler = async (file: File) => {
  try {
    if (props.beforeUpload) {
      return props.beforeUpload(file); // 支持自定义校验逻辑
    }
    return false;
  } catch (err: any) {
    ElMessage.error(err.message);
    return false;
  }
};

// 图片删除
const handleRemove = () => {
  internalModel.value = ''; // 清空图片路径
};

// 图片预览
const dialogPop = reactive({
  dialogVisible: false,
  imgUrl: '',
});

/** 图片预览 */
const handlePreview = () => {
  dialogPop.dialogVisible = true;
  dialogPop.imgUrl = props.modelValue;
};

/** 图片重新上传 */
const handleUpload = () => {
  fileInput.value?.click();
};

const handleInputUpload = async (event: any) => {
  try {
    const file = event.target.files[0];
    const isValid = await props.beforeUpload(file);
    if (!isValid) return;
    try {
      // 上传图片
      const formDate = new FormData();
      formDate.append('file', file);
      const { obj } = await postUploadFile(formDate);
      if (obj.url) {
        emit('update:modelValue', obj.url);
      }
    } catch (err: any) {
      ElMessage.error(err.message);
    }
  } catch (err: any) {
    ElMessage.error(err.message);
  }
};

</script>

<template>
  <div class="file-upload-container">
    <!-- 图片上传 -->
    <FieldUpload
      v-if="!modelValue"
      v-model="internalModel"
      :action="action"
      :accept="accept"
      :tips="tips"
      :listType="listType"
      :size="size"
      :disabled="disabled"
      :beforeUpload="beforeUploadHandler"
      :style="imgStyle"
    />
    <!-- 图片预览 -->
    <div v-else class="upload-preview">
      <div class="upload-preview-img" :style="imgStyle">
        <img :src="modelValue" alt="背景图" />
        <div class="upload-preview-options">
          <el-icon
            class="upload-preview-options-btn"
            size="20"
            color="#fff"
            @click="handlePreview"
          >
            <ZoomIn />
          </el-icon>
          <el-icon
            class="upload-preview-options-btn"
            size="20"
            color="#fff"
            @click="handleUpload"
          >
            <Refresh />
          </el-icon>
          <el-icon
            v-if="!disabled"
            class="upload-preview-options-btn"
            size="20"
            color="#fff"
            @click="handleRemove"
          >
            <Delete />
          </el-icon>
        </div>
      </div>
      <span class="upload-preview-options-tips">{{ tips }}</span>
    </div>
    <el-dialog v-model="dialogPop.dialogVisible">
      <div class="upload-preview-dialog">
        <img w-full :src="dialogPop.imgUrl" alt="预览图片" />
      </div>
    </el-dialog>

    <input
      ref="fileInput"
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      style="display: none"
      @change="handleInputUpload"
    />
  </div>
</template>

<style lang="scss" scoped>
.file-upload-container {
  .upload-preview-img {
    border-radius: 10px;
    box-sizing: content-box;
    border: 2px solid #f5f5f5;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .upload-preview-options-tips {
    display: inline-block;
    width: 230px;
    margin-top: 5px;
    font-size: 12px;
    color: var(--el-text-color-regular);
  }
  :deep(.el-upload-list) {
    margin-top: 0;
  }
  :deep(.el-upload__tip) {
    margin-top: 5px;
  }
  .upload-preview-options {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    .upload-preview-options-btn {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .upload-preview-img:hover .upload-preview-options {
    opacity: 1;
  }
  .upload-preview-dialog {
    text-align: center;
  }
}
</style>
