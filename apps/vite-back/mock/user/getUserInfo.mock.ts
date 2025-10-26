import { resultSuccess } from '../_utils';
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: '/web/user/info',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess({
        empCode: 'yolo',
      });
    },
  },
]);
