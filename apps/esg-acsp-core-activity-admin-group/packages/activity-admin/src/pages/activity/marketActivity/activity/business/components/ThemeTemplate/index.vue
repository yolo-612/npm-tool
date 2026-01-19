<script setup lang="ts">
import { ITemplateRecommendType } from '@/apis/methods/activity/business/types';
import type { ITemplateInfo, ITemplateType } from '@/apis/methods/activity/business/types';
import { E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';

defineProps<{
  /** 操作类型 */
  action: E_PAGE_ACTION;
  /** 选中模板信息 */
  templateCode: string;
  /** 主题类型 */
  themeType: ITemplateType;
  /** 主题信息 */
  themes: {
    pageNum: number;
    pageSizes: number;
    totalSize: number;
    list: ITemplateInfo[];
  }
}>();

const emits = defineEmits(['handlePageChange', 'handleThemeChange', 'handleEditTemplateInfo']);

</script>

<template>
  <div class="template-list">
    <div
      v-for="item in themes.list"
      :key="item.templateCode"
      class="template">
      <div class="template-title">
        <span v-if="item.isRecommend === ITemplateRecommendType.RECOMMEND" class="template-recommend">推荐</span>
        <span>{{ item.templateName }}</span>
      </div>
      <div :class="[
        'template-theme',
        { 'template-choose': templateCode === item.templateCode }
      ]">
        <img
          :src="item.titleImage"
          :alt="item.templateName"
          />
        <div v-if="action !== E_PAGE_ACTION.DETAIL" class="template-theme-edit" @click="emits('handleThemeChange', item.templateCode)">
          <el-button type="primary" @click.stop="emits('handleEditTemplateInfo', item.templateCode)">编辑</el-button>
        </div>
        <div v-else class="template-theme-edit">
          <el-button type="primary" @click.stop="emits('handleEditTemplateInfo', item.templateCode)">查看</el-button>
        </div>
        <el-icon v-if="templateCode === item.templateCode" class="template-choose-icon" color="#ffffff"><Select /></el-icon>
      </div>
    </div>
  </div>
  <!-- <el-pagination
    :current-page="themes.pageNum"
    :page-size="themes.pageSizes"
    :total="themes.totalSize"
    layout="prev, pager, next"
    @current-change="(val: number) => emits('handlePageChange', themeType, val)"
  /> -->
</template>

<style lang='scss' scoped>
.template-list {
  display: flex;
  flex-wrap: wrap;
  .template {
    width: 200px;
    margin: 10px 20px;
    .template-title {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      .template-recommend {
        display: inline-block;
        margin-right: 2px;
        padding: 1px 2px;
        color: #dd1212;
        border: #dd1212 1px solid;
        border-radius: 5px;
        font-size: 12px;
      }
    }
    .template-theme {
      width: inherit;
      height: 380px;
      position: relative;
      img {
        width: inherit;
        height: 380px;
        border-radius: 10px;
      }
      .template-theme-edit {
        width: inherit;
        height: inherit;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0; // 悬停时显示
      }
      .template-theme-edit:hover {
        opacity: 1; // 悬停时显示
      }
    }
    .template-choose {
      position: relative;
      outline: 3px solid #b71a1e;
      border-radius: 10px;
      .template-choose-icon {
        width: 25px;
        height: 25px;
        background-color: #b71a1e;
        border-radius: 0 10px 0 10px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
