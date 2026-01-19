import permission from './permission';
import permissionAll from './permission-all';

export default {
  install(Vue: any) {
    Vue.directive('permission', permission);
    Vue.directive('permission-all', permissionAll);
  },
};
