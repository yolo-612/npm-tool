import { resultSuccess } from '../_utils';
import { defineFakeRoute } from "vite-plugin-fake-server/client";

const rolesInfo = [
  {
    "roleId": "1000031746",
    "roleCode": "manage",
    "roleName": "管理员",
    "isDefaultRole": "0",
    "moduleId": null,
    "moduleCode": null,
    "moduleName": null,
    "moduleIcon": null,
    "moduleType": null,
    "parentId": null,
    "sort": null,
    "subsysCode": "rbac",
    "hidden": null,
    "helpUrl": null,
    "checkStatus": null,
    "childModules": []
  },
  {
    "roleId": "1000031749",
    "roleCode": "customer",
    "roleName": "客服",
    "isDefaultRole": "0",
    "moduleId": null,
    "moduleCode": null,
    "moduleName": null,
    "moduleIcon": null,
    "moduleType": null,
    "parentId": null,
    "sort": null,
    "subsysCode": "rbac",
    "hidden": null,
    "helpUrl": null,
    "checkStatus": null,
    "childModules": []
  },
];
export default defineFakeRoute([
  {
    url: '/web/query/roleInfo',
    timeout: 10,
    method: 'post',
    response: () => {
      return resultSuccess(rolesInfo);
    },
  },
])
