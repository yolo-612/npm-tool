<script lang="ts" setup>
import { ElForm, ElScrollbar } from 'element-plus';
import SubFormBody from './components/SubFormBody.vue';
import SubFormHeader from './components/SubFormHeader.vue';
import type { IFormConfig, ISubForm, IFormItem } from './types';
import { FormItemType } from './types';
import { useForwardFormMethods } from './composables/useForwardFormMethods';

export interface ISaspFormProps {
  /** 数据 */
  modelValue: Record<string, any>;
  /** 表单配置 */
  formConfig: IFormConfig;
  /** 是否自动滚动 */
  autoScroll?: boolean;
}

interface ISaspFormState {
  /** 表单数据 */
  formData: Record<string, any>;
  /** 表头展开状态数组 */
  headerStatusList: boolean[];
  /** formContainerRef */
  formContainerRef: HTMLDivElement | null;
  /** subFormBodyRefMap */
  subFormBodyRefMap: Map<number, InstanceType<typeof SubFormBody> | null>;
}

const props = withDefaults(defineProps<ISaspFormProps>(), {
  autoScroll: true,
});
defineOptions({
  name: 'AcspForm',
  inheritAttrs: false,
});
/* header中表头状态默认打开 */
const headerStatusList = (props.formConfig.subFormList || [])?.map((subForm: ISubForm) => {
  return subForm.header?.isActive ?? true;
});

/* form状态维护 */
const state = reactive<ISaspFormState>({
  formData: props.modelValue,
  headerStatusList,
  formContainerRef: null,
  subFormBodyRefMap: new Map([]),
});

/* 表单引用 */
const elFormRef = ref<InstanceType<typeof ElForm> | null>(null);
/* 子表单引用 */
const setSubFormRef = (el: any, index: number) => {
  el && state.subFormBodyRefMap.set(index, el as any);
};

// defaultValue
props.formConfig.subFormList?.forEach((subForm: ISubForm) => {
  subForm.formItemList?.forEach((item: IFormItem) => {
    if (item.name) {
      // checkbox 默认给空数组
      if (item.type === FormItemType.Checkbox) {
        if (!state.formData[item.name]) {
          state.formData[item.name] = [];
        }
      }
      if (item.defaultValue !== undefined) {
        state.formData[item.name] = item.defaultValue;
      }
    }
  });
});

// 转发 ElForm 的所有方法
const { formMethods } = useForwardFormMethods(elFormRef);

/**
 * 表头点击事件
 */
const onHeaderClick = (subForm: ISubForm, index: number) => {
  state.headerStatusList[index] = !state.headerStatusList[index];
};

// 监听modelValue变化
watch(
  () => props.modelValue,
  (val) => {
    state.formData = val;
  },
);

defineExpose({
  ...toRefs(formMethods),
});
</script>

<template>
  <div ref="formContainerRef" class="acsp-form">
    <!-- 容器是滚动条的容器还是普通容器 -->
    <component
      :is="autoScroll ? ElScrollbar : 'div'"
      class="form-container-scrollbar"
      :wrap-style="{ overflowX: 'hidden' }">
      <el-form ref="elFormRef" :model="state.formData" v-bind="{ ...formConfig.formProps, ...$attrs }">
        <!-- 渲染子表单 -->
        <div
          v-for="(subForm, index) in formConfig.subFormList"
          :key="index"
          :class="['sub-form', { detail: formConfig.type === 'detail' }]">
          <template v-if="!subForm.hidden">
            <!------------------ 子表表头 start ------------------>
            <div>
              <!-- 自定义表头 -->
              <component
                :is="subForm.customHeader.component!"
                v-if="subForm.customHeader?.component"
                v-bind="subForm.customHeader.props || {}" />
              <!-- 默认表头 -->
              <sub-form-header
                v-else-if="subForm.header"
                :headerData="subForm.header"
                :isActive="state.headerStatusList[index]"
                @headerClick="onHeaderClick(subForm, index)" />
            </div>
            <!------------------ 子表表头 end ------------------>

            <!------------------ 子表表单 start ------------------>
            <!-- 子表单自定义展示 -->
            <component
              :is="subForm.customContent.component"
              v-if="subForm.customContent?.component"
              v-bind="subForm.customContent.props || {}" />
            <!-- 子表表单展示 -->
            <sub-form-body
              v-else
              v-show="!subForm.header || state.headerStatusList[index]"
              :ref="(el) => setSubFormRef(el, index)"
              :subForm="subForm"
              :formConfig="formConfig"
              :formData="state.formData" />
            <!------------------ 子表表单 end ------------------>

            <!------------------ 子表footer start ------------------>
            <component
              :is="subForm.customFooter.component!"
              v-bind="subForm.customFooter.props || {}"
              v-if="subForm.customFooter?.component"
              v-show="state.headerStatusList[index]" />
            <!------------------ 子表footer end ------------------>
          </template>
        </div>
      </el-form>
    </component>
  </div>
</template>
<style lang="scss" scoped>
.form-container-scrollbar {
  & > .is-horizontal {
    display: none;
  }
}
.acsp-form {
  height: 100%;
  margin: 0 -10px;
  .form-container-scrollbar {
    height: 100%;
    ::v-deep() {
      .el-form {
        padding: 0 20px;
      }
    }
  }
}
</style>
