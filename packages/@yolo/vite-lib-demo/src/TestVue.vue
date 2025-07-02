<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(1)
const getObj = (key: string) : string => {
  let obj : Record<string, string>= {
    a: 'test',
    b: 'testb'
  }
  return obj[key]
}

const handleClick = ()=>{
  count.value = count.value + 2
}
</script>

<template>
  <div class="test-box">
    vite- lib - demo ( count：{{ getObj('a') }} {{ count }} ) 
    <button @click="handleClick">+</button>
  </div>
</template>

<style>
.test-box{
  color: red
}
</style>
