import type {
  FormProps as ElFormProps,
  RowProps as ElRowProps,
  ColProps as ElColProps,
  FormItemRule as ElFormItemRule
} from 'element-plus';
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
  // /** 类型 */
  // type: FormItemType;
  // /** 类型 */
  // renderType?: FormItemType;
  // /** name对应formData中的key */
  // name: string;
  // /** 表单域标签 */
  // label?: string;
  // /** label 简介，有则显示叹号图标 */
  // labelIntro?: string;
  // /** 自定义label */
  // customLabel?: ICustomComponent;
  // /** 是否隐藏 */
  // hidden?: boolean;
  // /** el-form 中 el-form-item 的属性 */
  // elFormItemProps?: Partial<ElFormItemProps & { [key: string]: any }>;
  // /** 默认值 */
  // defaultValue?: any;
  // /** 占位符 */
  // placeholder?: string;
  // /** lable位置 默认top */
  // labelPosition?: 'top' | 'left';
  // /** 校验规则 */
  // rules?: FormItemRule | FormItemRule[];
  // /** 自定义组件 */
  // customComponent?: ICustomComponent;
  // /** 自定义组件 */
  // render?: ICustomComponent;
  // /** FormItem的属性 */
  // fieldProps?: TFieldProps;
  // /** 子表中 el-col 单独属性, 会覆盖表单、子表中的colProps */
  // colProps?: ElColProps;
}

/* field表单的类型 */
export enum FormItemType {
  /** 输入框 */
  Input = 'Input',
  /** 下拉框 */
  Select = 'Select',
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
  /** 是否隐藏 */
  hidden?: boolean;
  /** 校验规则 */
  rules?: ElFormItemRule | ElFormItemRule[];
  /** FormItem的属性 */
  fieldProps?: any;
  /** 子表中 el-col 单独属性, 会覆盖表单、子表中的colProps */
  colProps?: ElColProps;
}