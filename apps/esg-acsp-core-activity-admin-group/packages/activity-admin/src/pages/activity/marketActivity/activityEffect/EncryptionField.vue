<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { postBusinessDetailWhite } from '@/apis/methods/activity/business';

const props = defineProps({
  id: {
    type: Number,
  },
  type: {
    type: String,
    default: 'phone',
  },
  hide: {
    type: String,
    default: '',
  },
});

const show = ref('');

/** 获取客户信息 */
const handleChangeRow = async () => {
  try {
    const { obj } = await postBusinessDetailWhite({
      id: props.id!,
    });
    show.value = props.type === 'phone' ? obj.customerPhone : obj.companyAddr;
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};

/** 截取公司地址显示，并加密 */
const encryption = computed(() => {
  if (props.type === 'phone') return props.hide;
  if (props.hide) {
    const prefix = props.hide.slice(0, 5); // 截取前 5 个字符
    return prefix + '******';
  }
  return props.hide;
});

</script>

<template>
  <div v-if="show" class="flex"><span>{{ show }}</span></div>
  <div v-else class="flex"><span>{{ encryption || '-' }}</span><el-icon v-if="encryption" @click="handleChangeRow"><View /></el-icon></div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
  }
  :deep(.el-icon) {
    cursor: pointer;
  }
}
</style>
