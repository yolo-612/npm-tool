/**
 * @description 育龙配置项
 */
import { cloneDeep } from 'lodash-es';
import type { ISubFormType } from '../composables/types';
import { E_FORM_ITEM_TYPE } from '../composables/enums';
import { E_RAISING_DRAGON_TYPE } from '../../modules/enums';

/** form item 的数据 */
const formList: ISubFormType[] = [
  {
    title: '入口弹窗',
    code: 'rdPop',
    component: 'RdPop',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '入口弹窗',
        prop: 'rdPop.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 590,
          height: 822,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '入口页面',
    code: 'rdEntry',
    component: 'RdEntry',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '背景图',
        prop: 'rdEntry.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 1334,
          size: 0.5,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '底部切片',
        prop: 'rdEntry.entryBottomCover',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 358,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '选龙页面-背景图',
    code: 'rdSelect',
    component: 'RdSelectBg',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '背景图',
        prop: 'rdSelect.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 1624,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '选龙页面-中心图',
    code: 'rdSelect',
    component: 'RdSelectEmptyIcon',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '中心图',
        prop: 'rdSelect.emptyIconUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 189,
          height: 286,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '基础配置',
    code: 'rdRaisingCommon',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '背景图',
        prop: 'rdRaisingCommon.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 1624,
          size: 0.5,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '龙珠底座',
        prop: 'rdRaisingCommon.dragonSeatUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 615,
          height: 610,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '等待育龙-等待页面',
    code: 'rdRaisingCommon',
    component: 'RdWaitPage',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '背景图',
        prop: 'rdRaisingCommon.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 1624,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '等待育龙-客户详情',
    code: 'rdRaisingCommon',
    component: 'RdWaitCustomerDetail',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '弹窗图案',
        prop: 'rdRaisingCommon.taskPopDragonUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 220,
          height: 165,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '育龙进行中-等待页面',
    code: 'rdRaisingCommon',
    component: 'RdRaisingWaitPage',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '背景图',
        prop: 'rdRaisingCommon.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 1624,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '育龙进行中-客户详情',
    code: 'rdRaisingCommon',
    component: 'RdRaisingCustomerDetail',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '弹窗图案',
        prop: 'rdRaisingCommon.taskPopDragonUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 220,
          height: 165,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '育龙成功',
    code: 'rdSuccess',
    component: 'RdSuccess',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '动效动画',
        prop: 'rdSuccess.videoUrl',
        isImage: false,
        fieldProps: {
          accept: 'video/mp4',
          size: 8,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '育龙成功页面背景图',
        prop: 'rdSuccess.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 1334,
          size: 0.5,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '育龙成功弹窗',
        prop: 'rdSuccess.popBackgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 522,
          size: 0.5,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '育龙成功页面底部切片',
        prop: 'rdSuccess.bottomCoverUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 750,
          height: 318,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '育龙失败',
    code: 'rdFail',
    component: 'RdFail',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '弹窗背景',
        prop: 'rdFail.popBackgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          width: 674,
          height: 508,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '小哥挖宝-弹窗背景',
    code: 'rdTreasure',
    component: 'RdTreasurePopUp',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '弹窗背景',
        prop: 'rdTreasure.entryPopUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png, image/gif',
          width: 612,
          height: 724,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '小哥挖宝-入口图标',
    code: 'rdTreasure',
    component: 'RdTreasureIcon',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '图标',
        prop: 'rdTreasure.entryIconUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png, image/gif',
          width: 104,
          height: 121,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '小哥挖宝-列表页面',
    code: 'rdTreasure',
    component: 'RdTreasureList',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '顶部图片',
        prop: 'rdTreasure.bannerUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          size: 0.5,
          width: 750,
          height: 380,
        },
      },
    ],
  },
  {
    title: '小哥挖宝-填写页面',
    code: 'rdTreasure',
    component: 'RdTreasureWrite',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '顶部图片',
        prop: 'rdTreasure.bannerUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          size: 0.5,
          width: 750,
          height: 380,
        },
      },
    ],
  },
  {
    title: '帮帮我-入口图标',
    code: 'rdHelp',
    component: 'RdHelpIcon',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '图标',
        prop: 'rdHelp.entryIconUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png, image/gif',
          width: 104,
          height: 121,
          size: 0.5,
        },
      },
    ],
  },
  {
    title: '帮帮我-填写页面',
    code: 'rdHelp',
    component: 'RdHelpWrite',
    items: [
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '页面背景图',
        prop: 'rdHelp.backgroundUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          size: 0.5,
          width: 750,
          height: 1624,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT_COLOR,
        label: '页面背景色',
        prop: 'rdHelp.backgroundColor',
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '跑马灯文案',
        prop: 'rdText.helpMeNoticeText',
        fieldProps: {
          placeholder: '请输入跑马灯文案，最多20个字',
          maxlength: 20,
        },
      },
    ],
  },
  {
    title: '活动规则',
    code: 'rdRule',
    items: [
      {
        type: E_FORM_ITEM_TYPE.RICHTEXT,
        label: '活动规则内容',
        prop: 'rdText.rule',
        fieldProps: {
          maxlength: 1000,
        },
      },
    ],
  },
];

