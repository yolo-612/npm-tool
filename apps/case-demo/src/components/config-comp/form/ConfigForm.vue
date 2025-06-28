<template>
  <el-form class="config-form-box" :model="formData">
    <template v-for="(formItem, index) in formConfig" :key="index">
      <el-form-item
        :label="formItem.label" 
        :rules="formItem.rules"
        :prop="formItem.name"
      >
        <component 
          :is="formItem.type === 'FieldSelect' ? FieldSelect : `${formItem.type}`"
          v-bind="formItem.fieldProps"
          v-model="formData[formItem.name]"
        ></component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang='ts'>
import FieldSelect from './components/FieldSelect.vue'
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
