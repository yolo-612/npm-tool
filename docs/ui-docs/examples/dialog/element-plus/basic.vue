<template>
  <el-button text @click="dialogVisible = true"> 显示对话框 </el-button>
  <el-dialog
    v-model="dialogVisible"
    title="客户信息"
    width="420"
    :before-close="handleClose"
  >
    <span>我是一条信息（内部内容可自定义）</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from '@yolo/element-plus';

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
