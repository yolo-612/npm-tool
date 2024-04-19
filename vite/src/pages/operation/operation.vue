<template>
 <main class="operate-content">
  <div class="search-column">
    <el-input
      v-model="input2"
      class="w-50 m-2"
      placeholder="Please Input"
      suffix-icon="SfSettings"
    />
  </div>
 </main>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
} from 'vue';

const input2 = ref()
</script>

<style scoped>
.operate-content {

}
</style>
