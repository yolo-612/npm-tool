import type { ElTableColumn } from 'element-plus'
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


type ElTableColumnProps = InstanceType<typeof ElTableColumn>['$props'];

export interface ITableColumnItem {
  /* 渲染类型 （各种表单、el列、自定义、动态组件、操作） */
  renderType: TableColumnType;
  // element 原生的cols属性
  columnProps: ElTableColumnProps;
}