<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import bus from '../src/vitepress/bus';

const props: any = defineProps({
  ids: String
});

const ids = props.ids.split('|');
const currentPage = reactive({
  id: '',
  vnode: null
});
const contentBox: any = ref(null); // useSlots().default()有时候获取到的第一个节点的el是null，故用dom
const activeName = ref(1);

onMounted(() => {
  for (let i = 0; i < contentBox.value.children.length; i++) {
    hide(contentBox.value.children[i]);
  }
  selectCurrent(1);
});

const idToName = (id: string) => {
  switch (id) {
    case 'guide':
      return '指南';
    case 'element-plus':
      return '通用组件(Element)';
    case 'antdv3':
      return '通用组件(AntD)';
    case 'sf':
      return '业务组件';
  }
};

const show = (el: any) => {
  if (!el) return;
  el.style.cssText = 'display: block;';
};

const hide = (el: any) => {
  if (!el) return;
  el.style.cssText = 'display: none;';
};

const selectCurrent = (index: any) => {
  currentPage.vnode && hide(currentPage.vnode);
  currentPage.id = ids[index];
  currentPage.vnode = contentBox.value.children[index];
  show(currentPage.vnode);

  bus.emit('changePagePipe', currentPage.id);
};
</script>

<template>
  <div class="mod-pagepipe">
    <el-tabs
      v-model="activeName"
      type="card"
      size="large"
      class="cachet"
      style="width: fit-content"
      @tab-change="selectCurrent"
    >
      <el-tab-pane
        :label="idToName(id)"
        :name="index"
        v-for="(id, index) in ids"
        :key="id"
      ></el-tab-pane>
    </el-tabs>
    <main ref="contentBox"><slot></slot></main>
  </div>
</template>

<style scoped>
.navs {
  display: flex;
  align-items: center;
  font-size: var(--sdesign-font-size-regular);
  line-height: 1.42;
  color: var(--vt-c-text-1);
  box-shadow: inset 0 -1px 0 0 var(--sdesign-color-grey-4);
}
.nav-item {
  cursor: pointer;
  padding: var(--sdesign-spacing-large) 0;
  margin-bottom: -1px;
  /* min-width: 3em; */
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}
.nav-item.active {
  position: relative;
  color: var(--sdesign-color-brand-6);
  font-weight: 600;
  border-color: var(--sdesign-color-brand-6);
}
.nav-item + .nav-item {
  margin-left: var(--sdesign-spacing-huge);
}
</style>
