<template>
  <span>slot-demo{{ testName }}</span>
</template>

<script setup>
const props = defineProps({
  testName: {
    type: String,
  }
})
</script>

<style lang='scss' scoped>
</style>
