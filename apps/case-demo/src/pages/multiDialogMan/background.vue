<route lang="json5">
{
  name: "multiDialogManBackground",
  meta: {
    title: "背景",
    permission: ["*"],
    icon: 'Opportunity',
  }
}
</route>
<template>
  <PageMain title='多弹窗管理背景'>
    <p class="background-desc">
      项目内部首页会展示触发多弹窗逻辑，
      由于已上线弹窗数量较多，且业务不断堆积，不同的弹窗显示隐藏分治，
      会存在用户进来同时展示多个弹窗，弹窗互相叠盖的现象，
      用户只能关闭上层弹窗在依次点击下方的弹窗，用户交互体验差。
      并且随着需求不断迭代，不易维护，定制化弹窗展示顺序的需求不易开展管理。
    </p>
  </PageMain>
  <PageMain title='多弹窗互相覆盖现象'>
    <el-button type="primary" @click="handleOpenMul">打开多弹窗</el-button>
  </PageMain>

  <PageMain title='多弹窗异步控制'>
    <el-button type="primary" @click="handleOpenAsyncMul">有序打开弹窗</el-button>
  </PageMain>
  <DialogComp ref="DialogComp1Ref" :width="500" :name="'弹窗1'"/>
  <DialogComp ref="DialogComp2Ref" :width="300" :name="'弹窗2'"/>
  <DialogAsyncComp ref="DialogAsyncComp1Ref" :width="500" :name="'异步改造弹窗1'"/>
  <DialogAsyncComp ref="DialogAsyncComp2Ref" :width="300" :name="'异步改造弹窗2'"/>
</template>

<script setup>
import DialogComp from './components/DialogComp.vue';
import DialogAsyncComp from './components/DialogAsyncComp.vue';


const DialogComp1Ref = ref('')
const DialogComp2Ref = ref('')

const DialogAsyncComp1Ref = ref('')
const DialogAsyncComp2Ref = ref('')


const handleOpenMul = ()=>{
  DialogComp1Ref.value?.open()
  DialogComp2Ref.value?.open()
}

// 通过promise链条控制
const handleOpenAsyncMul = ()=>{
  DialogAsyncComp1Ref.value?.open().then(()=>{
    DialogAsyncComp2Ref.value?.open()
  })
}
</script>

<style lang='scss' scoped>
.background-desc{
  background-color: #ffd6dc;
  padding: 10px;
  border-radius: 4px;
  line-height: 22px;
}
</style>
