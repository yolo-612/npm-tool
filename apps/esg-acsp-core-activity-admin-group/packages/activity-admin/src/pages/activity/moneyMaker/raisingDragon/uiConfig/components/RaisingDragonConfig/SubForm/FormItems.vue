<script setup lang="ts">
import type { ISubFormItem, IFormType } from '../../../composables/types';
import { E_FORM_ITEM_TYPE } from '../../../composables/enums';
import FileUpload from '../../FileUpload/index.vue';
import InputColor from '../../InputColor/index.vue';
import RichText from '../../RichText/index.vue';
import RenderCom from './Render/index.vue';

/** props */
const props = defineProps({
  /** component */
  component: {
    type: String,
    default: '',
  },
  /** 子表单 */
  items: {
    type: Array as PropType<ISubFormItem[]>,
    default: () => [],
  },
  /** form */
  form: {
    type: Object as PropType<IFormType>,
    default: () => ({}),
  },
});

/** emits */
const emits = defineEmits(['uploadSuccess', 'removeImg']);

/**
 * 上传成功回调
 * @param name form的props
 * @param value form item 的值
 */
const handleUploadSuccess = (name: string, value: string) => {
  emits('uploadSuccess', name, value);
};

/**
 * 移除form item
 * @param name form的props
 */
const handleRemoveImg = (name: string) => {
  emits('removeImg', name);
};

/**
 * 获取form对象的值
 * @param prop form的props
 */
const getProp = (prop: string) => {
  const [property1, property2] = prop.split('.');
  // @ts-ignore
  if (props.form.hasOwnProperty(property1) && props.form[property1].hasOwnProperty(property2)) return props.form[property1][property2];
  return '';
};

/**
 * 获取提示文案
 * @param item 子表单项
 */
const getTips = (item: ISubFormItem) => {
  const {
    accept, size, width, height,
  } = item?.fieldProps || {};
  let tips = `请上传 ${accept ? accept.replace(/image\/|video\//g, '') : 'jpeg、jpg、png'} 格式`;
  tips += `${width ? '，尺寸：宽为' + width : ''}`;
  tips += `${height ? ' X ' + height : ''}`;
  if (size) tips += `，大小不能超过${size < 1 ? size * 1000 + 'KB' : size + 'M'}`;
  return tips;
};
</script>

<template>
  <div class="sub-form-body">
    <div class="sub-form-body-items">
      <template
        v-for="item in items"
        :key="item.prop"
      >
        <el-form-item
          v-if="!item.hidden"
          :label="item.label"
          :prop="item.prop"
        >
          <FileUpload
            v-if="item.type === E_FORM_ITEM_TYPE.UPLOAD"
            :name="item.prop"
            :url="getProp(item.prop)"
            :tip="getTips(item)"
            :isImage="item.isImage"
            :fieldProps="item.fieldProps"
            action="/activity-web-backend/im-activity/web/activity/upload"
            listType="picture-card"
            @uploadSuccess="handleUploadSuccess"
            @removeImg="handleRemoveImg"
          />
          <InputColor
            v-else-if="item.type === E_FORM_ITEM_TYPE.INPUT_COLOR"
            v-bind="item"
            :name="item.prop"
            :value="getProp(item.prop)"
            :fieldProps="item.fieldProps"
            @uploadSuccess="handleUploadSuccess"
          />
          <RichText
            v-else-if="item.type === E_FORM_ITEM_TYPE.RICHTEXT"
            v-bind="item"
            :name="item.prop"
            :value="getProp(item.prop)"
            :fieldProps="item.fieldProps"
            @uploadSuccess="handleUploadSuccess"
          />
          <el-input
            v-else-if="item.type === E_FORM_ITEM_TYPE.INPUT"
            :model-value="getProp(item.prop)"
            v-bind="item.fieldProps"
            @input="(val: string) => {
              handleUploadSuccess(item.prop, val)
            }"
          />
        </el-form-item>
      </template>
    </div>
    <RenderCom :name="component" :prop="form" />
  </div>
</template>

<style lang="scss" scoped>
.sub-form-body {
  width: 100%;
  display: flex;
  .sub-form-body-items {
    margin-right: 50px;
  }
}
</style>
