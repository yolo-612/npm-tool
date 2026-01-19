<script setup lang="ts">
const router = useRouter();
definePage({
  name: 'reload',
  meta: {
    title: '重新加载',
    layout: false,
    hideInMenu: true,
  },
});

onMounted(() => {
  router.go(-1);
});
</script>

<template>
  <div></div>
</template>
