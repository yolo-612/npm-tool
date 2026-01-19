/**
 * @description 常量定义
 */
/** form item */
export interface ISubFormItem {
  /** item 组件类型 */
  type: string;
  /** item label */
  label: string;
  /** item prop */
  prop: string;
  /** 图片宽度 */
  width?: number;
  /** 图片高度 */
  height?: number;
  /** 图片内存大小 */
  size?: number;
  /** 文件限制格式 */
  accept?: string;
  /** 是否为 image 类型 */
  isImage?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 选项的参数 */
  fieldProps?: any;
}
/** form */
export interface ISubFormType {
  /** 列表标题 */
  title: string;
  /** code */
  code: string;
  /** 渲染组件 */
  component?: string;
  /** 子表单 */
  items: ISubFormItem[];
}

/** form 配置类型 */
export interface IFormType {
  /** 入口弹窗 */
  rdPop: {
    /** 背景图: 590 * 822 */
    backgroundUrl: string;
    /** 弹窗按钮图片 411px * 96px */
    popBtnUrl?: string;
  };
  /** 入口页面 */
  rdEntry: {
    /** 页面背景图: 750px */
    backgroundUrl: string,
    /** 底部切片: 750px * 358  */
    entryBottomCover: string,
    /** 弹窗按钮图片 477px * 165px */
    entryBtnUrl?: string;
  };
  /** 选龙页面 */
  rdSelect: {
    /** 页面背景图: 750px * 1624 */
    backgroundUrl: string;
    /** 兜底中心图案图 */
    emptyIconUrl: string;
  };
  /** 育龙阶段页面通用配置 */
  rdRaisingCommon: {
    /** 页面背景图: 750px * 1624 */
    backgroundUrl: string;
    /** 常规育龙龙珠底座背景图: 615px * 610px */
    dragonSeatUrl: string;
    /** 客户任务弹窗龙珠提示 220px * 165px */
    taskPopDragonUrl: string;
  };
  // /** 等待育龙页面 */
  // rdWaiting: {
  //   /** 背景图: 750 * 1624 */
  //   backgroundUrl: string;
  // }
  // /** 育龙页面 */
  // rdRaising: {
  //   /** 背景图: 750 * 1624 */
  //   backgroundUrl: string;
  //   /** 龙珠底座图: 6120px * 622px */
  //   dragonSeatUrl: string;
  // }
  /** 育龙成功页面 */
  rdSuccess: {
    /** 育龙成功动画 */
    videoUrl: string;
    /** 育龙成功页面背景图: 750px */
    backgroundUrl: string;
    /** 育龙成功弹窗: 750px * 641px */
    popBackgroundUrl: string;
    /** 育龙成功页面底部切片: 750px */
    bottomCoverUrl: string;
  };
  /** 育龙失败/部分成功页面 */
  rdFail: {
    /** 育龙失败弹窗: 674px * 508px */
    popBackgroundUrl: string;
  };
  /** 育龙挖宝页面 */
  rdTreasure: {
    /** 挖宝入口icon */
    entryIconUrl: string;
    /** 挖宝入口弹窗背景 */
    entryPopUrl: string;
    /** 挖宝页面banner */
    bannerUrl: string;
  };
  /** 育龙帮帮我页面 */
  rdHelp: {
    /** 挖宝入口icon */
    entryIconUrl: string;
    /** 挖宝页面背景图 */
    backgroundUrl: string;
    /** 页面背景色 */
    backgroundColor: string;
  }
  /** 文案 */
  rdText?: {
    /** 弹窗副标题 */
    popSubTitle?: string;
    /** 育龙进度第三阶段文案 */
    popIntroDur3Detail?: string;
    /** 入口副标题 */
    entrySubTitle?: string;
    /** 入口 育龙进度第三阶段文案 */
    entryIntroDur3Detail?: string;
    /** 入口 tab气泡文案 */
    entryTabPopText?: string;
    /** 活动规则 */
    rule?: string;
    /** 等待育龙副标题 */
    raisingSubTitle?: string;
    /** 等待育龙活动文案 */
    waitToRaiseActInfo?: string;
    /** 育龙进行中活动文案 */
    raisingActInfo?: string;
    /** 活动进行中按钮文案--去加速育龙 */
    raisingBtnText?: string;
    /** 活动结束按钮文案--活动结算中 */
    raisingBtnEndedText?: string;
    /** 育龙成功文案副标题 */
    endSuccessInfoSubtitle?: string;
    /** 跑马灯文案 */
    helpMeNoticeText?: string;
  };
}
