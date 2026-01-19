/* 育龙活动配置mock */
import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../../_utils';

export default [
  {
    url: '/activity-web-backend/im-activity/web/dragon/dragonActivityDetail1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      id: '123',
      code: '456',
      name: '测试育龙活动',
      model: '1',
      startTime: '2025-01-10',
      cultivateStartTime: '2025-01-15',
      endTime: '2025-01-20',
      targetRate: 0.03,
      excessRate: 3,
      compensateRate: 3,
      compensateIncome: 5,
      status: '1',
    }),
  },
  {
    url: '/activity-web-backend/im-activity/web/dragon/saveDragonActivity1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess(true),
  },
] as MockMethod[];
