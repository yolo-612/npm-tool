<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE;

const leftMenuWidth = inject<string>('leftMenuWidth');
</script>

<template>
  <div class="LogoItem" :style="{minWidth:leftMenuWidth}" @click="$router.push('/')">
    <img class='logo' src='@/assets/images/logo.png' alt="logo"/>
    <span class="logo-title">{{ title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.LogoItem {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 10px;
  box-sizing: border-box;

  .logo {
    position: relative;
    width: 26px;
    height: 26px;
    margin-right: 8px;
    object-fit: contain;
  }

  .logo-title {
    font-size: 18px;
    font-weight: var(--sdesign-font-weight-medium);
  }
}
</style>
