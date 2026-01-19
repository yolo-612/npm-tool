/**
 * @description: 育龙基本数据
 */
import { cloneDeep } from 'lodash-es';
import type { IFormType } from '../composables/types';
import { E_RAISING_DRAGON_TYPE } from '../../modules/enums';

/** form 育龙基本数据 */
const formData: IFormType = {
  /** 入口弹窗 */
  rdPop: {
    /** 背景图: 590 * 822 */
    backgroundUrl: '',
  },
  /** 入口页面 */
  rdEntry: {
    /** 页面背景图: 750px * 1624 */
    backgroundUrl: '',
    /** 底部切片 */
    entryBottomCover: '',
  },
  /** 选龙页面 */
  rdSelect: {
    /** 页面背景图: 750px */
    backgroundUrl: '',
    /** 兜底中心图案图 */
    emptyIconUrl: '',
  },
  /** 基础配置 */
  rdRaisingCommon: {
    /** 常规育龙页面背景图: 750px */
    backgroundUrl: '',
    /** 常规育龙龙珠底座背景图: 615px * 610px */
    dragonSeatUrl: '',
    /** 客户任务弹窗龙珠提示 220px * 165px */
    taskPopDragonUrl: '',
  },
  /** 育龙成功 */
  rdSuccess: {
    /** 育龙成功动画 */
    videoUrl: '',
    /** 育龙成功页面背景图: 750px */
    backgroundUrl: '',
    /** 育龙成功弹窗: 750px * 641px */
    popBackgroundUrl: '',
    /** 育龙成功页面底部切片: 750px */
    bottomCoverUrl: '',
  },
  /** 育龙失败 */
  rdFail: {
    /** 育龙失败弹窗: 674px * 508px */
    popBackgroundUrl: '',
  },
  /** 小哥挖宝 */
  rdTreasure: {
    /** 挖宝入口icon */
    entryIconUrl: '',
    /** 挖宝入口弹窗背景 */
    entryPopUrl: '',
    /** 挖宝页面背景图 */
    bannerUrl: '',
  },
  /** 提报 */
  rdHelp: {
    /** 挖宝入口icon */
    entryIconUrl: '',
    /** 挖宝页面背景图 */
    backgroundUrl: '',
    /** 页面背景色 */
    backgroundColor: '',
  },
  /** 育龙文案修改 */
  rdText: {
    /** 跑马灯文案 */
    helpMeNoticeText: '',
    /** 活动规则 */
    rule: '',
  },
};

/** form 数据对象 - 育龙挑战独有的数据对象 */
const challengeData = {
  rdPop: {
    ...formData.rdPop,
    /** 弹窗按钮图片411px * 96px */
    popBtnUrl: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1739844067820_857.png',
  },
  rdEntry: {
    ...formData.rdEntry,
    /** 弹窗按钮图片477px * 165px */
    entryBtnUrl: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1739844102478_906.png',
  },
  /** 育龙文案修改 */
  rdText: {
    ...formData.rdText,
    /** 弹窗副标题 */
    popSubTitle: '为您开启挑战之门',
    /** 育龙进度第三阶段文案 */
    popIntroDur3Detail: '挑战成功',
    /** 入口副标题 */
    entrySubTitle: '为您开启挑战之门',
    /** 入口 育龙进度第三阶段文案 */
    entryIntroDur3Detail: '挑战成功',
    /** 入口 tab气泡文案 */
    entryTabPopText: '邀您来战',
    /** 等待育龙副标题 */
    raisingSubTitle: '客户收入涨涨涨，你的计提涨涨涨',
    /** 等待育龙活动文案 */
    waitToRaiseActInfo: '培育客户',
    /** 育龙进行中活动文案 */
    raisingActInfo: '培育客户',
    /** 活动进行中按钮文案--去加速育龙 */
    raisingBtnText: '去加速挑战达成',
    /** 活动结束按钮文案--活动结算中 */
    raisingBtnEndedText: '结果统计中',
    /** 育龙成功文案副标题 */
    endSuccessInfoSubtitle: '您就是客户最信赖的伙伴',
  },
};

/**
 * 获取育龙数据
 * @param type 育龙类型
 * @returns 育龙数据
 */
export const getData = (type: string) => {
  // 深拷贝
  const data = structuredClone ? structuredClone(formData) : cloneDeep(formData);
  if (type === E_RAISING_DRAGON_TYPE.CHALLENGE) {
    return { ...data, ...challengeData };
  }
  return data;
};