/**
 * 获取育龙配置项
 * @param type 育龙类型
 * @returns 育龙配置项
 */
export const getTimes = (type: string) => {
  // 深拷贝
  const list = structuredClone ? structuredClone(formList) : cloneDeep(formList);
  if (type === E_RAISING_DRAGON_TYPE.CHALLENGE) {
    list[0].items.push(
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '弹窗按钮',
        prop: 'rdPop.popBtnUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          size: 0.5,
          width: 411,
          height: 96,
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '弹窗副标题',
        prop: 'rdText.popSubTitle',
        fieldProps: {
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '育龙进度第三阶段文案',
        prop: 'rdText.popIntroDur3Detail',
        fieldProps: {
          disabled: true,
        },
      },
    );
    list[1].items.push(
      {
        type: E_FORM_ITEM_TYPE.UPLOAD,
        label: '入口按钮图片',
        prop: 'rdEntry.entryBtnUrl',
        fieldProps: {
          accept: 'image/jpeg, image/jpg, image/png',
          size: 0.5,
          width: 477,
          height: 165,
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '入口副标题',
        prop: 'rdText.entrySubTitle',
        fieldProps: {
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '育龙进度第三阶段文案',
        prop: 'rdText.entryIntroDur3Detail',
        fieldProps: {
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: 'tab气泡文案',
        prop: 'rdText.entryTabPopText',
        hidden: true,
        fieldProps: {
          disabled: true,
        },
      },
    );
    list[4].items.push({
      type: E_FORM_ITEM_TYPE.INPUT,
      label: '等待育龙活动文案',
      prop: 'rdText.waitToRaiseActInfo',
      fieldProps: {
        disabled: true,
      },
    });
    list[5].items.push({
      type: E_FORM_ITEM_TYPE.INPUT,
      label: '副标题',
      prop: 'rdText.raisingSubTitle',
      fieldProps: {
        disabled: true,
      },
    });
    list[7].items.push(
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '等待育龙活动文案',
        prop: 'rdText.raisingActInfo',
        fieldProps: {
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '活动进行中按钮文案',
        prop: 'rdText.raisingBtnText',
        fieldProps: {
          disabled: true,
        },
      },
      {
        type: E_FORM_ITEM_TYPE.INPUT,
        label: '活动结束按钮文案',
        prop: 'rdText.raisingBtnEndedText',
        fieldProps: {
          disabled: true,
        },
      },
    );
    list[9].items.push({
      type: E_FORM_ITEM_TYPE.INPUT,
      label: '副标题',
      prop: 'rdText.endSuccessInfoSubtitle',
      fieldProps: {
        disabled: true,
      },
    });
    list[10].items.push({
      type: E_FORM_ITEM_TYPE.INPUT,
      label: '育龙进行中活动文案',
      prop: 'rdText.raisingActInfo',
      fieldProps: {
        disabled: true,
      },
    });
  }
  return list;
};
