<template>
  <div>
    table Column Custom
    <div>{{ scope.name || 'yolo' }}</div> 
    {{ scope.row.address }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  scope: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang='scss' scoped>
</style>
