<script setup lang="ts">
import {
  ElMessage,
  ElMessageBox,
  type FormInstance,
} from 'element-plus';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';
import { queryDragonDetail, saveDragonInfo } from '@/apis/methods/activity/moneyMaker';
import type { IRaisingDragonConfigType } from '@/apis/methods/activity/moneyMaker/types';
import SubForm from './SubForm/index.vue';
import type { IFormType, ISubFormType } from '../../modules';
import { getFromData, templateStyleConfig } from '../../modules';
import { E_FORM_ITEM_TYPE } from '../../composables/enums';
import type { E_RAISING_DRAGON_TYPE } from '../../../modules/enums';
import { E_RAISING_DRAGON } from '../../../modules/enums';

const props = defineProps<{
  /** 育龙类型 */
  raisingDragonType: `${E_RAISING_DRAGON_TYPE}`;
}>();
// 获取 form 相关数据
const { formData, formItemList, rulesData } = getFromData(props.raisingDragonType);
/** form ref */
const formRef = ref<FormInstance>();
/** form 表单 */
const form = reactive<IFormType>(formData);
/** form item */
const formItems: ISubFormType[] = formItemList;
/**
 * 上传成功回调
 * @param name form的props
 * @param value form item 的值
 */
const handleUploadSuccess = ({ name, value }:{name: string, value: string}, item:any) => {
  const [property1, property2] = name.split('.');
  // @ts-ignore
  if (form.hasOwnProperty(property1) && form[property1].hasOwnProperty(property2)) {
    const type = item[0]?.type;
    const isEmptyRichText = type === E_FORM_ITEM_TYPE.RICHTEXT && !value?.replace(/<[^>]+>/g, '')?.length;
    // @ts-ignore
    form[property1][property2] = isEmptyRichText ? '' : value;
  }
  // 校验form validation
  formRef.value?.validateField(name);
};

/**
 * 移除 form item
 * @param name form的props
 */
const handleRemoveImg = (name: string) => {
  const [property1, property2] = name.split('.');
  // @ts-ignore
  if (form.hasOwnProperty(property1) && form[property1].hasOwnProperty(property2)) form[property1][property2] = '';
};

/** 获取配置项 */
const handelGetDragonDetail = async () => {
  try {
    const { success, obj } = await queryDragonDetail({
      activityModel: E_RAISING_DRAGON[props.raisingDragonType],
    });
    if (success && obj && Array.isArray(obj.configList)) {
      obj.configList.forEach((item: IRaisingDragonConfigType) => {
        try {
          if (form.hasOwnProperty(item.templateCode)) {
            const obj = item.uiJson ? JSON.parse(item.uiJson) : {};
            // @ts-ignore
            Object.assign(form[item.templateCode], obj);
          }
        } catch (error: any) {
          console.log(`解析配置项失败: ${item.uiJson}，`, error.message);
        }
      });
    }
  } catch (error: any) {
    console.log('获取配置项失败: ', error.message);
    ElMessage.error(`获取配置项失败：${error.message}`);
  }
};

/** 保存育龙配置 */
const handleSaveDragonInfo = async () => {
  try {
    // 校验背景颜色是否正确
    if (form.rdHelp?.backgroundColor) {
      const colorRegex = /^#([0-9a-fA-F]{6})$/;
      const result = colorRegex.test(form.rdHelp.backgroundColor);
      if (!result) {
        ElMessage.error('请输入正确的颜色值！');
        return;
      }
    }

    const configObj = {
      rdPop: JSON.stringify(form.rdPop),
      rdEntry: JSON.stringify(form.rdEntry),
      rdSelect: JSON.stringify(form.rdSelect),
      rdWaiting: '',
      rdRaising: '',
      rdRaisingCommon: JSON.stringify(form.rdRaisingCommon),
      rdSuccess: JSON.stringify(form.rdSuccess),
      rdFail: JSON.stringify(form.rdFail),
      rdTreasure: JSON.stringify(form.rdTreasure),
      rdHelp: JSON.stringify(form.rdHelp),
      rdText: JSON.stringify(form.rdText || {}),
    };
    const configList: IRaisingDragonConfigType[] = [];
    Object.entries(configObj).forEach(([key, value]) => {
      configList.push({
        templateCode: key,
        uiJson: value,
      });
    });
    const params = {
      activityModel: E_RAISING_DRAGON[props.raisingDragonType],
      configList,
    };
    await saveDragonInfo(params);
    ElMessage.success('保存成功');
  } catch (error: any) {
    console.log('保存育龙配置失败: ', error.message);
    ElMessage.error(`保存育龙配置失败：${error.message}`);
  }
};

/**
 * 提交表单
 * @param formEl ref
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields: any) => {
    if (valid) {
      /** 背景色校验 */
      if (form?.rdHelp?.backgroundColor) {
        const colorRegex = /^#([0-9a-fA-F]{6})$/;
        const result = colorRegex.test(form.rdHelp.backgroundColor);
        if (!result) {
          ElMessage.error('请输入正确的颜色值！');
          return;
        }
      }
      ElMessageBox.confirm('保存后将实时生效，请问您是否确定？').then(() => {
        handleSaveDragonInfo();
      }).catch(() => {});
    } else {
      formRef.value?.scrollToField(Object.keys(fields)[0]);
      ElMessage.error('请完成所有必填表单项！');
    }
  });
};

onMounted(() => {
  handelGetDragonDetail();
});

/** 获取背景样式 */
const computedStyles = computed(() => {
  const style: any = {};
  Object.entries(templateStyleConfig.default[props.raisingDragonType]).forEach(([key, value]) => {
    style[key] = `url(${value})`;
  });
  return style;
});

</script>

<template>
  <PageHeader :title="$route.meta.title" />
  <PageMain>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rulesData"
      class="sub-form"
      label-width="auto"
      :style="computedStyles"
    >
      <SubForm
        v-for="item in formItems"
        :key="item.code"
        :form="form"
        v-bind="item"
        @uploadSuccess="(name, value)=>handleUploadSuccess({name, value},item.items)"
        @removeImg="handleRemoveImg"
      />
      <el-form-item class="sub-form-btns">
        <el-button class="sub-form-btns-submit" type="primary" @click="submitForm(formRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </PageMain>
</template>

<style lang="scss" scoped>
.sub-form {
  min-width: 1100px;
  .sub-form-btns {
    margin: 50px 0 20px;
    .sub-form-btns-submit {
      margin-left: 500px;
    }
  }
}
</style>
