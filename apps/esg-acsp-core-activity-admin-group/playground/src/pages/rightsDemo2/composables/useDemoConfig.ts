/* 页面配置？ */

import { FormItemType, TableColumnType } from '@fpkg/components-web';
import { computed, h, type Ref, ref } from 'vue';
import { dayjs } from 'element-plus';
import CompDemo from '../components/CompDemo.vue';

const colProps = { span: 8 };

const column = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '姓名',
      prop: 'name',
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '手机号',
      prop: 'phone',
    },
  },
  {
    renderType: TableColumnType.Button,
    columnProps: {
      label: '操作',
      prop: 'action',
    },
    fieldProps: ({ row }: any) => ({
      label: '表格按钮',
      props: {
        debounce: 500,
        onClick: () => {
          console.log('点击了按钮', row);
        },
      },
    }),
  },
];

export default function (state: any, forRef?: Ref<any>) {
  const testOpt = ref();

  setTimeout(() => {
    testOpt.value = [
      {
        key: '123',
        label: 'android',
        value: '123',
      },
      {
        key: '234',
        label: 'ios',
        value: '234',
      },
    ];
  }, 2000);

  const showStep = computed(() => state.formData.select === '234');

  const config = {
    // type:'detail',
    formProps: {
      // labelPosition: 'left',
      // labelWidth: 'auto',
    },
    subFormList: [
      {
        // showType:'table',
        header: {
          title: '表头Title1',
          subTitle: '表头subTitle',
          isActive: true,
          foldEnable: true,
          intro: 'intro',
        },
        formItemList: [
          {
            colProps,
            type: FormItemType.Select,
            name: 'select',
            label: '下拉选择',
            fieldProps: {
              // name: 'contract_type',
              placeholder: '这是placeholder',
              // noDataText: '这是没有数据',
              options: testOpt,
              slots: {
                header: 'header',
                footer: 'footer',
                prefix: 'prefix',
              },
            },
            rules: {
              required: true,
              message: '请选择合同类型',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'inputNumber',
            label: '步进器',
            fieldProps: {
              placeholder: '这是placeholder',
              precision: 2,
            },
            rules: computed(() => ({
              required: state.formData.select === '234',
            })),
          },
          {
            type: FormItemType.Label,
            colProps,
            name: 'label',
            label: 'Label测试',
            hidden: state.formData.select === '234',
            fieldProps: {
              prefix: 'prefix测试dwehiuidhjuio等',
              multiLine: true,
              modelValue: '<span>1234</span>djeiodjuiqwejeioddxjkashjduiewhjdioasjdmklajduijsd',
            },
            rules: {
              required: true,
              message: '请选择合同类型',
            },
          },
          {
            type: FormItemType.Link,
            colProps,
            name: 'link',
            label: 'Link测试',
            fieldProps: {
              text: '测试Link',
              action: () => {
                console.log('点击了Link====');
              },
            },
            rules: {
              required: true,
              message: '请选择合同类型',
            },
          },
          {
            type: FormItemType.InputNumberRange,
            colProps,
            name: 'numberRange',
            label: '数字范围',
            fieldProps: {
              controls: true,
              max: 10,
              min: 1,
              prefix: '123',
              suffix: '123',
            },
            rules: {
              required: true,
              message: '请选择数字范围',
              type: 'array',
            },
          },
          {
            type: FormItemType.DatePicker,
            colProps,
            name: 'datePicker',
            label: '日期选择',
            fieldProps: {
              placeholder: 'partyASignDate',
              valueFormat: 'YYYY-MM-DD',
              format: 'YYYY-MM-DD',
              disabledDate: (date: Date) => {
                const today = dayjs().startOf('date');
                return dayjs(date) > today;
              },
            },
            rules: {
              required: true,
              message: 'DatePicker',
            },
          },
          {
            type: FormItemType.Custom,
            colProps,
            name: 'compDemo',
            label: '自定义组件',
            customComponent: {
              component: h(
                'div',
                {
                  onClick: () => {
                    console.log('测试点击');
                  },
                  class: 'test-class',
                },
                'h点击',
              ),
            },
            rules: {
              required: true,
              message: '自定义校验',
            },
          },
          {
            type: FormItemType.Radio,
            colProps,
            name: 'radio',
            label: 'Radio测试',
            fieldProps: {
              options: [
                {
                  key: '123',
                  label: 'android',
                  value: '123',
                },
                {
                  key: '234',
                  label: 'ios',
                  value: '234',
                },
              ],
            },
          },
          {
            type: FormItemType.Cascader,
            colProps,
            name: 'cascader',
            label: 'cascader测试',
            fieldProps: {
              options: [],
            },
          },
          {
            type: FormItemType.Table,
            colProps:{span:20},
            name: 'table',
            label: 'Table测试',
            elFormItemProps: {
              labelPosition: 'top',
            },
            fieldProps: {
              columns: column,
            },
          },
        ],
      },
      {
        header: { title: '自定义组件', subTitle: 'subTitle', intro: 'intro' },
        customContent: {
          component: CompDemo,
          props: {
            message: '自定义内容',
          },
        },
      },
    ],
  };
  return config;
}
