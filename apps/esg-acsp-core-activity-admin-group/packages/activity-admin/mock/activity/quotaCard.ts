/* 额度卡 */
import type { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess } from '../_utils';

const order = [
  {
    url: '/activity-web-backend/pmp-store/web/quota/quotaOrderList1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      pageNum: 1,
      pageSize: 20,
      totalSize: 5,
      list: [
        {
          /** 订单编码 */
          orderNo: 'orderNo1',
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 下单月结卡号 */
          monthCard: '7558117474',
          /** 状态描述 */
          statusDesc: '已完成',
          /* 状态 */
          status: '1',
          /** 商品编码 */
          goodsCode: 'goodsCode',
        },
        {
          /** 订单编码 */
          orderNo: 'orderNo2',
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 下单月结卡号 */
          monthCard: '7558117474',
          /** 状态描述 */
          statusDesc: '已完成',
          /* 状态 */
          status: '1',
          /** 商品编码 */
          goodsCode: 'goodsCode',
        },
        {
          /** 订单编码 */
          orderNo: 'orderNo3',
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 下单月结卡号 */
          monthCard: '7558117474',
          /** 状态描述 */
          statusDesc: '已完成',
          /* 状态 */
          status: '1',
          /** 商品编码 */
          goodsCode: 'goodsCode',
        },
        {
          /** 订单编码 */
          orderNo: 'orderNo4',
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 下单月结卡号 */
          monthCard: '7558117474',
          /** 状态描述 */
          statusDesc: '已完成',
          /* 状态 */
          status: '1',
          /** 商品编码 */
          goodsCode: 'goodsCode',
        },
        {
          /** 订单编码 */
          orderNo: 'orderNo5',
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 下单月结卡号 */
          monthCard: '7558117474',
          /** 状态描述 */
          statusDesc: '已完成',
          /* 状态 */
          status: '1',
          /** 商品编码 */
          goodsCode: 'goodsCode',
        },
      ],
    }),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/orderDetail',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      /** 订单编码 */
      orderNo: 'orderNo',
      /** 下单月结卡号 */
      monthCard: 'monthCard',
      /** 下单客户名称 */
      customerName: 'customerName',
      /** 订单金额 单位/元 */
      amount: 'amount',
      /** 状态描述 */
      statusDesc: 'statusDesc',
      /** 下单时间 */
      createTime: 'createTime',
      /** 支付时间 */
      payTime: 'payTime',
      /* 商品信息 */
      goodsInfo: [
        {
          /** 额度卡名称 */
          name: 'name',
          /** 额度卡编码 */
          goodsCode: 'goodsCode',
          /** 商品价格 单位/元 */
          goodsPrice: 'goodsPrice',
          /** 商品数量 */
          goodsNum: 'goodsNum',
        },
      ],
    }),
  },
];

