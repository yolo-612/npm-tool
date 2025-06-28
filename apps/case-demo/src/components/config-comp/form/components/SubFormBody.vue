<template>
  <div class="sub-form-body">
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
          <SubFormItem v-bind="formItem" :formData="formData"/>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import type { IFormConfig, ISubForm } from '@/components/config-comp/form/types'
import SubFormItem from './SubFormItem.vue'

interface ISubFormRowProps {
  /** 表单配置 */
  formConfig: IFormConfig;
  /** 子表 */
  subForm: ISubForm;
  /** 表单数据 */
  formData: Record<string, any>;
}

const props = defineProps<ISubFormRowProps>()
</script>

<style lang='scss' scoped>

</style>
