<script setup>
  const props = defineProps({
    title:{
      type:String,
      default:'标题',
    },
    path:{
      type:String,
      default:'',
    },
    icon:{
      type:String,
      default:'',
    },
    children:{
      type:Array,
      default:[],
    }
  })
</script>

<template>
  <el-sub-menu v-if='children && children.length' :index='path'>
    <template #title>
      <el-icon v-if='icon'><component :is='icon'/></el-icon>
      <span>{{ title }}</span>
    </template>

    <template v-if='children && children.length>0'>
      <SidebarMenuItem v-for='(item) in children' v-bind='item'/>
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index='path'>
    <el-icon v-if='icon'><component :is='icon'/></el-icon>
    <span>{{ title }}</span>
  </el-menu-item>
</template>

<style>

</style>
