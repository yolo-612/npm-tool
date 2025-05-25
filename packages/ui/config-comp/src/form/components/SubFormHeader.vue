<script lang="ts" setup>
import type { IFormHeader } from '../types';
import IntroButton from '@/src/button';
import SvgIcon from '@/src/svg-icon';

interface ISubFormHeaderProps {
  /** 表头数据 */
  headerData?: IFormHeader;
  /** 是否展开 */
  isActive: boolean;
}
const props = defineProps<ISubFormHeaderProps>();
const emit = defineEmits<(e: 'headerClick') => void>();
defineOptions({
  name: 'SubFormHeader',
});
/**
 * 表头点击事件
 */
const onHeaderClick = () => {
  emit('headerClick');
};
</script>

<template>
  <div v-if="headerData?.foldEnable" class="sub-form-header sub-form-header-edit">
    <span class="sub-form-header-title-wrap" @click="onHeaderClick">
      <SvgIcon
        icon-name="form_header_expand"
        color="#fff"
        :class="['form-header-arrow-expand', { 'is-inactive': !isActive }]" />
      <span class="sub-form-header-title">
        {{ headerData?.title }}
      </span>
      <span v-if="headerData?.subTitle" class="sub-form-header-sub-title">
        {{ headerData.subTitle }}
      </span>
      <IntroButton v-if="headerData?.intro" type="tooltip" :size="14" :content="headerData?.intro" />
    </span>

    <div class="sub-form-header-line"></div>
  </div>
  <div v-else class="sub-form-header sub-form-header-detail">
    <span class="sub-form-header-vertical-line"></span>
    <span class="sub-form-header-title">
      {{ headerData?.title }}
    </span>
    <span v-if="headerData?.subTitle" class="sub-form-header-sub-title">
      {{ headerData.subTitle }}
    </span>
    <IntroButton v-if="headerData?.intro" type="tooltip" :size="14" :content="headerData?.intro" />
  </div>
</template>
<style lang="scss" scoped>
.sub-form-header {
  display: flex;
  font-weight: bold;
  margin: 15px 0 10px 0;

  .sub-form-header-title-wrap {
    cursor: pointer;
    display: flex;
    align-items: center;
    .sub-form-header-title {
      margin-right: 10px;
      font-size: 16px;
      color: #141222;
    }
    .sub-form-header-sub-title {
      color: rgba(51, 51, 51, 0.6);
      font-size: 14px;
      margin-right: 10px;
    }
    .arrow-top {
      transition: transform 0.3s linear;
      font-size: 16px;
      color: #8894c8;
    }

    .is-inactive {
      transform: rotate(180deg);
    }
  }
  .form-header-arrow-expand {
    margin-right: 4px;
  }

  .sub-form-header-line {
    flex: 1;
    background: url('../../../assets/images/form_header_line.png');
    height: 15px;
  }
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