const config = [
  {
    url: '/activity-web-backend/pmp-store/web/quota/config/list1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      pageNum: 1,
      pageSize: 20,
      totalSize: 5,
      list: [
        {
          /** 计价规则编码 */
          code: 'code1',
          /** 计价规则名称 */
          name: 'name1',
          /** 计价规则状态 ON-启用 OFF-禁用 */
          status: '0',
          /** 状态描述 */
          statusDesc: '待启用',
          /** 主产品类型 */
          mainProductType: 'mainProductType',
          /** 子产品类型 */
          subProductType: 'subProductType',
          /** 额度 单位/元 */
          quota: 123,
          /** 生效日 */
          validTimeStart: 'validTimeStart',
          /** 失效日 */
          validTimeEnd: 'validTimeEnd',
          /** 创建时间 */
          createTime: 'createTime',
          /** 创建人工号 */
          creator: 'creator',
        },
        {
          /** 计价规则编码 */
          code: 'code2',
          /** 计价规则名称 */
          name: 'name1',
          /** 计价规则状态 ON-启用 OFF-禁用 */
          status: '1',
          /** 状态描述 */
          statusDesc: '启用中',
          /** 主产品类型 */
          mainProductType: 'mainProductType',
          /** 子产品类型 */
          subProductType: 'subProductType',
          /** 额度 单位/元 */
          quota: 123,
          /** 生效日 */
          validTimeStart: 'validTimeStart',
          /** 失效日 */
          validTimeEnd: 'validTimeEnd',
          /** 创建时间 */
          createTime: 'createTime',
          /** 创建人工号 */
          creator: 'creator',
        },
        {
          /** 计价规则编码 */
          code: 'code3',
          /** 计价规则名称 */
          name: 'name1',
          /** 计价规则状态 ON-启用 OFF-禁用 */
          status: '2',
          /** 状态描述 */
          statusDesc: '已失效',
          /** 主产品类型 */
          mainProductType: 'mainProductType',
          /** 子产品类型 */
          subProductType: 'subProductType',
          /** 额度 单位/元 */
          quota: 123,
          /** 生效日 */
          validTimeStart: 'validTimeStart',
          /** 失效日 */
          validTimeEnd: 'validTimeEnd',
          /** 创建时间 */
          createTime: 'createTime',
          /** 创建人工号 */
          creator: 'creator',
        },
        {
          /** 计价规则编码 */
          code: 'code4',
          /** 计价规则名称 */
          name: 'name1',
          /** 计价规则状态 ON-启用 OFF-禁用 */
          status: 'ON',
          /** 状态描述 */
          statusDesc: '启用',
          /** 主产品类型 */
          mainProductType: 'mainProductType',
          /** 子产品类型 */
          subProductType: 'subProductType',
          /** 额度 单位/元 */
          quota: 123,
          /** 生效日 */
          validTimeStart: 'validTimeStart',
          /** 失效日 */
          validTimeEnd: 'validTimeEnd',
          /** 创建时间 */
          createTime: 'createTime',
          /** 创建人工号 */
          creator: 'creator',
        },
        {
          /** 计价规则编码 */
          code: 'code5',
          /** 计价规则名称 */
          name: 'name1',
          /** 计价规则状态 ON-启用 OFF-禁用 */
          status: 'ON',
          /** 状态描述 */
          statusDesc: '启用',
          /** 主产品类型 */
          mainProductType: 'mainProductType',
          /** 子产品类型 */
          subProductType: 'subProductType',
          /** 额度 单位/元 */
          quota: 123,
          /** 生效日 */
          validTimeStart: 'validTimeStart',
          /** 失效日 */
          validTimeEnd: 'validTimeEnd',
          /** 创建时间 */
          createTime: 'createTime',
          /** 创建人工号 */
          creator: 'creator',
        },
      ],
    }),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/config/detail1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      /** 计价规则id */
      id: '111',
      /** 计价规则编码 */
      code: 'code',
      /** 计价规则名称 */
      name: '计价规则名称',
      /** 主产品类型 */
      mainProductType: 'mainProductType',
      /** 子产品类型 */
      subProductType: 'subProductType',
      /** 额度 单位/元 */
      quota: 1,
      /** 额度 单位/元 */
      discount: 1,
      /** 生效日 */
      validTimeStart: '2024-10-21',
      /** 失效日 */
      validTimeEnd: '2023-11-14',
    }),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/config/save1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess(true),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/config/productTypeList',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess([
      {
        productTypeName: 'productTypeName1',
        limitTypeCode: 'limitTypeCode1',
        cargoTypeCode: 'cargoTypeCode1',
        expressTypeCode: 'expressTypeCode1',
        productCode: 'productCode1',
        productCodeChild: 'productCodeChild1',
      },
      {
        productTypeName: 'productTypeName2',
        limitTypeCode: 'limitTypeCode1',
        cargoTypeCode: 'cargoTypeCode1',
        expressTypeCode: 'expressTypeCode1',
        productCode: 'productCode1',
        productCodeChild: 'productCodeChild2',
      },
      {
        productTypeName: 'productTypeName3',
        limitTypeCode: 'limitTypeCode1',
        cargoTypeCode: 'cargoTypeCode1',
        expressTypeCode: 'expressTypeCode1',
        productCode: 'productCode2',
        productCodeChild: 'productCodeChild3',
      },
      {
        productTypeName: 'productTypeName4',
        limitTypeCode: 'limitTypeCode1',
        cargoTypeCode: 'cargoTypeCode1',
        expressTypeCode: 'expressTypeCode1',
        productCode: 'productCode2',
        productCodeChild: 'productCodeChild4',
      },
    ]),
  },
];

