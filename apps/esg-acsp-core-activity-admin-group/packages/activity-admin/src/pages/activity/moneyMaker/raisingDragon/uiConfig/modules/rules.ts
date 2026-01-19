/**
 * @description 校验规则列表
 */
import { cloneDeep } from 'lodash-es';
import { E_RAISING_DRAGON_TYPE } from '../../modules/enums';

/** 校验规则列表 */
const rulesData = {
  rdPop: {
    backgroundUrl: [
      { required: true, message: '请上传背景图', trigger: 'blur' },
    ],
  },
  rdEntry: {
    backgroundUrl: [
      { required: true, message: '请上传背景图', trigger: 'blur' },
    ],
    entryBottomCover: [
      { required: true, message: '请上传底部切片', trigger: 'blur' },
    ],
  },
  rdSelect: {
    backgroundUrl: [
      { required: true, message: '请上传背景图', trigger: 'blur' },
    ],
    emptyIconUrl: [
      { required: true, message: '请上传兜底中心图案图', trigger: 'blur' },
    ],
  },
  rdRaisingCommon: {
    backgroundUrl: [
      { required: true, message: '请上传常规育龙页面背景图', trigger: 'blur' },
    ],
    dragonSeatUrl: [
      { required: true, message: '请上传常规育龙龙珠底座背景图', trigger: 'blur' },
    ],
    taskPopDragonUrl: [
      { required: true, message: '请上传客户任务弹窗龙珠提示', trigger: 'blur' },
    ],
  },
  rdSuccess: {
    videoUrl: [
      { required: true, message: '请上传育龙成功动画', trigger: 'blur' },
    ],
    backgroundUrl: [
      { required: true, message: '请上传育龙成功页面背景图', trigger: 'blur' },
    ],
    popBackgroundUrl: [
      { required: true, message: '请上传育龙成功弹窗', trigger: 'blur' },
    ],
    bottomCoverUrl: [
      { required: true, message: '请上传育龙成功页面底部切片', trigger: 'blur' },
    ],
  },
  rdFail: {
    popBackgroundUrl: [
      { required: true, message: '请上传育龙失败弹窗', trigger: 'blur' },
    ],
  },
  rdTreasure: {
    entryIconUrl: [
      { required: true, message: '请上传挖宝入口icon', trigger: 'blur' },
    ],
    entryPopUrl: [
      { required: true, message: '请上传挖宝入口弹窗背景', trigger: 'blur' },
    ],
    bannerUrl: [
      { required: true, message: '请上传顶部图片', trigger: 'blur' },
    ],
  },
  rdHelp: {
    entryIconUrl: [
      { required: true, message: '请上传提报入口icon', trigger: 'blur' },
    ],
    backgroundUrl: [
      { required: true, message: '请上传页面背景', trigger: 'blur' },
    ],
    backgroundColor: [
      { required: true, message: '请上传页面背景色', trigger: 'blur' },
      {
        min: 7, max: 7, message: '请输入正确的颜色值', trigger: 'blur',
      },
    ],
  },
  rdText: {
    helpMeNoticeText: [
      { required: true, message: '请输入跑马灯文案', trigger: 'blur' },
    ],
    rule: [
      { required: true, message: '请输入活动规则内容', trigger: 'blur' },
    ],
  },
};

/** 育龙挑战独有的校验规则 */
const challengeRulesData = {
  rdPop: {
    ...rulesData.rdPop,
    popBtnUrl: [
      { required: true, message: '请上传弹窗按钮图片', trigger: 'blur' },
    ],
  },
  rdEntry: {
    ...rulesData.rdEntry,
    entryBtnUrl: [
      { required: true, message: '请上传弹窗按钮图片', trigger: 'blur' },
    ],
  },
  rdText: {
    ...rulesData.rdText,
    popSubTitle: [
      { required: true, message: '请输入弹窗副标题', trigger: 'blur' },
    ],
    popIntroDur3Detail: [
      { required: true, message: '请输入育龙进度第三阶段文案', trigger: 'blur' },
    ],
    entrySubTitle: [
      { required: true, message: '请输入入口副标题', trigger: 'blur' },
    ],
    entryIntroDur3Detail: [
      { required: true, message: '请输入入口育龙进度第三阶段文案', trigger: 'blur' },
    ],
    entryTabPopText: [
      { required: true, message: '请输入入口 tab气泡文案', trigger: 'blur' },
    ],
    rule: [
      { required: true, message: '请输入活动规则', trigger: 'blur' },
    ],
    raisingSubTitle: [
      { required: true, message: '请输入等待育龙副标题', trigger: 'blur' },
    ],
    waitToRaiseActInfo: [
      { required: true, message: '请输入等待育龙活动文案', trigger: 'blur' },
    ],
    raisingActInfo: [
      { required: true, message: '请输入育龙进行中活动文案', trigger: 'blur' },
    ],
    raisingBtnText: [
      { required: true, message: '请输入活动进行中按钮文案--去加速育龙', trigger: 'blur' },
    ],
    raisingBtnEndedText: [
      { required: true, message: '请输入活动结束按钮文案--活动结算中', trigger: 'blur' },
    ],
    endSuccessInfoSubtitle: [
      { required: true, message: '请输入育龙成功文案副标题', trigger: 'blur' },
    ],
  },
};

/**
 * 获取育龙校验规则
 * @param type 育龙类型
 * @returns 校验规则
 */
export const getRules = (type: string) => {
  // 深拷贝
  const rules = structuredClone ? structuredClone(rulesData) : cloneDeep(rulesData);
  if (type === E_RAISING_DRAGON_TYPE.CHALLENGE) {
    return { ...rules, ...challengeRulesData };
  }
  return rules;
};
