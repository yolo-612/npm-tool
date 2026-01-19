<script lang="ts" setup>
import { AcspDialogForm } from '@fpkg/components-web';
import useAction from './composables/useDemoActions';
import useConfig from './composables/useDemoConfig';
import { useCssDemo } from './composables/useDemoActions';
import { ref } from 'vue';
// import './demo.css'


const showDialog = ref(false);

// const { demo, setVars } = useCssDemo();

const state = useAction();
const config = useConfig(state);

</script>

<template>
  <div class="demo">
    <el-button type="primary" @click="showDialog = true">打开弹窗{{ showDialog }}</el-button>
    <AcspDialogForm v-model="showDialog" :sub-form-list = config :form-data="state.step1Data"  />
  </div>
</template>