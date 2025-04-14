<route lang="json5">
{
  name: "multiDialogManSolution",
  meta: {
    title: "解决方案",
    permission: ["*"],
    icon: 'Opportunity',
  }
}
</route>
<template>
  <PageMain title='实现目标'>
    <p class="background-desc">
      所以需要定制一套弹窗管理方案：<br/>
      体验上： <br/>
      &nbsp &nbsp 优先级高的弹窗先展示，关闭后再展示优先级次之的弹窗，依次进行的效果 <br/>
      功能上： <br/>
      &nbsp &nbsp 有一套多弹窗管理方案，能够统一管理所有弹窗，包括优先级、业务定制化展示规则等 <br/>
      愿景： <br/>
      &nbsp &nbsp 简单通用的弹窗基于配置就可以直接生成，【配置其层级，配置其title以及内容等，可以控制展示频率【每周一次】、跟其他类型的弹窗的排他规则等等】 <br/>
      &nbsp &nbsp 复杂的弹窗 支持 自定义弹窗组件 快速 接入此多弹窗管理流程 
    </p>
  </PageMain>

  <PageMain title='具体思路'>
    <p class="background-desc blue">
      - vue组件模板：只负责显示弹窗UI  <br/>
      - DialogTask：封装了弹窗通用流程的逻辑 <br/>
      &nbsp &nbsp - type：弹窗类型 <br/>
      &nbsp &nbsp - level：弹窗层级 <br/>
      &nbsp &nbsp - asyncDataPromise：获取弹窗数据 <br/>
      &nbsp &nbsp - showDialogPromise：显示弹窗 <br/>
      - DialogManager：控制弹窗显示，统一挂载到body <br/>
      - 通过promise的链式调用实现按顺序显示弹窗 <br/>
    </p>
  </PageMain>

  <PageMain title='实现效果'>
    <el-button type="primary" @click="handleOpenAsyncMul">演示效果</el-button>
  </PageMain>
</template>

<script setup>
import DialogManage from './solutions/DialogManage'

const handleOpenAsyncMul = ()=>{
  DialogManage.startTask()
}
</script>

<style lang='scss' scoped>
.background-desc{
  background-color: #ffd6dc;
  padding: 10px;
  border-radius: 4px;
  line-height: 22px;
  &.blue{
    background-color: #c5f7d8;
  }
}
</style>
