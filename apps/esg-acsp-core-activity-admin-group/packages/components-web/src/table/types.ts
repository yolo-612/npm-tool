import type {
  TableColumnCtx, ElPagination, ElTable, ElTableColumn,
} from 'element-plus';
import type { Component, HTMLAttributes } from 'vue';
import type { IFormItem } from '../form/types';
import type { ICustomComponent } from '../fields';

export { TableColumnCtx };

export const saspTableInjectKey = Symbol('saspTableInjectKey');

export type ElTableType = InstanceType<typeof ElTable>;

export enum TableColumnType {
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
  /* 自定义 */
  Custom = 'Custom',
  /* 原生el-col */
  ElColumn = 'ElColumn',
  /* 文件上传 */
  Upload = 'Upload',
  /* btn列表 */
  Buttons = 'Buttons',
}

/**
 * 查询头部item类型
 */
export interface ISaspTableSearchItem {
  type: TableColumnType;
  prop: string;
  width?: number;
  hidden?: boolean;
  customComponent?: Component;
  fieldProps?: any;
  getFieldProps?: (item: ISaspTableSearchItem, params: any) => any;
  /** 是否对值trim，目前input类型自动trim */
  autoTrim?: boolean;
}

type ElTableColumnProps = InstanceType<typeof ElTableColumn>['$props'];
export type ElPaginationProps = InstanceType<typeof ElPagination>['$props'];

/**
 * ElTableColumn包裹的内容
 */
export interface ISaspTableColumnContent {
  type: TableColumnType;
  props?: any;
  customComponent?: Component;
}

type GetSaspTableColumnContentFunc = (data: any, column: TableColumnCtx<any>) => ISaspTableColumnContent;

export interface ISaspTableColumnProps {
  props: ElTableColumnProps;
  content: ISaspTableColumnContent | GetSaspTableColumnContentFunc;
  hidden?: boolean;
  /** 多级表头配置 */
  subColumns?: ISaspTableColumnProps[];
}

export interface ISearchTableHeader {
  /** 筛选项 */
  searchItemList: IFormItem[];
  /** 是否显示查询 */
  showSearchBtn?: boolean;
  /* 是否展示重置按钮 */
  showResetBtn?: boolean;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 搜索按钮文本 */
  searchBtnTxt?: string;
  /** 重置按钮文本 */
  resetBtnTxt?: string;
}

/* 分页参数类型New */
export interface IPageInfo {
  pageSize: number;
  pageNum: number;
  total: number;
}

/**
 * 操作按钮类型
 */
export interface ISaspTableOperationBtn {
  /** 按钮名称 */
  label: string;
  /** 按钮code */
  code: string;
  /** 属性 */
  props?: HTMLAttributes;
  /** 是否禁用 */
  disabled?: boolean;
  /** 气泡提示文字 */
  tooltip?: string;
}

export type TCustomSlots = ICustomComponent | string;
export type TRenderFunc = (text: any, scope: any) => TCustomSlots;
export type TFieldPropsFunc = (scope: any) => any;

export interface IPureTableColumnItem {
  /* 渲染类型 （各种表单、el列、自定义、动态组件、操作） */
  renderType: TableColumnType;
  // element 原生的cols属性
  columnProps: ElTableColumnProps;
  // 预定义渲染的参数
  fieldProps?: TFieldPropsFunc | object;
  // 渲染的内容会直接占用默认插槽 类似于map映射(custom) 也可以动态渲染组件 传递了参数
  render?: TRenderFunc | TCustomSlots;
  // 给出slots 自定义clos的slots
  slots?: {
    [key: string]: TCustomSlots;
  };
  // 多级表头
  subColumns?: IPureTableColumnItem[];
  // 是否展示
  hidden?: boolean;
}
