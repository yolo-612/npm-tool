import router from '@/router';
import usePermission from '@/hook/usePermission';
import type { MenuItem } from './types';
import { useSettingsStore, useUserStore } from '@/stores';
import { getMenuTreeAdapter } from '@/stores/modules/menu/adapter';

const useMenuStore = defineStore('menu', () => {
  const menuTree = ref<MenuItem[]>([]);
  const permission = usePermission();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();

  const routes = router.options.routes;

  console.log('router.options.routes', router.options.routes);
  console.log('router.getRoutes', router.getRoutes());

  // 过滤权限+排序
  const filterSortMenus = (menus: MenuItem[] | undefined): MenuItem[] => {
    if (!menus || menus.length === 0) return [];

    return menus
      .filter((menuItem) => {
        if (!menuItem.permission) return true;
        return permission.checkPermission(menuItem.permission);
      })
      .map((menuItem) => {
        return {
          ...menuItem,
          children: filterSortMenus(menuItem.children),
        };
      })
      .sort((a, b) => Number(b.order) - Number(a.order));
  };

  const getMenusData = async () => {
    const baseOn = settingsStore.settings.menu.baseOn;
    let tree: MenuItem[] = [];
    let getMenuTreeFunc = getMenuTreeAdapter(baseOn);
    if (getMenuTreeFunc) {
      tree = await getMenuTreeFunc(routes);
      menuTree.value = filterSortMenus(tree);
    }
  };

  watch(
    [
      () => settingsStore.settings.menu.baseOn,
      () => userStore.roleCode,
    ],
    () => {
      getMenusData().catch((err) => {
        console.log(err);
      });
    },
    { immediate: true },
  );

  return {
    menuTree,
    getMenusData,
  };
});

export default useMenuStore;
