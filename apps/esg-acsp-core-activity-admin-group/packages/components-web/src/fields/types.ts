import type {
  ElButton,
  ElPopconfirm,
  ElSelect,
  ElDatePicker,
  ElTimePicker,
  ElCascader,
  ElTreeSelect,
  InputProps as ElInputProps,
  InputNumberProps as ElInputNumberProps,
  SwitchProps as ElSwitchProps,
  RadioProps as ElRadioProps,
  CheckboxProps as ElCheckboxProps,
  UploadProps as ElUploadProps,
} from 'element-plus';
import type { Component } from 'vue';
/* 表单组件的类型 */
type ElBtnProps = InstanceType<typeof ElButton>['$props'];
type ElPopconfirmProps = InstanceType<typeof ElPopconfirm>['$props'];
type ElSelectProps = InstanceType<typeof ElSelect>['$props'];
type ElDatePickerProps = InstanceType<typeof ElDatePicker>['$props'];
type ElTimePickerProps = InstanceType<typeof ElTimePicker>['$props'];
type ElCascaderProps = InstanceType<typeof ElCascader>['$props'];
type ElTreeSelectProps = InstanceType<typeof ElTreeSelect>['$props'];

/**
 * 自定义组件类型
 */
export interface ICustomComponent {
  /** 自定义组件 */
  component: Component;
  /** 组件属性 */
  props?: Record<string, any>;
}

/* field表单的类型 */
export enum FieldItemType {
  /* 按钮 */
  Button = 'Button',
  /* 按钮 */
  Cascader = 'Cascader',
  /** 多选框 */
  Checkbox = 'Checkbox',
  /** 日期选择器 */
  DatePicker = 'DatePicker',
  /** 输入框 */
  Input = 'Input',
  /** 数字输入框 */
  InputNumber = 'InputNumber',
  /** 数字范围输入框 */
  InputNumberRange = 'InputNumberRange',
  /** label */
  Label = 'Label',
  /** 链接 */
  Link = 'Link',
  /** 单选框 */
  Radio = 'Radio',
  /** 下拉框 */
  Select = 'Select',
  /** 开关 */
  Switch = 'Switch',
  /** 时间选择器 */
  TimePicker = 'TimePicker',
  /** 树形选择器 */
  TreeSelect = 'TreeSelect',
  /* 文件上传 */
  Upload = 'Upload',
  /* 自定义 */
  Custom = 'Custom',
}

/* 按钮的类型 */
export interface IFieldButtonProps {
  /* 文案 */
  label: string;
  confirm?: ElPopconfirmProps;
  code?: string;
  props: ElBtnProps & { debounce?: number };
  hidden?: boolean;
}

/* Link的类型 */
export interface IFieldLinkProps {
  /** 文字 */
  label: string;
  /** 链接 */
  linkUrl?: string;
  /* 链接行为 */
  action?: () => void;
}

/* Select Option的类型 */
export interface ISelectOption {
  key?: string | number;
  value: string | number | boolean | object;
  label?: string;
  disabled?: boolean;
  hidden?: boolean;
}

/**
 * 表单Field属性类型
 */
export type TFieldProps = (
  | ElInputProps
  | ElInputNumberProps
  | ElSelectProps
  | ElSwitchProps
  | ElRadioProps
  | ElCheckboxProps
  | ElDatePickerProps
  | ElTimePickerProps
  | ElCascaderProps
  | ElUploadProps
  | IFieldButtonProps
  | IFieldLinkProps
  | ElTreeSelectProps
) & {
  [key: string]: any;
};
