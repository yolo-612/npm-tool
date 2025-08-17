<template>
  <div v-show="!attrs.hidden">
    <ConfigForm 
      ref="tableSearchFormRef"
      v-model="searchData"
      :formConfig="formConfig"  
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, nextTick } from 'vue'
import ConfigForm from '@/components/config-comp/form/ConfigForm.vue'
import TableSearchContent from '@/components/config-comp/table/components/search-header/TableSearchContent.vue';
import { FormItemType, type IFormConfig } from '@/components/config-comp/form/types'

defineOptions({
  name: 'TableSearchHeader',
  inheritAttrs: false,
});

const emits = defineEmits(['search', 'reset']);

const tableSearchFormRef = ref();
/** 获取外部传入的属性 */
const attrs = useAttrs();
/* 插槽【可以拿到外部传过来的插槽】*/
const slots:any = useSlots();

/** 表单数据 */ 
const searchData = ref(attrs.modelValue || {});
/** 表单配置 【添加 重置和搜索按钮】*/ 
const formConfig = computed<IFormConfig>(() => {
  return {
    subFormList: [
      {
        formItemList: [
          ...(attrs.searchItemList || []),
          {
            type: FormItemType.Custom,
            // 暂时没用上
            colProps: attrs?.colProps || { span: 6 },
            name: 'search-reset-button-group',
            label: "",
            customComponent: {
              component: TableSearchContent,
              props: {
                ...attrs,
                slots,
                onSearch: () => {
                  // 传了 searchData.value, 但是外面没用这个
                  emits('search', searchData.value);
                },
                onReset: () => {
                  // 传了 searchData.value, 但是外面没用这个
                  emits('reset', searchData.value);
                },
              }
            }
          }
        ],
      }
    ]
  }
})

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

<style lang='scss' scoped>
</style>
