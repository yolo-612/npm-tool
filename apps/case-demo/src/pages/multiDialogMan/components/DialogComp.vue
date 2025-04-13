
<template>
  <el-dialog v-model="visible" :title="name" :width="width" center>
    <span>
      {{name}}内容
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
const props = defineProps({
  name: {
    type: String,
    default: '弹窗',
  },
  width: {
    type: Number,
    default: 500,
  },
});

const visible = ref(false)

const open = () => {
  visible.value = true;
};

defineExpose({ open });
</script>
