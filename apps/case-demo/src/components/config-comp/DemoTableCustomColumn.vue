<template>
  <div>
    table Column Custom
    <div>{{ scope.name || defaultName }}</div> 
    {{ scope.row.address }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  scope: {
    type: Object,
    default: () => ({})
  },
  defaultName: {
    type: String,
    required: true,
  }
})
</script>

<style lang='scss' scoped>
</style>
