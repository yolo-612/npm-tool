<route lang="json5">
{
  meta: {
    layout:'default',
    title: "关于",
    icon: "HelpFilled",
    permission: ["*"],
    order:0
  }
}
</route>

<script setup lang="ts">
const { pkg, buildTime } = __APP_INFO__;

const dependencies = reactive(pkg.dependencies);
const devDependencies = reactive(pkg.devDependencies);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title">
      <template #content> 这是一款开箱即用的中后台框架，简单好用，就够了。 </template>
    </PageHeader>

    <PageMain title="项目信息">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="名称">{{ pkg.name }}</el-descriptions-item>
        <el-descriptions-item label="版本">{{ pkg.version }}</el-descriptions-item>
        <el-descriptions-item label="编译时间">{{ buildTime }}</el-descriptions-item>
      </el-descriptions>
    </PageMain>

    <PageMain title="生产环境依赖">
      <el-descriptions :column="3" border>
        <el-descriptions-item v-for="(value, key) in dependencies" :key="key" :label="key">{{
            value
          }}</el-descriptions-item>
      </el-descriptions>
    </PageMain>

    <PageMain title="开发环境依赖">
      <el-descriptions :column="3" border>
        <el-descriptions-item v-for="(value, key) in devDependencies" :key="key" :label="key">{{
            value
          }}</el-descriptions-item>
      </el-descriptions>
    </PageMain>
  </div>
</template>
