<template>
  <el-form 
    class="config-form-box"
    :ref="configFormRef" 
    :model="formData"
    v-bind="formConfig.formProps"
  >
    <div 
      v-for="(subForm, index) in formConfig.subFormList"
      :key="index"
    >
      <template v-if="!subForm.hidden">
        <SubFormBody 
          :formConfig="formConfig"
          :subForm="subForm"
          :formData="formData"
        />
      </template>
    </div>
  </el-form>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
import SubFormBody from '@/components/config-comp/form/components/SubFormBody.vue'

const props = defineProps({
  formConfig: {
    type: Array,
    default: ()=> []
  },
  formData: {
    type: Object,
    default: ()=> {}
  }
})

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
