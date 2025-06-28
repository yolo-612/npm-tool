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
        <el-row
          :gutter="22"
          v-bind="{
            ...formConfig.rowProps,
            ...subForm.rowProps,
          }"
        >
          <template v-for="(formItem, index) in subForm.formItemList" :key="index">
            <el-col
              v-if="!formItem.hidden"
              :span="8"
              v-bind="{
                ...formConfig.colProps,
                ...subForm.colProps,
                ...formItem.colProps,
              }"
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
      </template>
    </div>
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
