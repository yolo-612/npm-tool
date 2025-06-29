import type {
  FormProps as ElFormProps,
  RowProps as ElRowProps,
  ColProps as ElColProps,
  FormItemRule as ElFormItemRule
} from 'element-plus';
import type { ICustomComponent } from '@/components/config-comp/fields/types'

/**
 * 表单配置类型
 */
export interface IFormConfig {
  /** form类型 不同类型样式稍微有差别 */
  type?: 'edit' | 'detail';
  /** el-form表单属性 */
  formProps?: ElFormProps;
  /** el-row 统一 属性 */
  rowProps?: ElRowProps;
  /** el-col 统一属性 */
  colProps?: ElColProps;
  /** 子表单列表 */
  subFormList: ISubForm[];
}

/**
 * 子表配置类型
 */
export interface ISubForm {
  /** 是否隐藏 */
  hidden?: boolean;
  /** 子表头 */
  header?: IFormHeader;
  /** 子表中 el-row 属性 */
  rowProps?: ElRowProps;
  /** 子表中 el-col 属性 */
  colProps?: ElColProps;
  /** 子表项 */
  formItemList?: IFormItem[];
  /** 自定义表头 */
  customHeader?: ICustomComponent;
  /** 自定义子表内容  */
  customContent?: ICustomComponent;
  /** 自定义footer */
  customFooter?: ICustomComponent;
}

/* field表单的类型 */
export enum FormItemType {
  /** 输入框 */
  Input = 'Input',
  /** 下拉框 */
  Select = 'Select',
  /* 自定义 */
  Custom = 'Custom',
}

/**
 * 表头
 */
export interface IFormHeader {
  /** 标题 */
  title: string;
  /** 副标题 */
  subTitle?: string;
  /** 收起状态 */
  isActive?: boolean;
  /** 是否可折叠 */
  foldEnable?: boolean;
  /** 简介，有则显示叹号图标 */
  intro?: string;
}
/**
 * FormItem 配置属性
 */
export interface IFormItem {
  /** 类型 */
  type: FormItemType;
  /** 类型 */
  renderType?: FormItemType;
  /** name对应formData中的key */
  name: string;
  /** 表单域标签 */
  label?: string;
  /** 自定义label */
  customLabel?: ICustomComponent;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 校验规则 */
  rules?: ElFormItemRule | ElFormItemRule[];
  /** 自定义组件 */
  customComponent?: ICustomComponent;
  /** 自定义组件 */
  render?: ICustomComponent;
  /** FormItem的属性 */
  fieldProps?: any;
  /** 子表中 el-col 单独属性, 会覆盖表单、子表中的colProps */
  colProps?: ElColProps;
}