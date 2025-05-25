<script lang="ts" setup>
import { ElForm } from 'element-plus';
import { ref, reactive } from 'vue'
import SubFormHeader from './components/SubFormHeader.vue';
import SubFormBody from './components/SubFormBody.vue';
import type { IFormConfig, ISubForm, IFormItem } from './types';
import { FormItemType } from './types';

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
  name: 'ConfigForm',
  inheritAttrs: false,
});

/* header中表头状态默认打开 */
const headerStatusList = (props.formConfig.subFormList || [])?.map((subForm: ISubForm) => {
  return subForm.header?.isActive ?? true;
});

/**
 * 表头点击事件
 */
const onHeaderClick = (subForm: ISubForm, index: number) => {
  state.headerStatusList[index] = !state.headerStatusList[index];
};

/* form状态维护 */
const state = reactive<ISaspFormState>({
  formData: props.modelValue,
  headerStatusList,
  formContainerRef: null,
  subFormBodyRefMap: new Map([]),
});

</script>

<template>
  <div ref="formContainerRef" class="acsp-form">
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
        </template>
      </div>
    </el-form>
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
