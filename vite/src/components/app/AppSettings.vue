<script setup lang="ts">
  import { useClipboard } from '@vueuse/core';
  import { ElMessage } from 'element-plus';
  import { useSettingsStore } from '@/stores';
  import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';

  const { copy } = useClipboard();

  const settingsStore = useSettingsStore();

  const isDEV = import.meta.env.DEV;

  const drawer = ref(false);
  const direction = ref('rtl');

  /** 页宽 */
  const stretchTypeOptions = computed(() => {
    return [
      {
        label: '固定',
        tip: '紧凑页面，轻松找到所需信息',
        value: 'fixed',
      },
      {
        label: '自定义',
        tip: '最小1280、最大1600',
        value: 'custom',
      },
    ];
  });
  const stretchType = ref('fixed');

  const setStretch = (val: number | boolean) => {
    settingsStore.settings.stretch = val;
  };
  const stretchTypeChange = (val: string) => {
    val === 'custom' ? setStretch(1440) : setStretch(false);
  };

  const handleClose = (done: () => void) => {
    drawer.value = false;
  };

  const onClickCopy = async () => {
    const text = JSON.stringify(settingsStore.settings, null, 2);
    await copy(text);
    ElMessage.success('复制成功，请粘贴到 src/settings.ts 文件中！');
  };
</script>

<template>
  <div class="AppSetting">
    <el-button class="btn">
      <el-icon :size="20" @click="drawer = true">
        <Setting />
      </el-icon>
    </el-button>
    <el-drawer v-model="drawer" size="500px" title="应用配置" :direction="direction" :before-close="handleClose">
      <div class="tips">
        应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到
        src/settings.ts 文件中。 注意：在生产环境中应关闭该模块。
      </div>

      <section class="setting-content">
        <el-divider><strong>颜色主题</strong></el-divider>
        <el-radio-group v-model="settingsStore.settings.theme">
          <el-radio value="red" size="large">红色</el-radio>
          <el-radio value="blue" size="large">蓝色</el-radio>
          <el-radio value="orange" size="large">橘色</el-radio>
        </el-radio-group>
      </section>

      <div class="setting-content">
        <el-divider><strong>导航栏模式</strong></el-divider>
        <el-radio-group v-model="settingsStore.settings.menu.menuMode">
          <el-radio value="side" size="large">侧边栏模式</el-radio>
          <el-radio value="head" size="large">顶部模式</el-radio>
          <el-radio value="head-side" size="large">顶部+侧边栏模式</el-radio>
        </el-radio-group>
      </div>

      <div class="setting-content">
        <el-divider><strong>页宽</strong></el-divider>
        <el-segmented v-model="stretchType" :options="stretchTypeOptions" size="default" @change="stretchTypeChange" />
        <div class="setting-content-stretch">
          <el-input-number
            v-if="stretchType === 'custom'"
            v-model="settingsStore.settings.stretch"
            :min="1280"
            :max="1600"
            controls-position="right"
            @change="(value: number) => setStretch(value)"
          />
          <button v-else class="setting-content-stretch__button" @click="setStretch(!settingsStore.settings.stretch)">
            <div class="content" :class="[settingsStore.settings.stretch ? 'w24' : 'w50']">
              <el-icon height="20">
                <ArrowRight v-if="settingsStore.settings.stretch" />
                <ArrowLeft v-else />
              </el-icon>
              <div class="dash" />
              <el-icon height="20">
                <ArrowLeft v-if="settingsStore.settings.stretch" />
                <ArrowRight v-else />
              </el-icon>
            </div>
          </button>
        </div>
      </div>

      <section class="setting-content">
        <el-divider><strong>界面显示</strong></el-divider>
        <div class="setting-item">
          <span>是否显示标签页</span>
          <el-switch v-model="settingsStore.settings.tabBar" />
        </div>
        <div class="setting-item">
          <span
            >是否忽略标签页持久化
            <el-tooltip class="box-item" effect="dark" content="需要修改配置文件，重新构建才能生效" placement="top">
              <el-icon><QuestionFilled /></el-icon> </el-tooltip
          ></span>
          <el-switch v-model="settingsStore.settings.ignoreTabBarPersistent" />
        </div>
        <div class="setting-item">
          <span>是否显示面包屑</span>
          <el-switch v-model="settingsStore.settings.breadcrumb" />
        </div>
        <div class="setting-item">
          <span>是否隐藏顶部header</span>
          <el-switch v-model="settingsStore.settings.hiddenTopHeader" />
        </div>
        <div class="setting-item">
          <span>菜单数据来源</span>
          <el-select v-model="settingsStore.settings.menu.baseOn" size="large" style="width: 140px">
            <el-option
              value="routes"
              label="根据路由生成"
              :disabled="settingsStore.settings.routeBaseOn === 'filesystem'"
            ></el-option>
            <el-option value="frontend" label="前端配置"></el-option>
            <el-option value="backend" label="后端配置"></el-option>
            <el-option value="basp" label="百源配置"></el-option>
          </el-select>
        </div>
        <div v-if="isDEV" class="setting-item">
          <span>是否隐藏代码文件自动生成按钮</span>
          <el-switch v-model="settingsStore.settings.hiddenNewCodeTool" />
        </div>
      </section>

      <section class="setting-content">
        <el-divider><strong>其他</strong></el-divider>
        <div class="setting-item">
          <span>是否启用权限验证</span>
          <el-switch v-model="settingsStore.settings.enablePermission" />
        </div>
        <div class="setting-item">
          <span>是否忽略路由缓存</span>
          <el-switch v-model="settingsStore.settings.ignoreRouteCache" />
        </div>
        <div class="setting-item">
          <span
            >路由模式
            <el-tooltip class="box-item" effect="dark" content="需要修改配置文件，重新构建才能生效" placement="top">
              <el-icon><SfAssist /></el-icon>
            </el-tooltip>
          </span>

          <el-select v-model="settingsStore.settings.routeBaseOn" size="large" style="width: 140px">
            <el-option value="frontend" label="前端路由文件" disabled></el-option>
            <el-option value="filesystem" label="文件系统路由" disabled></el-option>
          </el-select>
        </div>
      </section>
      <template #footer>
        <el-button type="primary" style="width: 100%" @click="onClickCopy">复制配置</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
  strong {
    font-weight: 700;
    font-size: 16px;
  }

  .AppSetting {
    position: fixed;
    right: 0;
    bottom: 100px;
    z-index: 100;
    font-size: 14px;
    .btn {
      width: 40px;
      height: 40px;
      background-color: #1a1a1a;
      color: #ffffff;
      border-radius: 10px 0 0 10px;
    }
    .tips {
      background-color: #ffd6dc;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 8px;
      line-height: 18px;
      color: #f23030;
      white-space: normal;
    }

    .setting-content {
      margin-bottom: 20px;
      &-stretch {
        padding-top: 8px;
        &__button {
          cursor: pointer;
          background-color: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: #3355ff;
          &:hover {
            color: #3355ff;
          }
          .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease-in-out;
            &.w24 {
              width: 24%;
            }
            &.w50 {
              width: 50%;
            }
          }
          .dash {
            flex-grow: 1;
            border-bottom: 1px dashed #3355ff;
          }
        }
      }
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #333;
    }
  }
</style>