const coupon = [
  {
    url: '/activity-web-backend/pmp-store/web/quota/coupon/getList1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      pageNum: 1,
      pageSize: 20,
      totalSize: 5,
      list: [
        {
          /** 状态 */
          status: '0',
          /** 券包编码 */
          equityCode: 'equityCode',
          /** 券包名称 */
          equityName: 'equityName',
          /** 创建人 */
          creator: 'creator',
          /** 创建时间开始 */
          createTime: 'createTime',
          /** 创建时间结束 */
          createTimeEnd: 'createTimeEnd',
          /** 生效日期 */
          validDate: 'validDate',
          /** 失效日期 */
          invalidDate: 'invalidDate',
        },
        {
          /** 状态 */
          status: '1',
          /** 券包编码 */
          equityCode: 'equityCode',
          /** 券包名称 */
          equityName: 'equityName',
          /** 创建人 */
          creator: 'creator',
          /** 创建时间开始 */
          createTime: 'createTime',
          /** 创建时间结束 */
          createTimeEnd: 'createTimeEnd',
          /** 生效日期 */
          validDate: 'validDate',
          /** 失效日期 */
          invalidDate: 'invalidDate',
        },
        {
          /** 状态 */
          status: '2',
          /** 券包编码 */
          equityCode: 'equityCode',
          /** 券包名称 */
          equityName: 'equityName',
          /** 创建人 */
          creator: 'creator',
          /** 创建时间开始 */
          createTime: 'createTime',
          /** 创建时间结束 */
          createTimeEnd: 'createTimeEnd',
          /** 生效日期 */
          validDate: 'validDate',
          /** 失效日期 */
          invalidDate: 'invalidDate',
        },
        {
          /** 状态 */
          status: '0',
          /** 券包编码 */
          equityCode: 'equityCode',
          /** 券包名称 */
          equityName: 'equityName',
          /** 创建人 */
          creator: 'creator',
          /** 创建时间开始 */
          createTime: 'createTime',
          /** 创建时间结束 */
          createTimeEnd: 'createTimeEnd',
          /** 生效日期 */
          validDate: 'validDate',
          /** 失效日期 */
          invalidDate: 'invalidDate',
        },
        {
          /** 状态 */
          status: '0',
          /** 券包编码 */
          equityCode: 'equityCode',
          /** 券包名称 */
          equityName: 'equityName',
          /** 创建人 */
          creator: 'creator',
          /** 创建时间开始 */
          createTime: 'createTime',
          /** 创建时间结束 */
          createTimeEnd: 'createTimeEnd',
          /** 生效日期 */
          validDate: 'validDate',
          /** 失效日期 */
          invalidDate: 'invalidDate',
        },
      ],
    }),
  },
];

