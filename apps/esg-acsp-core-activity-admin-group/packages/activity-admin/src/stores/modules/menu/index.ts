import router from '@/router';
import usePermission from '@/hook/usePermission';
import type { HeaderMenuItem, MenuItem } from './types';
import { useSettingsStore, useUserStore } from '@/stores';
import { getMenuTreeAdapter } from '@/stores/modules/menu/adapter';

const useMenuStore = defineStore('menu', () => {
  const menuTree = ref<MenuItem[]>([]);
  const currentEmbeddedUrl = ref<string>('');
  const permission = usePermission();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  let menuInitResolve: (value: unknown) => void;
  const menuInitPromise = new Promise((resolve) => {
    menuInitResolve = resolve;
  });

  const routes = router.options.routes;

  const sideMenuWidthDefault = '180px';
  const sideMenuWidthMinDefault = '48px';

  console.log('router.options.routes', router.options.routes);
  console.log('router.getRoutes', router.getRoutes());

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
      .sort((a, b) => Number(a.order) - Number(b.order));
  };

  const getMenusData = async () => {
    const currentRoleObj = userStore.roleData.find((item) => item.roleCode === userStore.roleCode);

    const baseOn = settingsStore.settings.menu.baseOn;
    console.log('currentRoleObj: ', currentRoleObj);
    let tree: MenuItem[] = [];
    let getMenuTreeFunc = getMenuTreeAdapter(baseOn);
    if (getMenuTreeFunc) {
      tree = await getMenuTreeFunc(routes, userStore.roleCode, currentRoleObj?.baspRoleMenus);
      menuTree.value = filterSortMenus(tree);
      menuInitResolve(undefined);
    }
  };

  // 顶部菜单激活
  const activedIndex = ref<number>(0);
  // 修改激活菜单
  const changeActivedIndex = (data: number | string) => {
    if (typeof data === 'number') {
      activedIndex.value = data;
    } else {
      // 一级路由地址
      const targetFirstPath = `/${data.split('/')[1]}/`;
      // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
      const findIndex = menuTree.value.findIndex((item) => {
        if (`${item.path}/` === targetFirstPath) {
          return true;
        }
        return (item.children || []).some((r) => targetFirstPath.indexOf(`${r.path}/`) === 0 || data === r.path);
      });
      if (findIndex >= 0) {
        activedIndex.value = findIndex;
      }
    }
  };
  // 顶部菜单
  const headerMenus = computed<HeaderMenuItem[]>(() => {
    if (menuTree.value.length === 0) return [];
    const returnMenus: HeaderMenuItem[] = [];
    const currentRoleObj = userStore.roleData.find((item) => item.roleCode === userStore.roleCode);
    const findJumpUrl = (menuItem: MenuItem): string => {
      if (menuItem.children && menuItem.children.length > 0) {
        const targetItem = menuItem.children.find(
          (menuItem) => menuItem.permission?.some((item) => item && currentRoleObj?.permissions.includes(item)),
        );
        if (targetItem) {
          const result = findJumpUrl(targetItem);
          return result ? result : menuItem.path;
        }
        const child = menuItem.children[0];
        return child.children?.[0]?.path ? child.children[0].path : child.path;
      }
      return menuItem.path;
    };
    menuTree.value.forEach((menuItem, index) => {
      returnMenus.push({
        ...menuItem,
        children: [],
        jumpUrl: findJumpUrl(menuItem),
      });
    });
    return returnMenus;
  });

  // 侧边菜单
  const sideMenus = computed<MenuItem[]>(() => {
    if (menuTree.value.length === 0) return [];
    return menuTree.value[activedIndex.value]?.children || [];
  });

  const showSidebarMenu = computed<Boolean>(() => {
    return !settingsStore.settings.hiddenAsideMenu && sideMenus.value.length > 0;
  });

  /**
   * 侧边栏是否打开
   */
  const asideMenuOpen = ref(true);

  /**
   * 打开关闭侧边栏
   */
  const toggleAsideMenu = () => {
    asideMenuOpen.value = !asideMenuOpen.value;
  };

  // 侧边菜单宽度
  const sideMenuWidth = computed(() => {
    if (!showSidebarMenu.value) {
      return '0px';
    }
    return asideMenuOpen.value ? sideMenuWidthDefault : sideMenuWidthMinDefault;
  });

  watch(
    [
      () => settingsStore.settings.menu.baseOn,
      () => userStore.roleData,
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
    headerMenus,
    activedIndex,
    sideMenus,
    asideMenuOpen,
    showSidebarMenu,
    sideMenuWidth,
    currentEmbeddedUrl,
    menuInitPromise,
    toggleAsideMenu,
    changeActivedIndex,
    getMenusData,
  };
});

export default useMenuStore;
