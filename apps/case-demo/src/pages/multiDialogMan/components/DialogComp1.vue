
<template>
  <el-dialog v-model="visible" title="弹窗1" width="500" center>
    <span>
      弹窗1内容
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const open = () => {
  visible.value = true;
};

defineExpose({ open });
</script>
