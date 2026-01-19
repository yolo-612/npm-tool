<script lang="ts" setup>
import { useSlots } from 'vue';
import TableSearchContent from './TableSearchContent.vue';
import type { IFormItem } from '@/src/form';
import AcspForm from '@/src/form/AcspForm.vue';
import { TableColumnType } from '@/src/table';

const props = defineProps<ISearchHeaderProps>();

const emits = defineEmits(['search', 'reset']);

defineOptions({
  name: 'TableSearchHeader',
  inheritAttrs: false,
});

export interface ISearchHeaderProps {
  searchItemList: IFormItem[];
}

const attrs = useAttrs();
/* 插槽 */
const slots:any = useSlots();
const tableSearchFormRef = ref();

/* 表单搜索配置 */
const formConfig = computed<any>(() => {
  return {
    subFormList: [
      {
        formItemList: [
          ...(props.searchItemList || []),
          {
            type: TableColumnType.Custom,
            colProps: attrs?.colProps || { span: 6 },
            customComponent: {
              component: TableSearchContent,
              props: {
                ...attrs,
                slots,
                onSearch: () => {
                  emits('search', searchData.value);
                },
                onReset: () => {
                  emits('reset', searchData.value);
                },
              },
            },
          },
        ],
      },
    ],
  };
});

const searchData = ref(attrs.modelValue || {});

/* 校验表单 */
const validateSearchData = async () => {
  await nextTick();
  const res = await tableSearchFormRef.value?.validate();
  return res;
};
/* 重置表单 */
const resetSearchData = () => {
  tableSearchFormRef.value?.resetFields();
};

defineExpose({
  validateSearchData,
  resetSearchData,
});
</script>

<template>
  <div v-show="!attrs.hidden">
    <!-- 表单区 -->
    <AcspForm ref="tableSearchFormRef" :formConfig="formConfig" :modelValue="searchData" />
  </div>
</template>
