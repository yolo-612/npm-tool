import type { RouteMeta } from 'vue-router';
import { useUserStore, useSettingsStore } from '@/stores';

const hasPermission = (permission: any) => {
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();

  if (!settingsStore.settings.enablePermission) {
    // 不开启权限校验
    return true;
  }

  if (typeof permission === 'string') {
    return userStore.permissions.includes(permission) || userStore.roles.includes(permission);
  } else if (permission instanceof RegExp) {
    return userStore.permissions.some((value) => permission.test(value));
  } else {
    return false;
  }
};

const usePermission = () => {
  const checkPermission = (value: (string | RegExp)[]): boolean => {
    if (!Array.isArray(value)) {
      throw new Error(`权限参数需要传数组格式! 例如 v-permission="['operation.create']"
      value=${value}
      `);
    }

    if (value.includes('*') || value.length === 0) {
      return true;
    }

    return value.some((value) => hasPermission(value));
  };

  const checkPermissionAll = (value: (string | RegExp)[]) => {
    if (!Array.isArray(value)) {
      throw new Error(`权限参数需要传数组格式! 例如 v-permission="['operation.create']"
      value=${value}
      `);
    }

    if (value.includes('*') || value.length === 0) {
      return true;
    }

    return value.length > 0 ? value.every((item) => hasPermission(item)) : true;
  };

  const checkRoutePermission = (meta: RouteMeta) => {
    if (!meta.permission) {
      return true;
    }

    return checkPermission(meta.permission);
  };

  return {
    checkPermission,
    checkPermissionAll,
    checkRoutePermission,
  };
};

export default usePermission;
