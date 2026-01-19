<script setup lang="ts">
import { AcspForm } from '@fpkg/components-web';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';

definePage({
  meta: {
    title: '查看小哥画像',
    permission: ['empPortrait'],
    ignoreCache: true,
  },
});

const formRef = ref<InstanceType<typeof AcspForm>>();
const state = useAction(formRef, 'detail');
const { formConfig } = useConfig(state, 'detail');
</script>

<template>
  <div v-loading="state.loading.page">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <AcspForm ref="formRef" v2 :model-value="state.formData" :form-config="formConfig" />
  </PageMain>
  </div>
</template>
