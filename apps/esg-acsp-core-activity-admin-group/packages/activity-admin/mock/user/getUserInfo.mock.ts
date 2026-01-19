import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/app/web/user/info',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess({
        empCode: '01406089a',
      });
    },
  },
] as MockMethod[];
