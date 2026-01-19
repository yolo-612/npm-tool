<script setup lang="ts">

interface IPropImgUpload {
  /** 绑定字段名 */
  name: string;
  /** 颜色 */
  value?: string;
  /** input 属性 */
  fieldProps?: any;
}

const props = defineProps<IPropImgUpload>();

/** emits */
const emits = defineEmits(['uploadSuccess']);

/** 颜色值 */
const inputVal = ref(props.value);

/** 更新颜色值 */
watch(() => inputVal.value, (val) => {
  emits('uploadSuccess', props.name, val);
});

watch(() => props.value, (val) => {
  inputVal.value = val;
});
</script>

<template>
  <div class="input-color-container">
    <el-color-picker v-model.trim="inputVal" size="large" v-bind="fieldProps" />
    <el-input v-model.trim="inputVal" style="margin-left: 10px" v-bind="fieldProps" />
  </div>
</template>

<style lang="scss" scoped>
.input-color-container {
  width: 550px;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
