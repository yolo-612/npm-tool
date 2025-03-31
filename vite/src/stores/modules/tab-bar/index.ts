
// TODO：pinia持久化
import type { RouteLocationNormalized } from 'vue-router';
import { INDEX_ROUTE, NOT_FOUND_ROUTE, RELOAD_ROUTE } from '@/router/base';
import type { TabProps } from './types';
import globalSettings from '@/settings';


const formatTag = (route: RouteLocationNormalized) : TabProps => {
  const {
    name, meta, fullPath, query,
  } = route;
  return {
    title: meta.title || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache,
  };
};

// 默认固定tab
const DEFAULT_ROUTE: TabProps = {
  title: '工作台',
  name: 'workplace',
  fullPath: '/dashboard/workplace',
};

const BAN_LIST = [INDEX_ROUTE.name, NOT_FOUND_ROUTE.name, RELOAD_ROUTE.name];


const useTabBarStore = defineStore('tabBar', () => {
  const cacheTabList = reactive(new Set([DEFAULT_ROUTE.name]));
  const tagList = ref([DEFAULT_ROUTE]);

  const getCacheTabList = computed(() => Array.from(cacheTabList));

  function updateTabList(route: RouteLocationNormalized) {
    if (BAN_LIST.includes(route.name)) return;

    if (route.meta.noAffix || route.meta.isLink || tagList.value.some((tag) => tag.name === route.name)) {
      return;
    }

    tagList.value.push(formatTag(route));
    if (!route.meta.ignoreCache) {
      cacheTabList.add(route.name);
    }
  }

  function deleteTag(idx: number, tag: TabProps) {
    tagList.value.splice(idx, 1);
    cacheTabList.delete(tag.name);
  }
  
  return {
    tagList,
    getCacheTabList,
    updateTabList,
    deleteTag
  };
}, {
  persist: globalSettings.ignoreTabBarPersistent ? false : {
    storage: sessionStorage,
  },
})

export default useTabBarStore