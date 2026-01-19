import { ElMessage } from 'element-plus';
import type { IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import { uGetImageDimensions } from '@/utils/tool';
import type useEditAction from './useEditAction';
import { E_PAGE_ACTION } from './types';
import CustomerGroup from '../components/CustomerGroup.vue';
import PricingRules from '../components/PricingRules.vue';

/* 查看不可改、 编辑且非(草稿中、解析失败)不可改 */
export default function (state: ReturnType<typeof useEditAction>, action: E_PAGE_ACTION = E_PAGE_ACTION.ADD) {
  /* 表单禁用状态 详情禁用 非(草稿、解析失败)的编辑禁用 */
  const isDisabled = computed(() => {
    if (!state.formData.goodsCode) return false;
    return action === E_PAGE_ACTION.DETAIL;
  });

  const formConfig = computed<IFormConfig>(() => ({
    subFormList: [
      {
        header: {
          title: '基础信息',
        },
        formItemList: [
          {
            colProps: { span: 8 },
            type: FormItemType.Input,
            name: 'name',
            label: '商品名称',
            fieldProps: {
              placeholder: '40个字符以内',
              clearable: true,
              maxlength: 40,
              modelModifiers: { trim: true },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请输入商品名称',
            },
          },
        ],
      },
      {
        header: {
          title: '金额和库存',
        },
        formItemList: [
          {
            colProps: { span: 8 },
            type: FormItemType.InputNumber,
            name: 'quotaAmount',
            label: '金额（元）',
            fieldProps: {
              placeholder: '金额（保留两位小数）',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 999999999,
              clearable: true,
              disabled: isDisabled.value || action === E_PAGE_ACTION.EDIT,
            },
            rules: {
              required: true,
              message: '请输入金额',
            },
          },
          {
            colProps: { span: 8 },
            type: FormItemType.InputNumber,
            name: 'stock',
            label: '库存',
            fieldProps: {
              placeholder: '1-999999999',
              controlsPosition: 'right',
              precision: 0,
              max: 999999999,
              clearable: true,
              disabled: isDisabled.value || action === E_PAGE_ACTION.EDIT,
            },
            rules: {
              required: true,
              validator: (rule, value, callback: any) => {
                if (!value && value !== 0) {
                  callback(new Error('库存不能为空'));
                } else if (value > 999999999) {
                  callback(new Error('库存不能超过999999999'));
                } else if (value <= 0) {
                  callback(new Error('库存必须大于0'));
                } else {
                  callback();
                }
              },
            },
          },
        ],
      },
      {
        header: {
          title: '售卖限制',
        },
        formItemList: [
          {
            colProps: { span: 8 },
            type: FormItemType.Radio,
            name: 'cycle',
            label: '限购周期',
            defaultValue: '0',
            fieldProps: {
              options: [
                { label: '不限', value: '0' },
                { label: '每日', value: '1' },
                { label: '每月', value: '2' },
                { label: '每年', value: '3' },
              ],
              disabled: true,
            },
            rules: {
              required: true,
              message: '请选择限购周期',
            },
          },
          {
            colProps: { span: 8 },
            type: FormItemType.InputNumber,
            name: 'restrictedQuantity',
            label: '限购数量',
            fieldProps: {
              placeholder: '1-999999999',
              controlsPosition: 'right',
              precision: 0,
              min: 1,
              max: 999999999,
              clearable: true,
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请填写限购数量',
            },
          },
          {
            colProps: { span: 24 },
            type: FormItemType.Custom,
            name: 'intelligenceRespList',
            label: '限购客群',
            customComponent: {
              component: CustomerGroup,
              props: {
                intelligenceRespList: state.formData.intelligenceRespList,
                disabled: isDisabled.value || action === E_PAGE_ACTION.EDIT,
                onChange: state.onChangeIntelligenceList,
              },
            },
          },
        ],
      },
      {
        header: {
          title: '使用限制',
        },
        formItemList: [
          {
            colProps: { span: 24 },
            type: FormItemType.Custom,
            name: 'configRespList',
            label: '计价规则',
            customComponent: {
              component: PricingRules,
              props: {
                configRespList: state.formData.configRespList,
                disabled: isDisabled.value || action === E_PAGE_ACTION.EDIT,
                onChange: state.onChangeConfigRespList,
              },
            },
          },
        ],
      },
      {
        header: {
          title: '商品描述',
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.Input,
            name: 'remark',
            label: '商品备注（对内）',
            fieldProps: {
              placeholder: '40个字符以内',
              clearable: true,
              maxlength: 40,
              modelModifiers: { trim: true },
              disabled: isDisabled.value,
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Upload,
            name: 'imageUrl',
            label: '商品图',
            fieldProps: {
              clearable: true,
              action: '/activity-web-backend/pmp-store/web/image/upload',
              accept: '.jpg,.jpeg.png',
              tips: '尺寸480*280',
              size: 1024,
              listType: 'picture',
              beforeUpload: async (file: File) => {
                try {
                  const obj: any = await uGetImageDimensions(file);
                  if (obj.width === 480 && obj.height === 280) {
                    return true;
                  }
                  ElMessage.error('上传的图片尺寸不正确');
                  return false;
                } catch (err: any) {
                  ElMessage.error(err.message);
                  return false;
                }
              },
              onChange: () => {
                state.formRef.value?.validateField('imageUrl');
              },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请上传商品图',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Input,
            name: 'goodsDesc',
            label: '商品说明',
            fieldProps: {
              placeholder: '请输入商品说明',
              clearable: true,
              maxlength: 500,
              modelModifiers: { trim: true },
              disabled: isDisabled.value,
            },
          },
        ],
      },
      {
        formItemList: [
          {
            type: FormItemType.Button,
            name: 'submit',
            colProps: { offset: 16 },
            hidden: action === E_PAGE_ACTION.DETAIL,
            fieldProps: {
              label: action === E_PAGE_ACTION.ADD ? '保存并创建' : '保存',
              props: {
                type: 'primary',
                size: 'large',
                loading: state.loading.submit,
                onClick: () => state.submitForm(),
              },
            },
          },
        ],
      },
    ],
  }));

  return { formConfig };
}
