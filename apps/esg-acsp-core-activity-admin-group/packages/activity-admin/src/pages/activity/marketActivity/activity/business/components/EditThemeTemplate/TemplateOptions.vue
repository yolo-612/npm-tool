<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { uGetImageDimensions } from '@/utils/tool';
import { FormUpload, FormQuillEditor } from '@/components/form';
import { E_TABLIST } from './types';

interface Props {
  activeTabs: string; // 当前激活的标签页
  formData: any; // 表单数据
  isDisabled: boolean; // 是否禁用
}

const props = defineProps<Props>();
const emits = defineEmits(['update:formData']);

// 创建 formData 的本地副本
const localFormData = ref({ ...props.formData });

// 监听 props.formData 的变化，同步更新本地副本
watch(
  () => props.formData,
  (newVal) => {
    localFormData.value = { ...newVal };
  },
  { deep: true },
);

// 监听本地副本的变化，通知父组件更新
watch(
  localFormData,
  (newVal) => {
    emits('update:formData', newVal);
  },
  { deep: true },
);

// 验证活动背景图
const validateBackgroundImage = async (file: File): Promise<boolean> => {
  if (file.size > 1024 * 1024 * 5) {
    ElMessage.error('文件大小不能超过5M');
    return false;
  }
  const obj: any = await uGetImageDimensions(file);
  if (obj.width !== 750) {
    ElMessage.error('上传的图片尺寸不正确');
    return false;
  }
  return true;
};

// 验证按钮图片
const validateButtonImage = async (file: File): Promise<boolean> => {
  if (file.size > 1024 * 1024 * 5) {
    ElMessage.error('文件大小不能超过5M');
    return false;
  }
  const obj: any = await uGetImageDimensions(file);
  if (obj.width > 600 || obj.height > 200) {
    ElMessage.error('上传的图片尺寸不正确');
    return false;
  }
  return true;
};
</script>

<template>
  <div class="edit-theme-template-body-options">
    <!-- HOME 选项 -->
    <div v-if="activeTabs === E_TABLIST.HOME" class="edit-theme-template-activity-tabs-panel">
      <div class="edit-theme-template-body-options-item flex">
        <div class="label">
          <span class="required">*</span>
          <span>页面标题：</span>
        </div>
        <el-input
          v-model.trim="localFormData.pageTitle"
          style="width: 240px"
          :maxlength="10"
          :disabled="isDisabled"
          placeholder="请输入页面标题"
        />
      </div>
      <div class="edit-theme-template-body-options-item flex">
        <div class="label">
          <span class="required">*</span>
          <span>活动背景图：</span>
        </div>
        <FormUpload
          v-model="localFormData.pageBgUrl"
          action="/activity-web-backend/pmp-store/web/image/upload"
          tips="图片尺寸宽度必须750px，格式仅支持jpg、png、gif格式，文件大小不超过5M"
          :width="235"
          :height="235"
          :disabled="isDisabled"
          :before-upload="validateBackgroundImage"
        />
      </div>
      <div class="edit-theme-template-body-options-item flex">
        <div class="label">
          <span class="required">*</span>
          <span>页面背景色：</span>
        </div>
        <input
          v-model="localFormData.pageBgColor"
          type="color"
          size="large"
          style="width: 32px;height: 32px;margin-right: 10px;"
          :disabled="isDisabled"
        />
        <el-input
          v-model.trim="localFormData.pageBgColor"
          style="width: 240px"
          placeholder="请输入背景色"
          :maxlength="20"
          :disabled="isDisabled"
        />
      </div>
      <div class="edit-theme-template-body-options-item flex">
        <div class="label">
          <span class="required">*</span>
          <span>按钮图片：</span>
        </div>
        <FormUpload
          v-model="localFormData.pageBtnUrl"
          action="/activity-web-backend/pmp-store/web/image/upload"
          tips="图片尺寸宽度<=600px，高度<=200px，格式仅支持jpg、png、gif格式，文件大小不超过5M"
          :width="235"
          :height="235"
          :disabled="isDisabled"
          :before-upload="validateButtonImage"
        />
      </div>
    </div>

    <!-- RULE 选项 -->
    <div v-else-if="activeTabs === E_TABLIST.RULE" class="edit-theme-template-activity-tabs-panel">
      <div class="edit-theme-template-body-options-item">
        <div class="label quill-editor">
          <span class="required">*</span>
          <span>规则活动：</span>
        </div>
        <FormQuillEditor
          v-model="localFormData.pageRuleText"
          :readOnly="isDisabled"
          :height="400"
          :max-length="2000"
        />
      </div>
    </div>

    <!-- AGREEMENT 选项 -->
    <div v-else-if="activeTabs === E_TABLIST.AGREEMENT" class="edit-theme-template-activity-tabs-panel">
      <div class="edit-theme-template-body-options-item">
        <div class="label quill-editor">
          <span class="required">*</span>
          <span>个人信息保护协议：</span>
        </div>
        <FormQuillEditor
          v-model="localFormData.pageAgreementText"
          :readOnly="isDisabled"
          :height="400"
          :max-length="2000"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-theme-template-body-options {
  padding: 20px 0 20px 10px;
  .edit-theme-template-body-options-item {
    margin-bottom: 20px;
    .label {
      width: 110px;
      padding-top: 8px;
      display: inline-block;
      font-size: 14px;
      text-align: right;
      .required {
        color: red;
      }
    }
    &.flex {
      display: flex;
    }
    .label.quill-editor {
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
    }
  }
}
</style>
