<template>
  <el-dialog v-model="visible" :title="name" :width="width" center>
    <span>
      {{name}}内容
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const visible = ref(false)
const resolveVal = ref()

withDefaults(defineProps<{
  name?: string
  width?: number
}>(), {
  name: '异步改造弹窗',
  width: 500,
})

const open = () => {
  visible.value = true;
  return new Promise((resolve)=>{
    resolveVal.value = resolve
  })
};

const close = ()=>{
  visible.value = false
  resolveVal.value(true)
}

defineExpose({ open });
</script>
