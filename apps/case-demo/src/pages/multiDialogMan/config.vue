<route lang="json5">
{
  name: "multiDialogManConfig",
  meta: {
    title: "弹窗项配置",
    permission: ["*"],
    icon: 'Opportunity',
  }
}
</route>
<template>
  <PageMain title='弹窗项配置'>
    <p class="background-desc blue">
      初步可以把数据通过pinia持久化管理，后续迁移到配置平台上
    </p>
    <el-form :inline="true" :model="dialogConfigForm" class="demo-form-inline">
      <el-form-item label="弹窗名">
        <el-input v-model="dialogConfigForm.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </PageMain>
</template>

<script setup>
// TODO： 如何配置函数 asyncData、以及vue组件
// 这种参数是不是不好配置上平台，只能通过key通过编码的方式写进去
const dialogConfigForm = reactive({
  key: 'Case1Dialog',
  name: '案例1弹窗',
  type: 'OPERATION', // 弹窗类型
  level: 10, // 层级
  compOptions: DialogComp, 
  compProps: {
    name: '案例1弹窗',
    width: 1000
  },
  asyncData: () => {
    return Promise.resolve().then(() => {
      return {
        showDialog: true, // 是否显示弹窗
        data: { obj: ['dialog', 'yolo'] }, // 业务数据
      }
    })
  }
})

const onSubmit = () => {
  console.log('submit!')
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
  