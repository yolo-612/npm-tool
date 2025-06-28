import type { Component } from 'vue';

/**
 * 自定义组件类型
 */
export interface ICustomComponent {
  /** 自定义组件 */
  component: Component;
  /** 组件属性 */
  props?: Record<string, any>;
}

/* Select Option的类型 */
export interface ISelectOption {
  key?: string | number;
  value: string | number | boolean | object;
  label?: string;
  disabled?: boolean;
  hidden?: boolean;
}