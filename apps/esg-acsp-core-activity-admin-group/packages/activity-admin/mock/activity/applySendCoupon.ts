import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/activity-web-backend/im-activity/web/coupon/equityrecord/selectValidRange1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      pageNum: 1,
      pageSize: 20,
      totalSize: 5,
      list: [
        {
          type: 0,
          id: '755Y',
          label: '深圳区',
          children: [
            {
              type: 1,
              id: '755PHM',
              label: '平湖片区',
              children: [
                {
                  type: 2,
                  id: '755HJ',
                  label: '金稻田速运业务部',
                  children: undefined,
                },
              ],
            },
          ],
        },
      ],

    }),
  },
  {
    url: '/activity-web-backend/im-activity/web/coupon/equityrecord/selectValidRange2',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      pageNum: 1,
      pageSize: 20,
      totalSize: 5,
      list: [
        {
          type: 0,
          currentDeptCode: '755Y',
          currentDeptName: '深圳区',
        },
        {
          type: 1,
          currentDeptCode: '755PHM',
          currentDeptName: '平湖片区',
        },
        {
          type: 2,
          currentDeptCode: '755HJ',
          currentDeptName: '金稻田速运业务部',
        },
      ],

    }),
  },
] as MockMethod[];
