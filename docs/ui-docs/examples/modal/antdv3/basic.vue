<template>
  <div>
    <a-button text @click="showModal">显示对话框</a-button>
    <a-modal
      v-model:visible="visible"
      title="客户信息"
      cancelText="取消"
      okText="确认"
      @ok="handleOk"
      @cancel="onCancel"
    >
      <p>我是一条信息（内部内容可自定义）</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { Modal } from 'ant-design-vue'

const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  visible.value = false;
};

const onCancel =  (e: MouseEvent) => {
  Modal.confirm({
    content: 'Are you sure to close this dialog?',
    onOk() {
      visible.value = false;
    }
  })
};
</script>
