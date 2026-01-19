// activityMock.ts
import type { MockMethod } from 'vite-plugin-mock';
import dayjs from 'dayjs';
import { resultSuccess } from '../_utils';

const INTERFACE_ACTIVITY = '/activity-web-backend/im-activity/web';

/** 活动状态 */
export enum ACTIVITY_STATUS {
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 待启用 */
  UNSTART = 'UNSTART',
  /** 启用中 */
  PROCESSING = 'PROCESSING',
  /** 手动结束 */
  MANUAL_STOP = 'MANUAL_STOP',
  /** 自动结束 */
  END = 'END',
}

/** 审核状态 */
export enum ACTIVITY_APPROVAL_STATUS {
  /** 待提交审核 */
  TO_APPROVE = 'TO_APPROVE',
  /** 审核中 */
  APPROVING = 'APPROVING',
  /** 审核通过 */
  APPROVED = 'APPROVED',
  /** 审核驳回 */
  APPROVE_REJECT = 'APPROVE_REJECT',
}

/** 活动类型 */
export enum ACTIVITY_TYPE {
  /** 线下商机活动 */
  BUSINESS_COLLECTION = 'BUSINESS_COLLECTION',
}

/** 活动状态列表 */
const ACTIVITY_STATUS_LIST = [
  {
    label: '草稿',
    value: ACTIVITY_STATUS.DRAFT,
  },
  {
    label: '待启用',
    value: ACTIVITY_STATUS.UNSTART,
  },
  {
    label: '启用中',
    value: ACTIVITY_STATUS.PROCESSING,
  },
  {
    label: '手动结束',
    value: ACTIVITY_STATUS.MANUAL_STOP,
  },
  {
    label: '已结束',
    value: ACTIVITY_STATUS.END,
  },
];

/** 活动类型列表 */
const ACTIVITY_TYPE_LIST = [
  {
    label: '线下商机活动',
    value: ACTIVITY_TYPE.BUSINESS_COLLECTION,
  },
];

// 随机获取一个状态值
function getRandomStatus(type: 'status' | 'approval' | 'type') {
  if (type === 'status') {
    return ACTIVITY_STATUS_LIST[Math.floor(Math.random() * ACTIVITY_STATUS_LIST.length)].value;
  } else if (type === 'approval') {
    return ACTIVITY_APPROVAL_STATUS.APPROVED;
  } else if (type === 'type') {
    return ACTIVITY_TYPE_LIST[Math.floor(Math.random() * ACTIVITY_TYPE_LIST.length)].value;
  }
}

