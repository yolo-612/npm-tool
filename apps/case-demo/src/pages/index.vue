<route lang="json5">
{
  name: 'index',
  meta: {
      layout: false,
      hideInMenu: true
  }
}
</route>
<script setup lang="ts">
const router = useRouter();
router.replace('/dashboard/workplace');
</script>

<template>
<div></div>
</template>
