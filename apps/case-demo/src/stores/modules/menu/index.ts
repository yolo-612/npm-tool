import router from '@/router';
import usePermission from '@/hook/usePermission';
import type { MenuItem } from './types';
import { useSettingsStore, useUserStore } from '@/stores';
import { getMenuTreeAdapter } from '@/stores/modules/menu/adapter';

const useMenuStore = defineStore('menu', () => {
  /**
   * 完整的导航数据
   */
  const menuTree = ref<MenuItem[]>([]);
  const permission = usePermission();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();

  const sideMenuWidthDefault = '180px'
  const sideMenuWidthMinDefault = '48px'
  const topHeaderHeightDefault = '48px'

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

  /**
   * 主导航菜单激活索引
   */
  const activedIndex = ref(0)

  /**
   * 设置主导航
   */
  function setActived(data: number | string) {
    console.log("setActived",data)
    if (typeof data === 'number') {
      // 如果是 number 类型，则认为是主导航的索引
      activedIndex.value = data
    } else {
      // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
      const findIndex = menuTree.value.findIndex(item => {
        if(item.path === data){
          return true
        }
        return (item.children || []).some(r => data.indexOf(`${r.path}/`) === 0 || data === r.path)
      })
      if (findIndex >= 0) {
        activedIndex.value = findIndex
      }
    }
  }

  /**
   * 顶部导航菜单
   */
  const headerMenus = computed<MenuItem[]>(() => {
    if(menuTree.value.length === 0) return []
    if(settingsStore.settings.menu.menuMode === 'side') return []

    if(settingsStore.settings.menu.menuMode === 'head'){
      return menuTree.value
    }

    const returnMenus: MenuItem[] = []
    menuTree.value.forEach((menuItem,index) => {
      returnMenus.push({...menuItem});
      returnMenus[index].children = []
    });

    return returnMenus
  })

  /**
   * 侧边栏导航菜单
   */
  const sideMenus = computed<MenuItem[]>(() => {
    if(menuTree.value.length === 0) return []
    if(settingsStore.settings.menu.menuMode === 'head') return []

    if(settingsStore.settings.menu.menuMode === 'side'){
      return menuTree.value
    }

    return menuTree.value[activedIndex.value].children || []
  })

  /**
   * 顶部header高度
   */
  const topHeaderHeight = computed(() => {
    return settingsStore.settings.hiddenTopHeader ? '0px' : topHeaderHeightDefault;
  });

  /**
   * 侧边栏是否打开
   */
  const asideMenuOpen = ref(true);

  /**
   * 侧边栏是否显示
   */
  const showSidebarMenu = computed(() => {
    if(settingsStore.settings.menu.menuMode === 'head'){
      return false;
    }
    return !(settingsStore.settings.menu.menuMode === 'head-side' && sideMenus.value.length === 0);
  });

  /**
   * 侧边栏宽度
   */
  const sideMenuWidth = computed(() => {
    if(!showSidebarMenu.value){
      return '0px';
    }
    return asideMenuOpen.value ? sideMenuWidthDefault : sideMenuWidthMinDefault;
  });

  /**
   * 打开关闭侧边栏
   */
  const toggleAsideMenu = () => {
    asideMenuOpen.value = !asideMenuOpen.value;
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
    sideMenus,
    headerMenus,
    activedIndex,
    topHeaderHeight,
    sideMenuWidth,
    asideMenuOpen,
    showSidebarMenu,
    sideMenuWidthDefault,
    toggleAsideMenu,
    getMenusData,
    setActived,
  };
});

export default useMenuStore;
