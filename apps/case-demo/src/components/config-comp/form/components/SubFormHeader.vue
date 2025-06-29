<script lang="ts" setup>
import type { IFormHeader } from '@/components/config-comp/form/types'

interface ISubFormHeaderProps {
  /** 表头数据 */
  headerData?: IFormHeader;
}
const props = defineProps<ISubFormHeaderProps>();
defineOptions({
  name: 'SubFormHeader',
});
</script>

<template>
  <div class="sub-form-header sub-form-header-detail">
    <span class="sub-form-header-vertical-line"></span>
    <span class="sub-form-header-title">
      {{ headerData?.title }}
    </span>
    <span v-if="headerData?.subTitle" class="sub-form-header-sub-title">
      {{ headerData.subTitle }}
    </span>
    <!-- <AcspIntroButton v-if="headerData?.intro" type="tooltip" :size="14" :content="headerData?.intro" /> -->
  </div>
</template>
<style lang="scss" scoped>
.sub-form-header {
  display: flex;
  font-weight: bold;
  margin: 15px 0 10px 0;
}
.sub-form-header-detail {
  cursor: unset;
  display: flex;
  align-items: center;
  .sub-form-header-vertical-line {
    display: inline-block;
    height: 16px;
    width: 6px;
    background-color: var(--el-color-primary);
    border-radius: 1px;
  }
  .sub-form-header-title {
    padding-left: 8px;
    margin-right: 10px;
  }
  .sub-form-header-sub-title {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
    margin-right: 10px;
  }
}
</style>
