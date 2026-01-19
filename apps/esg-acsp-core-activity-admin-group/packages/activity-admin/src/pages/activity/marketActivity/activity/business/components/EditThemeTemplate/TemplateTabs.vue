<script setup lang="ts">
import { E_TABLIST } from './types';

defineProps({
  activeTabs: {
    type: String,
    default: E_TABLIST.HOME,
  },
});

const emits = defineEmits(['changeTabs']);

</script>

<template>
  <div class="template-tabs">
    <div class="tabs tab-title">页面列表</div>
    <div
      :class="['tabs tab-home', { active: activeTabs === E_TABLIST.HOME }]"
      @click="emits('changeTabs', E_TABLIST.HOME)"
    >活动首页</div>
    <div
      :class="['tabs tab-rule', { active: activeTabs === E_TABLIST.RULE }]"
      @click="emits('changeTabs', E_TABLIST.RULE)"
    >活动规则</div>
    <div
      :class="['tabs tab-agreement', { active: activeTabs === E_TABLIST.AGREEMENT }]"
      @click="emits('changeTabs', E_TABLIST.AGREEMENT)"
    >个人信息保护协议</div>
  </div>
</template>

<style lang="scss" scoped>
.template-tabs {
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tabs {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    &.tab-title {
      font-weight: bold;
      cursor: inherit;
    }
  }
  .tabs.active {
    background: #f5f5f5;
    color: #ce1d22;
  }
}
</style>
