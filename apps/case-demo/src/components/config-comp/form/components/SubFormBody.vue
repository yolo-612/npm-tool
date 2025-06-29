<template>
  <div class="sub-form-body">
    <el-row
      :gutter="22"
      v-bind="{
        ...props.formConfig.rowProps,
        ...props.subForm.rowProps,
      }"
    >
      <template v-for="(formItem, index) in props.subForm.formItemList" :key="index">
        <el-col
          v-if="!formItem.hidden"
          :span="8"
          v-bind="{
            ...props.formConfig.colProps,
            ...props.subForm.colProps,
            ...formItem.colProps,
          }"
        >
          <SubFormItem 
            v-bind="formItem" 
            :formData="props.formData" 
            :disabled="props.formConfig.type === 'detail'"
          />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import type { IFormConfig, ISubForm } from '@/components/config-comp/form/types'
import SubFormItem from '@/components/config-comp/form/components/SubFormItem.vue'

interface ISubFormRowProps {
  /** 表单配置 */
  formConfig: IFormConfig;
  /** 子表 */
  subForm: ISubForm;
  /** 表单数据 */
  formData: Record<string, any>;
}

const props = defineProps<ISubFormRowProps>()

defineOptions({
  name: 'SubFormBody',
});
</script>

<style lang='scss' scoped>

</style>
