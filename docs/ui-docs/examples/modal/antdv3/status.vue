<template>
  <div>
    <a-button text @click="showModal('success')">点击打开MessageBox(成功)</a-button>
    <a-button text @click="showModal('warning')">点击打开MessageBox(告警)</a-button>
    <a-button text @click="showModal('error')">点击打开MessageBox(失败)</a-button>
  </div>
</template>
<script lang="ts" setup>
import { Modal } from 'ant-design-vue'

const types = {
    success: {
        title: '成功',
        content: '这里是成功的原因，请稍后重新尝试。',
    },
    warning: {
        title: '告警',
        content: '这里是告警的原因，请稍后重新尝试。',
    },
    error: {
        title: '失败',
        content: '这里是失败的原因，请稍后重新尝试。',
    },
}

const showModal = (methodType: Any) => {
  Modal[methodType]({
    ...types[methodType],
    closable: true,
    okText: '一级按钮'
  })
};
</script>
