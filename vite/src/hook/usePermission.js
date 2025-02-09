import { useUserStore } from '@/stores';

const hasPermission = (permission) => {
  const userStore = useUserStore();

  if (typeof permission === 'string') {
    return userStore.permissions.includes(permission) || userStore.roles.includes(permission);
  } else if (permission instanceof RegExp) {
    return userStore.permissions.some(value => permission.test(value));
  } else {
    return false;
  }
};

const usePermission = () => {

  const checkPermission = (value) => {
    if (!Array.isArray(value)) {
      throw new Error(`权限参数需要传数组格式! 例如 v-permission="['operation_create']"
      value=${value}
      `);
    }

    if (value.includes('*')) {
      return true;
    }

    return value.some(value => hasPermission(value));
  };

  const checkPermissionAll = (value) => {
    if (!Array.isArray(value)) {
      throw new Error(`权限参数需要传数组格式! 例如 v-permission="['operation_create']"
      value=${value}
      `);
    }

    if (value.includes('*')) {
      return true;
    }

    return value.length > 0 ? value.every(item => hasPermission(item)) : true;
  };

  return {
    checkPermission,
    checkPermissionAll
  };
};

export default usePermission;