const product = [
  {
    url: '/activity-web-backend/pmp-store/web/quota/list',
    timeout: 200,
    method: 'post',
    response: (data: any) => {
      // 仓库中
      const IN_STORE_LIST = [
        {
          /** 商品编码 */
          goodsCode: '000001',
          /** 商品名称 */
          name: '商品名称1',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度 单位/元 */
          quotaAmount: 20,
          /** 库存 */
          stock: 20,
          /** 销量数量 */
          saleCounts: 20,
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000002',
          /** 商品名称 */
          name: '商品名称2',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度 单位/元 */
          quotaAmount: 30,
          /** 库存 */
          stock: 50,
          /** 销量数量 */
          saleCounts: 60,
          /** 下单时间 */
          createTime: '2024-05-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000003',
          /** 商品名称 */
          name: '商品名称3',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度 单位/元 */
          quotaAmount: 40,
          /** 库存 */
          stock: 70,
          /** 销量数量 */
          saleCounts: 80,
          /** 下单时间 */
          createTime: '2024-06-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000004',
          /** 商品名称 */
          name: '商品名称4',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度 单位/元 */
          quotaAmount: 50,
          /** 库存 */
          stock: 90,
          /** 销量数量 */
          saleCounts: 100,
          /** 下单时间 */
          createTime: '2024-07-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000005',
          /** 商品名称 */
          name: '商品名称5',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度 单位/元 */
          quotaAmount: 60,
          /** 库存 */
          stock: 110,
          /** 销量数量 */
          saleCounts: 120,
          /** 下单时间 */
          createTime: '2024-08-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000006',
          /** 商品名称 */
          name: '商品名称6',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度 单位/元 */
          quotaAmount: 70,
          /** 库存 */
          stock: 130,
          /** 销量数量 */
          saleCounts: 140,
          /** 下单时间 */
          createTime: '2024-09-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000007',
          /** 商品名称 */
          name: '商品名称7',
          /** 商品状态 */
          status: 'IN_STORE',
          /** 商品状态描述 */
          statusDesc: '仓库中',
          /** 额度单位/元 */
          quotaAmount: 80,
          /** 库存 */
          stock: 150,
          /** 销量数量 */
          saleCounts: 160,
          /** 下单时间 */
          createTime: '2024-10-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
      ];
      // 售卖中
      const SELLING_LIST = [
        {
          /** 商品编码 */
          goodsCode: '000011',
          /** 商品名称 */
          name: '商品名称1',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度 单位/元 */
          quotaAmount: 20,
          /** 库存 */
          stock: 20,
          /** 销量数量 */
          saleCounts: 20,
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000012',
          /** 商品名称 */
          name: '商品名称2',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度 单位/元 */
          quotaAmount: 30,
          /** 库存 */
          stock: 50,
          /** 销量数量 */
          saleCounts: 60,
          /** 下单时间 */
          createTime: '2024-05-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000013',
          /** 商品名称 */
          name: '商品名称3',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度 单位/元 */
          quotaAmount: 40,
          /** 库存 */
          stock: 70,
          /** 销量数量 */
          saleCounts: 80,
          /** 下单时间 */
          createTime: '2024-06-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000014',
          /** 商品名称 */
          name: '商品名称4',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度 单位/元 */
          quotaAmount: 50,
          /** 库存 */
          stock: 90,
          /** 销量数量 */
          saleCounts: 100,
          /** 下单时间 */
          createTime: '2024-07-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000015',
          /** 商品名称 */
          name: '商品名称5',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度 单位/元 */
          quotaAmount: 60,
          /** 库存 */
          stock: 110,
          /** 销量数量 */
          saleCounts: 120,
          /** 下单时间 */
          createTime: '2024-08-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000016',
          /** 商品名称 */
          name: '商品名称6',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度 单位/元 */
          quotaAmount: 70,
          /** 库存 */
          stock: 130,
          /** 销量数量 */
          saleCounts: 140,
          /** 下单时间 */
          createTime: '2024-09-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000017',
          /** 商品名称 */
          name: '商品名称7',
          /** 商品状态 */
          status: 'SELLING',
          /** 商品状态描述 */
          statusDesc: '售卖中',
          /** 额度单位/元 */
          quotaAmount: 80,
          /** 库存 */
          stock: 150,
          /** 销量数量 */
          saleCounts: 160,
          /** 下单时间 */
          createTime: '2024-10-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
      ];
      // 已售罄
      const SELL_OUT_LIST = [
        {
          /** 商品编码 */
          goodsCode: '000021',
          /** 商品名称 */
          name: '商品名称1',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度 单位/元 */
          quotaAmount: 20,
          /** 库存 */
          stock: 20,
          /** 销量数量 */
          saleCounts: 20,
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000022',
          /** 商品名称 */
          name: '商品名称2',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度 单位/元 */
          quotaAmount: 30,
          /** 库存 */
          stock: 50,
          /** 销量数量 */
          saleCounts: 60,
          /** 下单时间 */
          createTime: '2024-05-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000023',
          /** 商品名称 */
          name: '商品名称3',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度 单位/元 */
          quotaAmount: 40,
          /** 库存 */
          stock: 70,
          /** 销量数量 */
          saleCounts: 80,
          /** 下单时间 */
          createTime: '2024-06-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000024',
          /** 商品名称 */
          name: '商品名称4',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度 单位/元 */
          quotaAmount: 50,
          /** 库存 */
          stock: 90,
          /** 销量数量 */
          saleCounts: 100,
          /** 下单时间 */
          createTime: '2024-07-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000025',
          /** 商品名称 */
          name: '商品名称5',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度 单位/元 */
          quotaAmount: 60,
          /** 库存 */
          stock: 110,
          /** 销量数量 */
          saleCounts: 120,
          /** 下单时间 */
          createTime: '2024-08-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000026',
          /** 商品名称 */
          name: '商品名称6',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度 单位/元 */
          quotaAmount: 70,
          /** 库存 */
          stock: 130,
          /** 销量数量 */
          saleCounts: 140,
          /** 下单时间 */
          createTime: '2024-09-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000027',
          /** 商品名称 */
          name: '商品名称7',
          /** 商品状态 */
          status: 'SELL_OUT',
          /** 商品状态描述 */
          statusDesc: '已售罄',
          /** 额度单位/元 */
          quotaAmount: 80,
          /** 库存 */
          stock: 150,
          /** 销量数量 */
          saleCounts: 160,
          /** 下单时间 */
          createTime: '2024-10-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
      ];
      // 已失效
      const INVALID_LIST = [
        {
          /** 商品编码 */
          goodsCode: '000031',
          /** 商品名称 */
          name: '商品名称1',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度 单位/元 */
          quotaAmount: 20,
          /** 库存 */
          stock: 20,
          /** 销量数量 */
          saleCounts: 20,
          /** 下单时间 */
          createTime: '2024-04-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000032',
          /** 商品名称 */
          name: '商品名称2',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度 单位/元 */
          quotaAmount: 30,
          /** 库存 */
          stock: 50,
          /** 销量数量 */
          saleCounts: 60,
          /** 下单时间 */
          createTime: '2024-05-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000033',
          /** 商品名称 */
          name: '商品名称3',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度 单位/元 */
          quotaAmount: 40,
          /** 库存 */
          stock: 70,
          /** 销量数量 */
          saleCounts: 80,
          /** 下单时间 */
          createTime: '2024-06-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000034',
          /** 商品名称 */
          name: '商品名称4',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度 单位/元 */
          quotaAmount: 50,
          /** 库存 */
          stock: 90,
          /** 销量数量 */
          saleCounts: 100,
          /** 下单时间 */
          createTime: '2024-07-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000035',
          /** 商品名称 */
          name: '商品名称5',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度 单位/元 */
          quotaAmount: 60,
          /** 库存 */
          stock: 110,
          /** 销量数量 */
          saleCounts: 120,
          /** 下单时间 */
          createTime: '2024-08-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000036',
          /** 商品名称 */
          name: '商品名称6',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度 单位/元 */
          quotaAmount: 70,
          /** 库存 */
          stock: 130,
          /** 销量数量 */
          saleCounts: 140,
          /** 下单时间 */
          createTime: '2024-09-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
        {
          /** 商品编码 */
          goodsCode: '000037',
          /** 商品名称 */
          name: '商品名称7',
          /** 商品状态 */
          status: 'INVALID',
          /** 商品状态描述 */
          statusDesc: '已失效',
          /** 额度单位/元 */
          quotaAmount: 80,
          /** 库存 */
          stock: 150,
          /** 销量数量 */
          saleCounts: 160,
          /** 下单时间 */
          createTime: '2024-10-18 10:00:00',
          /** 创建人工号 */
          creator: '01421803',
        },
      ];
      const {
        pageNum, pageSize, status, name,
      } = data.body;
      let arr: any = [];
      if (String(status) === '1') {
        arr = [...IN_STORE_LIST];
      } else if (String(status) === '2') {
        arr = [...SELLING_LIST];
      } else if (String(status) === '3') {
        arr = [...SELL_OUT_LIST];
      } else if (String(status) === '4') {
        arr = [...INVALID_LIST];
      } else {
        arr = [...IN_STORE_LIST, ...SELLING_LIST, ...SELL_OUT_LIST, ...INVALID_LIST];
      }

      // 分页+查询;
      const list = arr.filter((item: any) => item.name.includes(name));

      return resultSuccess({
        pageNum: 1,
        pageSize: 20,
        totalSize: list.length,
        list: list.splice((pageNum - 1) * pageSize, pageSize),
      });
    },
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/detail',
    timeout: 200,
    method: 'post',
    response: (data: any) => {
      const goodsCode = data.body?.goodsCode;
      if (goodsCode === '000001') {
        return resultSuccess({
          /** 额度卡名称 */
          name: '额度卡名称1',
          /** 额度卡编码 */
          goodsCode: '000031',
          /** 额度卡额度 */
          quotaAmount: 20,
          /** 状态 */
          status: '生效中',
          /** 库存 */
          stock: 20,
          /** 限购数量 */
          restrictedQuantity: 20,
          /** 备注 */
          remark: '01421803',
          /** 图片地址 */
          imageUrl: 'https://acsp-static.sit.sf-express.com/sfoss/sfosspubilc001/0c00052323104c47ada5badd5c034756.png',
          /** 描述 */
          goods_desc: '商品描述',
          /** 客群集合 */
          intelligenceRespList: [
            {
              intelligenceCode: 'GuestGroupdc2d1977e16f', // 客群编码
              intelligenceName: '20240619-2', // 客群名称
              intelligenceNumber: 20, // 客群人数
            },
          ],
          /** 计价规则 */
          configResp: {
            configName: 'name1', // 计价规则名称
            configCode: 'code1', // 计价规则编码
            mainProductType: 'mainProductType', // 主产品
            subProductType: 'subProductType', // 子产品
            discount: 2, // 折扣
            quota: 123, // 额度
            validTimeStart: 'validTimeStart', // 生效日
            validTimeEnd: 'validTimeEnd', // 失效日
          },
        });
      }
      return resultError({
        errorCode: 500,
        errorMessage: '商品编码不存在',
      });
    },
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/saveOrUpdate',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess(true),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/up',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess(true),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/down',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess(true),
  },
  {
    url: '/activity-web-backend/pmp-store/web/quota/updateStock',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess(true),
  },
];

export default [] as MockMethod[];
