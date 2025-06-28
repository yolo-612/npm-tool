<template>
  <el-form 
    class="config-form-box" 
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
import SubFormBody from './components/SubFormBody.vue'

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
</script>

<style lang='scss' scoped>

</style>
