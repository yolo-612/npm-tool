<script lang='ts' setup>
import { AcspForm } from '@fpkg/components-web';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import { E_PAGE_ACTION } from './composables/types';

definePage({
  meta: {
    title: '育龙活动配置详情',
    permission: ['moneyMakerRaisingDragonActivityConfigDetail'],
  },
});
const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, E_PAGE_ACTION.DETAIL);
const { formConfig } = useConfig(state, E_PAGE_ACTION.DETAIL);
</script>

<template>
  <div v-loading="state.loading.page">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" />
    </PageMain>
  </div>
</template>
