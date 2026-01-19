<script lang="ts" setup>
import { AcspForm,FieldSelect } from '@fpkg/components-web';
import useDemoActins from './composables/useDemoActions';
import useDemoConfig from './composables/useDemoConfig';
import * as Comp from '@fpkg/components-web'

// console.log('useDemoActins===', useDemoActins);
// console.log('useDemoConfig===', useDemoConfig);

/* 取model */
const { formRef, state, onSaveDraft } = useDemoActins();
console.log('====',Comp)
/* 取配置 */
const config = useDemoConfig(state, formRef);
</script>

<template>
  <div>
    {{ state.formData }}
    <AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="config" />
    <el-button @click="onSaveDraft" v-debounce="500">保存草稿</el-button>
  </div>
</template>

<style scoped>
:deep(.test-class) {
  color: red;
}
</style>
