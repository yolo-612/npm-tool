import type { RouteLocationNormalized } from 'vue-router';
import { INDEX_ROUTE, NOT_FOUND_ROUTE, RELOAD_ROUTE } from '@/router/base';
import { isString } from '@/utils';
import type { TabProps } from './types';

export const formatTag = (route: RouteLocationNormalized): TabProps => {
  const {
    name, meta, fullPath, query,
  } = route;
  return {
    title: meta.title || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache as boolean,
  };
};

// 默认固定tab
const DEFAULT_ROUTE: TabProps = {
  title: '工作台',
  name: 'workplace',
  fullPath: '/dashboard/workplace',
};

const BAN_LIST = [INDEX_ROUTE.name, NOT_FOUND_ROUTE.name, RELOAD_ROUTE.name];

const useTabBarStore = defineStore(
  'tabBar',
  () => {
    const cacheTabList = reactive(new Set([DEFAULT_ROUTE.name]));
    const tagList = ref<TabProps[]>([DEFAULT_ROUTE]);

    const getCacheTabList = computed(() => Array.from(cacheTabList));

    function updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) return;

      if (route.meta.noAffix || route.meta.isLink || tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
        return;
      }

      tagList.value.push(formatTag(route));
      if (!route.meta.ignoreCache) {
        cacheTabList.add(route.fullPath as string);
      }
    }
    function deleteTag(idx: number, tag: TabProps) {
      tagList.value.splice(idx, 1);
      deleteCache(tag);
    }
    function addCache(name: string) {
      if (isString(name) && name !== '') cacheTabList.add(name);
    }
    function deleteCache(tag: TabProps) {
      cacheTabList.delete(tag.fullPath);
    }
    function freshTabList(tags: TabProps[]) {
      tagList.value = tags;
      cacheTabList.clear();
      // 要先判断ignoreCache
      tagList.value
        .filter((el) => !el.ignoreCache)
        .map((el) => el.fullPath)
        .forEach((x) => cacheTabList.add(x));
    }
    function resetTabList() {
      tagList.value = [DEFAULT_ROUTE];
      cacheTabList.clear();
      cacheTabList.add(DEFAULT_ROUTE.fullPath);
    }

    function closeCurrentTab(route: RouteLocationNormalized) {
      try {
        const idx = tagList.value.findIndex((tag) => tag.fullPath === route.fullPath);
        idx > -1 && deleteTag(idx, formatTag(route));
      } catch (err) {
        console.log(err);
      }
    }

    return {
      tagList,
      getCacheTabList,
      updateTabList,
      deleteTag,
      addCache,
      deleteCache,
      freshTabList,
      resetTabList,
      closeCurrentTab,
    };
  },
);

export default useTabBarStore;
