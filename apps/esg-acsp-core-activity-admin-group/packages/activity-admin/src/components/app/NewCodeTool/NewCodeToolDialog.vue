<script setup lang="ts">
import { getPlopGeneratorData } from '../../../../plop-tool/vite/client';
import type { PlopGeneratorData } from '../../../../plop-tool/types';

const dialogFormVisible = ref(false);

const plopGeneratorData = ref<PlopGeneratorData|null>(null);

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', (data) => {
    // 当完整的重载即将发生时
    console.log('vite:beforeFullReload', '当完整的重载即将发生时');
  });
}

const form = reactive({
  name: 'component',
});

const show = async () => {
  dialogFormVisible.value = true;

  plopGeneratorData.value = await getPlopGeneratorData();
};

defineExpose({
  show,
});

</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="代码文件自动生成"
    width="800"
    append-to-body
    draggable
  >
    <el-tabs v-if="dialogFormVisible && plopGeneratorData" v-model="form.name" type="border-card">
      <el-tab-pane
        v-for="item in plopGeneratorData.generators"
        :label="item.description"
        :name="item.name"
        :key="item.name"
      >
        <NewCodeForm v-bind="item" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style>

</style>
