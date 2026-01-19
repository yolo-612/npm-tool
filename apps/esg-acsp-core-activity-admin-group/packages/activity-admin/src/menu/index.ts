import type { MenuItem } from '@/stores/modules/menu/types';
import {
  ActivityIcon, FsActivityToolIcon, NewClueIcon, RaisingDragonIcon, SendActivityIcon,
} from './menuIcon';

export default [
  // {
  //   path: '/dashboard/workplace',
  //   title: '工作台',
  //   icon: 'SfHome',
  //   order: 1,
  //   permission: ['*'],
  // },
  {
    path: '/activity',
    title: '活动工具',
    icon: 'Compass',
    order: 2,
    /* 百源的模块名 */
    permission: ['customer', 'coupon', 'empPortrait', 'MarketActivity', 'MarketActivityList'],
    children: [
      {
        title: '小哥发券活动',
        path: '/activity/directSendActivity',
        permission: ['coupon'],
        icon: SendActivityIcon,
        children: [
          {
            path: '/activity/directSendActivity/list',
            title: '直发券管理',
            permission: ['directSendList'],
          },
          {
            path: '/activity/directSendHistory/list',
            title: '小哥发券数据',
            permission: ['directSendHistoryList'],
          },
          {
            path: '/activity/applySendActivity/list',
            title: '申请券管理',
            permission: ['applySendList'],
          },
          {
            path: '/activity/courierPersona/list',
            title: '小哥画像',
            order: 1,
            children: [],
            permission: ['empPortrait'],
          },
        ],
      },
      {
        path: '/activity/marketActivity',
        title: '营销活动',
        icon: ActivityIcon,
        order: 2,
        /* 百源的模块名 */
        permission: ['MarketActivity', 'MarketActivityList'],
        children: [
          {
            path: '/activity/marketActivity/list',
            title: '活动列表',
            permission: ['MarketActivityList'],
            order: 1,
          },
        ],
      },
      {
        path: '/activity/moneyMaker/raisingDragon',
        title: '小哥活动',
        permission: ['moneyMakerRaisingDragon'],
        order: 2,
        icon: RaisingDragonIcon,
        children: [
          {
            path: '/activity/moneyMaker/raisingDragon/uiConfig',
            title: '育龙UI配置',
            permission: ['moneyMakerRaisingDragonUIConfig'],
          },
          {
            path: '/activity/moneyMaker/raisingDragon/activityConfig',
            title: '育龙活动配置',
            permission: ['moneyMakerRaisingDragonActivityConfigList'],
          },
        ],
      },
    ],
  },
  {
    path: '/resourceOperate',
    title: '资源位运营',
    order: 2,
    /* 百源的模块名 */
    permission: ['newClue', 'saleActivity'],
    children: [
      {
        path: '/resourceOperate/newClue',
        title: '来搞钱',
        permission: ['newClue'],
        order: 0,
        icon: NewClueIcon,
        children: [
          {
            path: '/resourceOperate/newClue',
            title: '新签线索维护',
            permission: ['newClue'],
            order: 0,
            children: [],
          },
        ],
      },
      {
        path: '/resourceOperate/saleActivity',
        title: '月结增长工具',
        icon: FsActivityToolIcon,
        permission: ['saleActivity'],
        order: 0,
        children: [
          {
            path: '/activity/saleActivity',
            title: '销售营销管理',
            permission: ['saleActivity'],
            order: 1,
            children: [],
          },
        ],
      },
    ],
  },
  {
    title: '预付费产品',
    order: 2,
    permission: ['activityTool'],
    path: '/prepaid',
    children: [
      {
        title: '额度卡',
        path: '/prepaid/quotaCard',
        permission: ['quotaCard'],
        icon: 'Postcard',
        children: [
          {
            path: '/prepaid/quotaCard/product',
            title: '商品管理',
            permission: ['quotaCardProduct', 'quotaCardProductList'],
          },
          {
            path: '/prepaid/quotaCard/order',
            title: '订单管理',
            permission: ['quotaCardOrder', 'quotaCardOrderList'],
          },
          {
            path: '/prepaid/quotaCard/priceRule',
            title: '计价规则管理',
            permission: ['quotaCardPriceRule', 'quotaCardPriceRuleList'],
          },
          {
            path: '/prepaid/quotaCard/couponBar',
            title: '调价券包管理',
            permission: ['quotaCardCouponBar', 'quotaCardCouponBarList'],
          },
        ],
      },
    ],
  },
  // {
  //   path: '/rights',
  //   title: '优惠商城',
  //   icon: 'Goods',
  //   order: 3,
  //   permission: [],
  //   children: [],
  // },
  // {
  //   path: '/integral',
  //   title: '积分商城',
  //   icon: 'Coin',
  //   order: 4,
  //   permission: [],
  //   children: [],
  // },
] as MenuItem[];
