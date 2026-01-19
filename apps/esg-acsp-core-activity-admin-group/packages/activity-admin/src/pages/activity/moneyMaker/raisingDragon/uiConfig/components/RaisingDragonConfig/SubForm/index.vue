<script setup lang="ts">
import SubFormBody from './FormItems.vue';

defineProps<{
  /** 列表标题 */
  title: string;
}>();

/** emits */
const emits = defineEmits(['uploadSuccess', 'removeImg']);

/** 获取所有非defineProps的属性 */
const attrs: any = useAttrs();

/**
 * 上传成功回调
 * @param name form的props
 * @param value form item 的值
 */
const handleUploadSuccess = (name: string, value: string) => {
  emits('uploadSuccess', name, value);
};

/**
 * 移除form item
 * @param name form的props
 */
const handleRemoveImg = (name: string) => {
  emits('removeImg', name);
};

</script>

<template>
  <div class="sub-form-header">
    <span class="sub-form-header-vertical-line"></span>
    <span class="sub-form-header-title">{{ title }}</span>
  </div>
  <SubFormBody
    v-bind="attrs"
    @uploadSuccess="handleUploadSuccess"
    @removeImg="handleRemoveImg"
  />
</template>

<style lang="scss" scoped>
.sub-form-header {
  cursor: unset;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin: 15px 0 10px 0;
  .sub-form-header-vertical-line {
    display: inline-block;
    height: 16px;
    width: 6px;
    background-color: var(--el-color-primary);
    border-radius: 1px;
  }
  .sub-form-header-title {
    padding-left: 8px;
    margin-right: 10px;
  }
}
</style>