export default [
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/search1`,
    timeout: 200,
    method: 'post',
    response: () => {
      const totalSize = 28;
      const list = [...new Array(20).keys()].map((num) => ({
        id: `id${num + 1}`, // 主键
        name: `Activity ${num + 1}`, // 活动名称
        code: `ACT20250307000-${num + 1}`, // 活动编号
        activityStatus: getRandomStatus('status'), // 活动状态
        approvalStatus: getRandomStatus('approval'), // 审核状态
        type: getRandomStatus('type'), // 活动类型
        creator: `Creator ${Math.floor(Math.random() * 10)}`, // 创建人
        creatorAreaCode: `AreaCode${Math.floor(Math.random() * 10)}`, // 创建人地区编码
        startTime: dayjs().format('YYYY-MM-DD'), // 活动开始时间
        endTime: dayjs().format('YYYY-MM-DD'), // 活动结束时间
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
      }));
      return resultSuccess({
        pageNum: 1,
        pageSize: 20,
        totalSize,
        list,
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/business/search1`,
    timeout: 200,
    method: 'post',
    response: () => {
      const totalSize = 28;
      const list = [...new Array(20).keys()].map((num) => ({
        customerName: `Customer ${num + 1}`,
        customerPhone: `1380013800${num}`,
        companyName: `Company ${num + 1}`,
        companyAddr: `Address ${num + 1}`,
        companyLayer: `Industry ${(num % 5) + 1}`,
        companySize: `${Math.floor(Math.random() * 1000) + 100} employees`,
        monthCard: `MC${num + 1}`,
        estimatedMonthlyCourierCost: `${Math.floor(Math.random() * 10000) + 1000}`,
        potentialCooperationBusiness: `Business ${(num % 3) + 1}`,
      }));
      return resultSuccess({
        pageNum: 1,
        pageSize: 20,
        totalSize,
        list,
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/result/search1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({
        newMemberCount: Math.floor(Math.random() * 100) + 1, // 随机生成1到100之间的整数
        newClueCount: Math.floor(Math.random() * 50) + 1, // 随机生成1到50之间的整数
        storedValueRevenue: Math.floor(Math.random() * 100000) + 1000, // 随机生成1000到101000之间的整数
        parcelRevenue: Math.floor(Math.random() * 50000) + 500, // 随机生成500到50500之间的整数
        actualCost: Math.floor(Math.random() * 200000) + 2000, // 随机生成2000到202000之间的整数
        summaryFile: `summary_${dayjs().format('YYYYMMDDHHmmss')}.pdf`, // 生成一个带有时间戳的文件名
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/result/saveOrUpdate1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({});
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/creatorAreaCodeSearch1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({
        creatorAreaCode: '001',
        creatorAreaName: '总部活动管理员',
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/saveOrUpdate1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({});
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/saveOrUpdate1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({});
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/template/list1`,
    timeout: 200,
    method: 'post',
    response: (data: any) => {
      const {
        pageNum,
        pageSize,
        templateType,
      } = data.body;
      const list = [
        {
          templateCode: '000001',
          templateName: '默认模板',
          titleImage: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1741069143959_896.jpg',
          isRecommend: 1,
        },
        {
          templateCode: '000002',
          templateName: '圣诞节模板',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/unlock-temp1.171349cf.jpg',
          isRecommend: 0,
        },
        {
          templateCode: '000003',
          templateName: '端午模板',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/cash_gift.32a00042.png',
          isRecommend: 0,
        },
        {
          templateCode: '000004',
          templateName: '中秋节模板',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/dead_freight_demo.8da1a579.jpg',
          isRecommend: 0,
        },
        {
          templateCode: '000005',
          templateName: '国庆节模板',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/cash_back_demo.48637532.png',
          isRecommend: 0,
        },
        {
          templateCode: '000006',
          templateName: '元旦节模板',
          titleImage: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1733818855103_51.png',
          isRecommend: 0,
        },
      ];
      const list1 = [
        {
          templateCode: '100001',
          templateName: '个人模板',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/cash_gift.32a00042.png',
          isRecommend: 0,
        },
        {
          templateCode: '100002',
          templateName: '测试2',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/multi_discount_demo.148430f4.png',
          isRecommend: 0,
        },
        {
          templateCode: '100003',
          templateName: '测试3',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/dead_freight_demo.8da1a579.jpg',
          isRecommend: 0,
        },
        {
          templateCode: '100004',
          templateName: '测试4',
          titleImage: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1733818855103_51.png',
          isRecommend: 0,
        },
        {
          templateCode: '100005',
          templateName: '测试5',
          titleImage: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1741069143959_896.jpg',
          isRecommend: 0,
        },
        {
          templateCode: '100006',
          templateName: '测试6',
          titleImage: 'https://acsp-activity.sit.sf-express.com/activity/static/img/cash_back_demo.48637532.png',
          isRecommend: 0,
        },
      ];
      return resultSuccess({
        pageNum: pageNum,
        pageSize: pageSize,
        totalSize: list.length,
        list: templateType === 0
          ? list.slice((pageNum - 1) * pageSize, pageNum * pageSize) : list1.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/template/detail1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({
        templateJson: '{"templateName":"默认模板","pageTitle":"商机收集","pageBgColor":"rgba(233, 187, 0, 1)","pageBgUrl":"https://acsp-static.sit.sf-express.com/sfoss/sfosspubilc001/a513a2788a6d4f3b8349356369e87d42.png","pageBtnUrl":"https://acsp-static.sit.sf-express.com/sfoss/sfosspubilc001/4947c10766fb437fa3ccce6674e019fa.png","pageRuleText":"<p><strong>一、扫码填写信息说明</strong></p><p>1、用户需使用手机扫描活动现场指定二维码进入信息登记页面；</p><p>2、请完整填写信息。信息提交后不可修改；</p><p>3、每个手机号码仅限提交一次有效信息。</p><p><br></p><p><strong>二、礼品领取规则</strong></p><p>1、礼品发放标准：</p><ul><li>完整填写信息并提交后即可领取礼品</li></ul><p>2、领取须知：</p><ul><li>每人/每公司限领取一次</li><li>礼品数量有限，先到先得</li><li>需现场领取，不支持邮寄</li></ul><p><strong>三、规则变更说明</strong></p><p>1、活动主办方保留根据实际情况调整规则的权力</p><p>2、规则调整不影响已提交用户的既有权益</p>","pageAgreementText":"<p>为进行业务改进，提升服务质量，我们需要收集您的【姓名、电话、公司名称、公司地址、行业】，个人及公司信息可能会用于销售业务开发、定期推送行业资讯和活动优惠，有关我们如何保护您的个人信息，您享有的个人信息主体权利及如何行使您的权利，请参见我们的隐私政策（链接至：https://www.sf-express.com/chn/sc/privacy）。</p>"}',
        agreement: '为进行业务改进，提升服务质量，我们需要收集您的【姓名、电话、公司名称、公司地址、行业】，个人及公司信息可能会用于销售业务开发、定期推送行业资讯和活动优惠，有关我们如何保护您的个人信息，您享有的个人信息主体权利及如何行使您的权利，请参见我们的隐私政策（链接至：https://www.sf-express.com/chn/sc/privacy）。',
        templateName: '默认模板',
        templateCode: '0000001',
        businessType: 'BUSINESS_COLLECTION',
        templateType: 0,
        titleImage: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1741069143959_896.jpg',
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/template/saveOrUpdate1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({
        templateCode: '0000001',
      });
    },
  },
  {
    url: `${INTERFACE_ACTIVITY}/marketing/activity/areaInfoList1`,
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess({
        list: [
          {
            areaCode: '001',
            areaName: '总部活动管理员',
          },
          {
            areaCode: '002',
            areaName: '活动管理员',
          },
        ],
      });
    },
  },
] as MockMethod[];
