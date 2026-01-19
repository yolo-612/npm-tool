<script lang="ts" setup>
import { recompute } from '@/utils';
import type { IFormConfig, ISubForm } from '../index';
import SubFormItem from './SubFormItem.vue';

interface ISubFormRowProps {
  /** 表单配置 */
  formConfig: IFormConfig;
  /** 子表 */
  subForm: ISubForm;
  /** 表单数据 */
  formData: Record<string, any>;
}

const props = defineProps<ISubFormRowProps>();

defineOptions({
  name: 'SubFormBody',
});
</script>

<template>
  <div class="sub-form-body">
    <el-row
      :gutter="22"
      v-bind="{
        ...formConfig.rowProps,
        ...subForm.rowProps,
      }">
      <!-- 子表单表单展示 -->
      <template v-for="(item, subIndex) in subForm.formItemList" :key="item.name + '_' + subIndex">
        <el-col
          v-if="!recompute(item.hidden)"
          :span="8"
          v-bind="{
            ...formConfig.colProps,
            ...subForm.colProps,
            ...item.colProps,
          }">
          <SubFormItem :form-data="formData" v-bind="item" :disabled="formConfig.type === 'detail'" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
// 高度
$itemHeight: 32px;
// item 默认宽度
$itemWidth: 300px;

.sub-form-body {
  .el-row {
    padding-top: 15px;
    .el-col {
      margin-bottom: 20px;
      :deep(.el-form-item) {
        margin-bottom: 0;
        align-items: center;
        color: black;

        .el-form-item__label {
          padding-bottom: 0;
          margin-bottom: 0;
          line-height: 25px;
          margin-right: 10px;
          color: #141222;
          align-items: center;
          font-size: 14px;
          .svg-icon {
            position: relative;
            top: -1px;
          }
        }

        .el-form-item__content {
          & > div {
            width: 100%;
          }
          line-height: $itemHeight;
        }
        .el-form-item__error {
          padding-top: 3px;
          color: var(--el-color-danger);
          font-size: 12px;
          line-height: 1;
          top: 100%;
          left: 0px;
        }

        &.is-required {
          :deep(.el-form-item__label) {
            &::before {
              display: none;
            }
            &::after {
              content: '*';
              color: #e0252b;
              margin-left: 4px;
            }
          }
        }
      }
    }
    &.table-type {
      border-top: 1px solid #d5dbee;
      // border-bottom: 1px solid #d5dbee;
      border-right: 1px solid #d5dbee;
      background-color: #fff;
      padding-top: 0 !important;
      .el-col {
        border-left: 1px solid #d5dbee;
        border-bottom: 1px solid #d5dbee;
        margin-bottom: 0;
        padding: 0 !important;
        :deep(.el-form-item) {
          display: flex;
          min-height: 44px;
          height: 100%;
          .el-form-item__label {
            background-color: #eff3fb;
            border-right: 1px solid #d5dbee;
            height: 100%;
            vertical-align: middle;
            width: 160px;
            padding: 0 14px;
            color: #585d75 !important;
            margin: 0;
            align-items: center;
            border-radius: 0;
            overflow: hidden;
            display: inline-flex !important;
            align-items: center;
          }
          .el-form-item__content {
            padding: 0 24px;
            flex: 1;
            width: 0;
          }
        }
      }
    }
  }
}

.detail {
  .el-row {
    margin: 0 !important;
    background-color: #fcfcfd;
    :deep(.el-form-item__label) {
      color: #9f9ea6 !important;
      border-radius: 4px;
    }
  }
}
</style>
