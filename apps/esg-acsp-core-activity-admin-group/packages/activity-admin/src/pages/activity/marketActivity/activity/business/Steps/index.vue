<script setup lang="ts">
import { AcspForm } from '@fpkg/components-web';
import { E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';
import { ITemplateType } from '@/apis/methods/activity/business/types';
import useAction from './composables/useEditAction';
import useConfig from './composables/useEditConfig';
import ThemeTemplate from '../components/ThemeTemplate/index.vue';
import EditThemeTemplate from '../components/EditThemeTemplate/index.vue';

// 使用 withDefaults 定义 props 并设置默认值
const props = withDefaults(
  defineProps<{
    action?: E_PAGE_ACTION; // 可选属性
  }>(),
  {
    action: E_PAGE_ACTION.ADD, // 默认值
  },
);

/** 步骤 */
const step = ref(1);
const formRef = ref<InstanceType<typeof AcspForm>>();
const editTemplateInfoRef = ref<any>();
const state = useAction(formRef, editTemplateInfoRef, props.action, step);
const { formConfig } = useConfig(state, props.action);

</script>

<template>
  <div v-loading="state.loading.page">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <div class="business-container">
        <el-steps v-if="props.action !== E_PAGE_ACTION.DETAIL" :active="step" process-status="wait" align-center>
          <el-step title="活动规则配置" />
          <el-step title="活动页面配置" />
        </el-steps>
        <div v-else class="steps-detail">
          <div :class="['step', { active: step === 1 }]" @click="step = 1">第一步：活动规则设置</div>
          <div :class="['step', { active: step === 2 }]" @click="step = 2">第二部：活动页面设置</div>
        </div>
        <template v-if="step === 1">
          <AcspForm ref="formRef" v2 :model-value="state.formData" label-width="auto" :form-config="formConfig" />
          <div class="btns-options">
            <el-button v-if="props.action !== E_PAGE_ACTION.DETAIL" @click="state.cancelSave">取消</el-button>
            <el-button
              v-if="props.action === E_PAGE_ACTION.ADD || props.action === E_PAGE_ACTION.COPY"
              @click="state.draftSave"
            >保存草稿</el-button>
            <el-button
              v-if="props.action !== E_PAGE_ACTION.DETAIL"
              type="primary"
              @click="state.nextStep">下一步</el-button>
          </div>
        </template>
        <template v-else-if="step === 2">
          <div class="chooseTheme">
            <p>选择主题样式</p>
            <el-tabs v-model="state.theme.value">
              <el-tab-pane label="官方主题" :name="ITemplateType.SYSTEM">
                <ThemeTemplate
                  :action="props.action"
                  :template-code="state.activityTemplate.templateCode"
                  :theme-type="ITemplateType.SYSTEM"
                  :themes="state.systemThemes"
                  @handlePageChange="state.handlePageChange"
                  @handleThemeChange="state.handleThemeChange"
                  @handleEditTemplateInfo="state.handleEditTemplateInfo"
                />
              </el-tab-pane>
              <el-tab-pane label="个人主题" :name="ITemplateType.PERSONAL">
                <ThemeTemplate
                  :action="props.action"
                  :template-code="state.activityTemplate.templateCode"
                  :theme-type="ITemplateType.PERSONAL"
                  :themes="state.personalThemes"
                  @handlePageChange="state.handlePageChange"
                  @handleThemeChange="state.handleThemeChange"
                  @handleEditTemplateInfo="state.handleEditTemplateInfo"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="btns-options">
            <el-button v-if="props.action !== E_PAGE_ACTION.DETAIL" @click="step--">上一步</el-button>
            <el-button
              v-if="props.action === E_PAGE_ACTION.ADD || props.action === E_PAGE_ACTION.COPY"
              @click="state.draftSave"
            >保存草稿</el-button>
            <el-button
              v-if="props.action !== E_PAGE_ACTION.DETAIL"
              type="primary"
              @click="state.submitForm"
            >确认</el-button>
          </div>
          <!-- 编辑个人主题 -->
          <EditThemeTemplate
            ref="editTemplateInfoRef"
            :collections="state.restField.collectionList?.filter((item) => item.isSelected)?.map(item => item.fillInKey)"
            @handlePageStatus="state.handleChangePageStatus"
            @handleSaveTemplateInfo="state.handleSaveTemplateInfo"
          />
        </template>
      </div>
    </PageMain>
  </div>
</template>

<style lang='scss' scoped>
.business-container {
  width: 100%;
  height: 100%;
  min-height: 780px;
  position: relative;
  .steps-detail {
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    .step {
      width: 200px;
      height: 50px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        color: var(--sdesign-color-brand-7);
        border-bottom: 2px solid var(--sdesign-color-brand-7);
      }
    }
  }
  :deep(.options .el-checkbox) {
    display: block;
  }
  :deep(.form-item-type) {
    height: 100%;
    .sasp-form-label {
      display: flex;
      justify-content: center;
    }
  }
  :deep(.el-form-item) {
    align-items: flex-start!important;
  }
  .btns-options {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .chooseTheme {
    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
