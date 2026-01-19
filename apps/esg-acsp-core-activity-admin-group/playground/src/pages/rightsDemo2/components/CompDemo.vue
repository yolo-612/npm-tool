<script lang='ts' setup >
const props = defineProps({
  // 测试参数
  message: {
    type: String,
    default: '测试参数'
  }
})

const emits = defineEmits(['testClick'])

</script>

<template>
    <div>
        <span>参数：{{ props.message }}</span> <el-button @click="emits('testClick')">测试按钮</el-button>
    </div>
</template>

<style lang='less' scoped>

</style>