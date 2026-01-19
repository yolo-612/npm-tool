import router from '@/router';
import useTabBarStore, { formatTag } from '@/stores/modules/tab-bar';

export default function useMainPage() {
  /** 清掉缓存后再加上 解决缓存页面重载后没有拉数据问题  */
  function refreshCache():Function {
    const tabBarStore = useTabBarStore();
    const route = router.currentRoute.value;
    const hasCache = tabBarStore.getCacheTabList?.includes(route.fullPath);
    if (!hasCache) return () => {};
    tabBarStore.deleteCache(formatTag(route));
    return () => tabBarStore.addCache(route.fullPath);
  }

  async function reload() {
    const action = refreshCache();
    await router.push({
      name: 'reload',
    });
    action();
  }

  return {
    reload,
  };
}
