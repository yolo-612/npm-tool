<template>
  <el-form class="config-form-box" :model="formData">
    <el-row
      :gutter="22"
      v-bind="formConfig.rowProps"
    >
      <template v-for="(formItem, index) in formConfig" :key="index">
        <el-col
          :span="8"
          v-bind="formConfig.colProps"
        >
          <el-form-item
            :label="formItem.label" 
            :rules="formItem.rules"
            :prop="formItem.name"
          >
            <component 
              :is="dynamicComponent(formItem.type)"
              v-bind="formItem.fieldProps"
              v-model="formData[formItem.name]"
            ></component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import FieldSelect from '../fields/components/FieldSelect.vue'
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

// 动态组件逻辑
const dynamicComponent = (type)=>{
  if(type === 'FieldSelect'){
    return FieldSelect
  }
  return type
}
</script>

<style lang='scss' scoped>

</style>
