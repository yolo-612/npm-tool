import type { Component } from 'vue';
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

/* 表单组件的类型 */
type ElBtnProps = InstanceType<typeof ElButton>['$props'];
type ElPopconfirmProps = InstanceType<typeof ElPopconfirm>['$props'];
type ElSelectProps = InstanceType<typeof ElSelect>['$props'];
type ElDatePickerProps = InstanceType<typeof ElDatePicker>['$props'];
type ElTimePickerProps = InstanceType<typeof ElTimePicker>['$props'];
type ElCascaderProps = InstanceType<typeof ElCascader>['$props'];
type ElTreeSelectProps = InstanceType<typeof ElTreeSelect>['$props'];

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

/**
 * 自定义组件类型
 */
export interface ICustomComponent {
  /** 自定义组件 */
  component: Component;
  /** 组件属性 */
  props?: Record<string, any>;
}
