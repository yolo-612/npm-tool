<script setup lang="ts">
import { cloneDeep } from 'lodash-es';
import WujieVue from 'wujie-vue3';
import { useRouter } from 'vue-router';
import { useUserStore, useTabBarStore } from '@/stores';

const { meta, query } = useRoute();
const { empCode, roleCode, roleData } = useUserStore();
// 提供一个空白页面，防止再次请求当前域名、重定向等导致的问题
const emptyUrl = ref(`${window?.location.origin}/ces-web-frontend/iframe/empty/?t=${Date.now()}`);

const beforeLoad = (appWindow: Window) => {
  appWindow.__USER_DATA = cloneDeep({
    empCode, roleCode, roleData,
  });
};

const url = `${meta?.embeddedUrl}${Object.keys(query).length ? `?${new URLSearchParams(query).toString()}` : ''}`;

const { bus } = WujieVue;
const route = useRoute();
const router = useRouter();
const tabBarStore = useTabBarStore();
const handleRouterClose = () => {
  console.log('close-wujie', route);
  tabBarStore.closeCurrentTab(route);
};

const handleRouterPush = (route: any) => {
  console.log('rest', route);
  router.push(route);
};
bus.$on('routerClose', handleRouterClose);
bus.$on('routerPush', handleRouterPush);
bus.$on('logOut', (urlToRedirectTo: string) => {
  tabBarStore.closeCurrentTab(route);
  window.location.href = `${urlToRedirectTo}?target=${window.location.href}`;
});
onBeforeUnmount(() => {
  bus.$off('routerClose', handleRouterClose);
  bus.$off('routerPush', handleRouterPush);
});
</script>

<template>
  <div class="AdminPage">
    <WujieVue
      v-if="meta?.embeddedUrl"
      width="100%"
      height="100%"
      :beforeLoad="beforeLoad"
      :name="meta?.embeddedUrl ?? 'embedded'"
      :url="url"
      :attrs="{src: emptyUrl }"
    />
    <el-result v-else icon="warning" title="无权访问该页面" sub-title="请向管理员申请权限"> </el-result>
  </div>
</template>

<style lang="scss" scoped>
.AdminPage {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--sdesign-color-grey-2);
}
</style>
