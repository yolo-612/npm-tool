<route lang="json5">
{
  meta: {
    title: "导航1",
  }
}
</route>
<script setup lang="ts">
</script>

<template>
  <div>
    <PageMain :title="$route.meta.title">
    </PageMain>
  </div>
</template>
