import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/activity-web-backend/im-activity/web/staff/promotion/search1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      pageNum: 1,
      pageSize: 20,
      totalSize: 8,
      list: [
        {
          id: 'id1', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 0, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id2', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 1, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id3', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 2, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id4', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 0, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id5', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 2, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id6', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 1, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id7', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 1, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
        {
          id: 'id8', // 主键
          month: '2024-1', // 线索月份
          phone: 'phone', // 加密手机号
          customerName: 'customerName', // 客户名称
          empCode: 'empCode', // 小哥工号
          empName: 'empName', // 小哥名称
          state: 1, // 线索状态
          areaCode: 'areaCode', // 小哥区域编码
          divisionCode: 'divisionCode', // 小哥分部编码
          deptCode: 'deptCode', // 小哥网点编码
        },
      ],
    }),
  },
  {
    url: '/activity-web-backend/pmp-reward/web/operation/promotion/changeOperationDetail1',
    timeout: 200,
    method: 'post',
    response: () => {
      const totalSize = 28;
      const list = [...new Array(20).keys()].map((num) => ({
        id: num + 1,
        previousEmpCode: `previousEmpCode${num + 1}`,
        modifiedEmpCode: 'modifiedEmpCode',
        operatorEmpCode: 'operatorEmpCode',
        operateTime: 'operateTime',
      }));
      return resultSuccess({
        totalSize,
        list,
      });
    },
  },
] as MockMethod[];
