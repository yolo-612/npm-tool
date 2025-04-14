<template>
  <el-dialog v-model="visible" title="标题" center>
    <span>
      汤川内容
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
const emit = defineEmits(['close'])

const visible = ref(false)

const show = ({ data } : any) => {
  visible.value = true
};

const close = ()=>{
  visible.value = false
  emit('close', { type: 'user', action: 'close' })
}

defineExpose({ show });
</script>
