<script setup lang="ts">
import { AcspConfigProvider } from '@fpkg/components-web';
</script>

<template>
  <AcspConfigProvider>
    <router-view></router-view>
  </AcspConfigProvider>
</template>

<style scoped></style>
