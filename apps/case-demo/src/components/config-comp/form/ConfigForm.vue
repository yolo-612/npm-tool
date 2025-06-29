<template>
  <el-form 
    class="config-form-box"
    :ref="configFormRef" 
    :model="formData"
    v-bind="props.formConfig.formProps"
  >
    <div 
      v-for="(subForm, index) in props.formConfig.subFormList"
      :key="index"
    >
      <template v-if="!subForm.hidden">
        <!------------------ 子表表头 start ------------------>
        <div>
          <!-- 自定义表头 -->
          <component
            v-if="subForm.customHeader?.component"
            :is="subForm.customHeader.component!"
            v-bind="subForm.customHeader.props || {}" />
          <!-- 默认表头 -->
          <SubFormHeader 
            v-else-if="subForm.header"
            :headerData="subForm.header"
          />
        </div>
        <!------------------ 子表表头 end ------------------>

        <!------------------ 子表表单 start ------------------>
        <component
          v-if="subForm.customContent?.component"
          :is="subForm.customContent.component"
          v-bind="subForm.customContent.props || {}" 
        />
        <SubFormBody 
          v-else
          :formConfig="props.formConfig"
          :subForm="subForm"
          :formData="formData"
        />
        <!------------------ 子表表单 end ------------------>

        <!------------------ 子表footer start ------------------>
        <component
          v-if="subForm.customFooter?.component"
          :is="subForm.customFooter.component!"
          v-bind="subForm.customFooter.props || {}"
        />
        <!------------------ 子表footer end ------------------>
      </template>
    </div>
  </el-form>
</template>

<script setup lang='ts'>
import type { IFormConfig } from '@/components/config-comp/form/types'

import { getCurrentInstance, defineModel } from 'vue'
import SubFormHeader from '@/components/config-comp/form/components/SubFormHeader.vue'
import SubFormBody from '@/components/config-comp/form/components/SubFormBody.vue'


export interface IFormProps {
  /** 表单配置 */
  formConfig: IFormConfig;
}
const props = defineProps<IFormProps>()

/** 表单数据 */
const formData = defineModel<Record<string, any>>({required: true})

/**
 * 以下实现参考 “远方os” 的视频实现
 *  */ 
/** 获取到组件当前的示例 */
const vm = getCurrentInstance();
/** ref也可以传入 函数，内部的形参是 绑定 ref的 组件实例，这里是指 ElForm*/ 
const configFormRef = (configFormInstance) => {
  // 当form组件被v-if指令命中设置为false后，configFormInstance为null， 
  // 所以返回空对象避免外部调用直接报错
  vm.exposed = configFormInstance || {}
  vm.exposeProxy = configFormInstance || {}
} 
</script>

<style lang='scss' scoped>

</style>
