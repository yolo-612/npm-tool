<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // 引入样式

interface IPropImgUpload {
  /** 绑定字段名 */
  name: string;
  /** 值 */
  value?: string;
  /** input 属性 */
  fieldProps?: any;
}

// props
const props = defineProps<IPropImgUpload>();

// emits
const emits = defineEmits(['uploadSuccess']);

// 值
const inputVal = ref(props.value);

// 编辑器选项
const editorOption = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      // ['bold', 'italic', 'underline', 'strike'],
      // ['blockquote', 'code-block'],
      // [{ header: 1 }, { header: 2 }],
      // [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ script: 'sub' }, { script: 'super' }],
      // [{ indent: '-1' }, { indent: '+1' }],
      // [{ direction: 'rtl' }],
      // [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      // [{ align: [] }],
      ['clean'],
      // ['link', 'image', 'video'],
    ],
  },
};

// 更新值
watch(() => inputVal.value, (val) => {
  emits('uploadSuccess', props.name, val);
});

watch(() => props.value, (val) => {
  inputVal.value = val;
});

/** 计算字数 */
const cTilLen = computed(() => {
  try {
    const text = inputVal.value as string;
    return text.replace(/<[^>]+>/g, '').length || 0;
  } catch {
    return 0;
  }
});

/**
 * 删除最后一个非标签字符
 * @param node 节点
 */
const traverseNode = (node: { nodeType: number; textContent: any; childNodes: any; }): string | null | undefined => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (text.length > 0) {
      const lastChar = text[text.length - 1];
      const newText = text.slice(0, -1);
      node.textContent = newText;
      return lastChar;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const children = node.childNodes;
    let lastChar;
    for (let i = children.length - 1; i >= 0; i--) {
      lastChar = traverseNode(children[i]);
      if (lastChar) {
        break;
      }
    }
    return lastChar;
  }
  return null;
};

/**
 * 删除最后一个非标签字符
 * @param html 字符串
 */
const getPlainText = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  traverseNode(div);
  return div.innerHTML;
};

// 编辑器内容变化事件
const onEditorChange = () => {
  const plainText = inputVal.value ? inputVal.value.replace(/<[^>]+>/g, '') : '';
  if (plainText.length > props?.fieldProps?.maxlength) {
    inputVal.value = getPlainText(inputVal.value as string);
  }
};
</script>

<template>
  <div class="input-container">
    <QuillEditor
      v-model:content="inputVal"
      :class="{ 'maxlength': fieldProps?.maxlength }"
      :options="editorOption"
      content-type="html"
      placeholder="请输入内容"
      @textChange="onEditorChange"
    />
    <span v-if="fieldProps?.maxlength" class="wordNumber">{{ cTilLen }}/{{ fieldProps?.maxlength }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  width: 550px;
  .wordNumber {
    position: absolute;
    right: 10px;
    bottom: 0;
  }
  :deep(.ql-editor *) {
    font: revert;
  }
  :deep(.maxlength .ql-editor) {
    padding: 12px 15px 25px;
  }
}
</style>
