import type { Component } from 'vue';
import type {
  ElButton,
  ElPopconfirm
} from 'element-plus';

type ElBtnProps = InstanceType<typeof ElButton>['$props'];
type ElPopconfirmProps = InstanceType<typeof ElPopconfirm>['$props'];
/**
 * 自定义组件类型
 */
export interface ICustomComponent {
  /** 自定义组件 */
  component: Component;
  /** 组件属性 */
  props?: Record<string, any>;
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