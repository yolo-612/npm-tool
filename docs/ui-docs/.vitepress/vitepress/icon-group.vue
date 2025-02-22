<script setup lang="ts">
import { ref } from 'vue';
import clipboardCopy from 'clipboard-copy';
import { ElMessage } from '@sdesign/element-plus';
import * as Icons from '@sdesign/icons-vue';
import iconsName from './sf-business.json';

const copyIcon = ref(true);

const curIconType = ref('SF-Design');
const iconTypesList = ['SF-Design', 'Filled', 'Outlined', 'Element'];
const hidden = (name: string) =>
  (curIconType.value === 'SF-Design' && name.slice(0, 2) !== 'Sf') ||
  (curIconType.value === 'Filled' &&
    !(name.slice(0, 3) == 'Ant' && name.slice(-6, -1) + 'd' == 'Filled')) ||
  (curIconType.value === 'Outlined' &&
    !(name.slice(0, 3) == 'Ant' && name.slice(-8, -1) + 'd' == 'Outlined')) ||
  (curIconType.value === 'Element' &&
    (name.slice(0, 2) === 'Sf' || name.slice(0, 3) === 'Ant'));

const SFHidden = (name: string, type: string) => {
  return (
    (type === 'normal' && iconsName.indexOf(name) > -1) ||
    (type === 'business' && iconsName.indexOf(name) == -1)
  );
};

const copyContent = async (content: string) => {
  try {
    await clipboardCopy(content);

    ElMessage({
      showClose: true,
      message: '已复制',
      type: 'success'
    });
  } catch (e) {
    ElMessage({
      showClose: true,
      message: '复制失败',
      type: 'error'
    });
  }
};

const copySvgIcon = async (name: string, refs: any) => {
  if (copyIcon.value) {
    await copyContent(`<el-icon><${name} /></el-icon>`);
  } else {
    const content = refs[name]?.[0].querySelector('svg')?.outerHTML ?? '';
    await copyContent(content);
  }
};
</script>

<template>
  <div>
    <div class="demo-icon-title">
      <el-select v-model="curIconType" class="demo-icon-title-child">
        <el-option
          v-for="item in iconTypesList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-switch
        v-model="copyIcon"
        class="demo-icon-title-child"
        active-text="Copy icon code"
        inactive-text="Copy SVG content"
      >
      </el-switch>
    </div>
    <template v-if="curIconType === 'SF-Design'">
      <h4>通用类图标</h4>
      <ul class="demo-icon-list four">
        <li
          v-for="component in Icons"
          :key="component.name"
          :ref="component.name"
          :class="{
            'icon-item': true,
            hidden: hidden(component.name) || SFHidden(component.name, 'normal')
          }"
          @click="copySvgIcon(component.name, $refs)"
        >
          <span class="demo-svg-icon">
            <ElIcon :size="16">
              <component :is="component" />
            </ElIcon>
            <span class="icon-name">{{ component.name }}</span>
          </span>
        </li>
      </ul>
      <h4>业务类图标</h4>
      <ul class="demo-icon-list four">
        <li
          v-for="component in Icons"
          :key="component.name"
          :ref="component.name"
          :class="{
            'icon-item': true,
            hidden:
              hidden(component.name) || SFHidden(component.name, 'business')
          }"
          @click="copySvgIcon(component.name, $refs)"
        >
          <span class="demo-svg-icon">
            <ElIcon :size="16">
              <component :is="component" />
            </ElIcon>
            <span class="icon-name">{{ component.name }}</span>
          </span>
        </li>
      </ul>
    </template>
    <ul class="demo-icon-list four" v-else>
      <li
        v-for="component in Icons"
        :key="component.name"
        :ref="component.name"
        :class="{
          'icon-item': true,
          hidden: hidden(component.name)
        }"
        @click="copySvgIcon(component.name, $refs)"
      >
        <span class="demo-svg-icon">
          <ElIcon :size="16">
            <component :is="component" />
          </ElIcon>
          <span class="icon-name">{{ component.name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.demo-icon-title {
  display: flex;
  justify-content: space-between;
  height: 62px;
  .demo-icon-title-child {
    margin-top: 9px;
    margin-bottom: 20px;
  }
}
.demo-icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--sdesign-color-border-default);
  border-left: 1px solid var(--sdesign-color-border-default);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  &.four {
    grid-template-columns: repeat(4, 1fr);
  }

  .icon-item {
    text-align: center;
    color: var(--el-text-color-regular);
    height: 90px;
    font-size: 13px;
    border-right: 1px solid var(--sdesign-color-border-default);
    border-bottom: 1px solid var(--sdesign-color-border-default);
    transition: background-color 0.3s;
    min-width: 100px;
    &.hidden {
      display: none;
    }
    &:hover {
      background-color: var(--el-border-color-extra-light);
      .el-icon {
        color: var(--brand-color-light);
      }
      color: var(--brand-color-light);
    }

    .demo-svg-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      .icon-name {
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }
}
.dark .icon-item {
  color: var(--vt-c-text-1);
}
</style>
