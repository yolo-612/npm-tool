<script setup lang="ts">
import type { PropType } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // 引入样式
import useEditAction from './useEditAction';
import TemplateTabs from './TemplateTabs.vue';
import TemplateContent from './TemplateContent.vue';
import TemplateOptions from './TemplateOptions.vue';

/** 父组件传递过来的数据 */
defineProps({
  /** 收集项 */
  collections: {
    type: Array as PropType<string[]>,
    default: [],
  },
});

/** 显示组件 */
const emits = defineEmits(['handleSaveTemplateInfo', 'handlePageStatus']);
/** home 节点 */
const coverRenderer = ref<HTMLElement>();
/** use hook 方法 */
const state = useEditAction(coverRenderer, emits);
/** 页面背景 */
const rendererStyle = computed(() => {
  if (state.form.pageBgUrl) {
    return {
      backgroundImage: `url(${state.form.pageBgUrl})`,
      backgroundSize: '375px 812px',
      backgroundRepeat: 'no-repeat',
    };
  }
  return {};
});

/** 导出方法 */
defineExpose({
  showTemplateInfo: state.showTemplateInfo,
});

</script>

<template>
  <div v-if="state.visible.value" class="edit-theme-template">
    <div class="edit-theme-template-header">
      <div class="header-left">
        <el-button @click="state.visible.value = false">返回</el-button>
        <el-input
          v-model.trim="state.form.templateName"
          style="width: 240px"
          :maxlength="10"
          :disabled="state.isDisabled.value"
          placeholder="请输入模板名称"
        />
      </div>
      <div class="header-right">
        <el-button v-if="!state.isDisabled.value" type="primary" @click="state.commitTemplateInfo">保存</el-button>
      </div>
    </div>
    <div class="edit-theme-template-body">
      <TemplateTabs
        :activeTabs="state.activeTabs.value"
        @changeTabs="(val) => { state.activeTabs.value = val }"
      />
      <TemplateContent
        :activeTabs="state.activeTabs.value"
        :pageTitle="state.form.pageTitle"
        :pageBgUrl="state.form.pageBgUrl"
        :pageBtnUrl="state.form.pageBtnUrl"
        :collections="collections"
        :pageBgColor="state.form.pageBgColor"
        :pageRuleText="state.form.pageRuleText"
        :pageAgreementText="state.form.pageAgreementText"
      />
      <TemplateOptions
        :activeTabs="state.activeTabs.value"
        :formData="state.form"
        :isDisabled="state.isDisabled.value"
        @update:formData="(obj: any) => Object.assign(state.form, obj)"
      />
    </div>

    <div ref="coverRenderer" class="edit-theme-template-render" :style="rendererStyle"></div>
  </div>
</template>

<style lang="scss" scoped>
.edit-theme-template {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  .edit-theme-template-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .header-left button {
      margin-right: 20px;
    }
  }
  .edit-theme-template-body {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 200px auto 420px;
  }

  .edit-theme-template-render {
    width: 375px;
    height: 812px;
    position: fixed;
    top: -100vh;
    left: -100vw;
    &:before {
      content: '';
      display: block;
      width: 375px;
      height: 812px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
