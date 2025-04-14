<template>
  <el-dialog v-model="visible" :title="name" :width="width" center>
    <span>
      弹窗内容{{JSON.stringify(dialogShowData)}}
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
withDefaults(defineProps<{
  name?: string
  width?: number
}>(), {
  name: '多弹窗管理',
  width: 500,
})

const emit = defineEmits(['close'])

const visible = ref(false)
const dialogShowData = ref(null)

const show = ({ data } : any) => {
  visible.value = true
  dialogShowData.value = data
};

const close = ()=>{
  visible.value = false
  emit('close', { type: 'user', action: 'close' })
}

defineExpose({ show });
</script>
