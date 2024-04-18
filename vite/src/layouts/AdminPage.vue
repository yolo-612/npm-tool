<script setup>
// 带侧边栏的页面
import { RouterView } from 'vue-router'
</script>

<template>
  <div class='AdminPage'>
    <aside class='aside'>

    </aside>
    <main class='main'>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.AdminPage{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.AdminPage .aside{
  background-color: #0a7c7c;
  width: 180px;
}
.AdminPage .main{
  flex-grow: 1;
}
</style>
