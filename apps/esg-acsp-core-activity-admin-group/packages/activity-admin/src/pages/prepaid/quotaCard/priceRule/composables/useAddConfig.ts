import type { ISubForm, IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import type useAddAction from './useAddAction';
import useQuotaProductStore from './useProduct';
import { fuzzySearch } from '@/utils/tool';

const colProps = { span: 13 };

export default function (state: ReturnType<typeof useAddAction>, pageAction: 'add' | 'detail') {
  const productStore = useQuotaProductStore();

  /* 子产品选项 */
  const options = reactive({
    main: productStore.productList,
    sub: productStore.productList,
  });

  const baseInfoForm: ISubForm = {
    header: { title: '基本信息' },
    formItemList: [
      {
        colProps,
        type: FormItemType.Input,
        name: 'code',
        label: '计价规则编码',
        hidden: pageAction === 'add',
        fieldProps: {
          disabled: true,
        },
      },
      {
        colProps,
        type: FormItemType.Input,
        name: 'name',
        label: '计价规则名称',
        fieldProps: {
          placeholder: '请填写40个字符以内名称',
          clearable: true,
          maxlength: 40,
          modelModifiers: { trim: true },
        },
        rules: {
          required: true,
          message: '请填写计价规则名称',
        },
      },
      {
        colProps,
        type: FormItemType.DatePicker,
        name: 'validTime',
        label: '配置有效期',
        fieldProps: {
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          rangeSeparator: '至',
          startPlaceholder: '请选择生效日期',
          endPlaceholder: '请选择失效日期',
        },
        rules: {
          required: true,
          message: '请选择配置有效期',
        },
      },
    ],
  };
  const ruleContent = computed<ISubForm>(() => ({
    header: { title: '规则内容' },
    formItemList: [
      {
        colProps,
        type: FormItemType.Select,
        name: 'mainProduct',
        label: '主产品',
        fieldProps: {
          placeholder: '请选择主产品',
          options: options.main,
          filterable: true,
          clearable: true,
          onChange: () => {
            state.formData.subProduct = '';
          },
          filterMethod: (input: string) => {
            options.main = fuzzySearch(input, productStore.productList);
          },
        },
        rules: {
          required: true,
          message: '请选择主产品',
        },
      },
      {
        colProps,
        type: FormItemType.Select,
        name: 'subProduct',
        label: '子产品',
        fieldProps: {
          placeholder: '请选择子产品',
          options: options.sub,
          filterable: true,
          clearable: true,
          filterMethod: (input: string) => {
            options.sub = fuzzySearch(input, productStore.productList);
          },
        },
        rules: {
          required: true,
          message: '请选择子产品',
        },
      },
      {
        colProps,
        type: FormItemType.InputNumber,
        name: 'quota',
        label: '卡额度(元)',
        fieldProps: {
          placeholder: '1-999999999(9个9)',
          max: 999999999,
          min: 1,
        },
        rules: {
          required: true,
          message: '请填写卡额度',
        },
      },
      {
        colProps,
        type: FormItemType.InputNumber,
        name: 'discount',
        label: '卡折扣',
        fieldProps: {
          placeholder: '请填写0.01-1的折扣',
          max: 1,
          min: 0.01,
          step: 0.1,
          precision: 2,
        },
        rules: {
          required: true,
          message: '请填写卡折扣',
        },
      },
      {
        colProps: { offset: 11 },
        type: FormItemType.Button,
        name: 'submit',
        label: '',
        hidden: pageAction === 'detail',
        fieldProps: {
          label: '保存并创建',
          props: {
            type: 'primary',
            size: 'large',
            loading: state.loading.submit,
            onClick: () => state.submitForm(),
          },
        },
      },
    ],
  }));
  const formConfig = computed<IFormConfig>(() => ({
    type: pageAction === 'detail' ? 'detail' : 'edit',
    subFormList: [baseInfoForm, ruleContent.value],
  }));
  return formConfig;
}
