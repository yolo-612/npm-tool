<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ElMessage } from 'element-plus';

interface Props {
  modelValue: string; // 富文本内容
  readOnly?: boolean; // 是否只读
  toolbar?: any[]; // 工具栏配置
  contentType?: 'html' | 'text'; // 内容类型
  maxLength?: number; // 字数限制
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

// 内部绑定的值
const localContent = ref(props.modelValue);

// 监听外部 modelValue 的变化
watch(
  () => props.modelValue,
  (newVal) => {
    localContent.value = newVal;
  },
);

// 更新外部 modelValue
watch(
  () => localContent.value,
  (newVal) => {
    const plainText = stripHtmlTags(newVal); // 去除 HTML 标签
    if (plainText.length > (props.maxLength || 1000)) {
      ElMessage.warning(`字数不能超过${props.maxLength || 1000}个字符`);
      localContent.value = truncateContent(plainText, props.maxLength || 1000); // 截断内容
    } else {
      emits('update:modelValue', newVal);
    }
  },
);

// 默认工具栏配置
const defaultToolbar = [
  ['bold', 'italic', 'underline'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ['clean'],
];

// 编辑器配置
const editorOptions = computed(() => ({
  readOnly: props.readOnly || false,
  modules: {
    toolbar: props.toolbar || defaultToolbar,
  },
}));

// 内容类型
const contentType = computed(() => props.contentType || 'html');

// 计算当前字数
const wordCount = computed(() => stripHtmlTags(localContent.value).length);

// 去除 HTML 标签
const stripHtmlTags = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || '';
};

// 截断内容
const truncateContent = (text: string, maxLength: number): string => {
  return text.slice(0, maxLength);
};
</script>

<template>
  <div class="template-quill-editor">
    <QuillEditor
      v-model:content="localContent"
      :options="editorOptions"
      :content-type="contentType"
    />
    <div class="word-count">{{ wordCount }}/{{ maxLength }}</div>
  </div>
</template>

<style lang="scss" scoped>
.template-quill-editor {
  position: relative;

  :deep(.ql-editor) {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    p * {
      font: revert;
    }
  }

  .word-count {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    color: #999;
  }
}
</style>
