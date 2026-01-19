<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import type {
  PlopActionHooksChanges,
  PlopActionHooksFailures,
  PlopGeneratorConfigNew,
} from '../../../../plop-tool/types';
import { runPlopAction } from '../../../../plop-tool/vite/client';

const props = defineProps<PlopGeneratorConfigNew>();

const loading = ref(false);

const formRef = ref<FormInstance>();

const formState = ref<Record<string, any>>();
const formShow = computed<Record<string, any>>(() => {
  const showObj:Record<string, any> = {};
  if (!formState.value) return showObj;

  props.prompts.forEach((item) => {
    // @ts-ignore
    showObj[item.name] = item.when ? item.when(formState.value) : true;
  });

  return showObj;
});

const changes = ref<PlopActionHooksChanges[]>();
const failures = ref<PlopActionHooksFailures[]>();

watch(props, (newValue) => {
  if (!formState.value && newValue) {
    // 初始化formState
    formState.value = {};
    newValue.prompts.forEach((item) => {
      formState.value![item.name!] = item.default !== undefined ? item.default : '';
    });
  }
}, {
  immediate: true,
});

const formRules = computed(() => {
  const rules:any = {};
  props.prompts.forEach((item) => {
    const rule:any = {
      required: true,
    };

    if (item.validate) {
      rule.validator = (rule: any, value: any, callback: any) => {
        const res:any = item.validate!(value);
        if (res === true) {
          callback();
        } else {
          callback(new Error(res));
        }
      };
    } else {
      rule.message = item.message;
    }

    rules[item.name!] = rule;
  });
  return rules;
});

const submit = () => {
  console.log(formState);
  formRef.value && formRef.value.validate((valid: boolean) => {
    if (!valid) return;
    // 验证通过

    loading.value = true;
    setTimeout(() => {
      // 异步太快，添加一点延迟
      runPlopAction({
        name: props.name,
        data: toValue(formState),
      }).then((res) => {
        loading.value = false;
        changes.value = res.changes;
        failures.value = res.failures;
        console.log('runPlopAction', res);
      });
    }, 600);
  });
};

</script>

<template>
 <el-form v-if="formState" ref="formRef" :rules="formRules" :model="formState" :validate-on-rule-change="false">
   <el-form-item v-if="tips">
     <el-tag type="warning">{{ tips }}</el-tag>
   </el-form-item>

   <template  v-for="item in prompts">
     <el-form-item
       v-if="formShow[item.name!]"
       :key="item.name"
       :label="item.message"
       :prop="item.name"
       required>

         <el-input
           v-if="'input'===item.type"
           v-model="formState[item.name!]"
           :placeholder="item.suffix"/>
         <el-switch
           v-else-if="'confirm'===item.type"
           v-model="formState[item.name!]"
           inline-prompt
           active-text="是"
           inactive-text="否"
         />
         <el-select
           v-else-if="'list'===item.type"
           v-model="formState[item.name!]"
           filterable
           :placeholder="item.suffix"
         >
           <el-option
             v-for="option in item.choices"
             :key="option"
             :label="option"
             :value="option"
           />
         </el-select>
     </el-form-item>

   </template>

   <el-form-item>
     <el-button :loading="loading" type="primary" @click="submit">提交</el-button>
   </el-form-item>

   <el-alert
     v-if="!loading && changes && changes.length>0"
     title="创建成功"
     type="success"
     show-icon
   >
     <pre style="white-space: pre-wrap">{{JSON.stringify(changes,null, '&nbsp;&nbsp;&nbsp;&nbsp;')}}</pre>
   </el-alert>

   <el-alert
     v-if="!loading && failures && failures.length>0"
     title="创建失败"
     type="error"
     show-icon
   >
     <pre style="white-space: pre-wrap">{{JSON.stringify(failures,null, '&nbsp;&nbsp;&nbsp;&nbsp;')}}</pre>
   </el-alert>
 </el-form>
</template>

<style scoped>

</style>
