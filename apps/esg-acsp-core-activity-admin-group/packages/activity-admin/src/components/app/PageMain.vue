<script setup>
import { invokeAsyncFunction } from '@/utils';
import usePageState, { PageStates } from '@/hook/usePageState';

const props = defineProps({
  title: {
    // 标题
    type: String,
    default: undefined,
  },
  extra: {
    // 右边元素
    type: String,
    default: undefined,
  },
  showHeaderBorder: {
    // 是否header底部边框
    type: Boolean,
    default: true,
  },
  asyncData: {
    // 为空时，不显示loading
    type: Function,
    default: null,
  },
});

const { pageState, setPageState } = usePageState();

const slots = useSlots();

const hasTitle = Boolean(slots.title ?? props.title);
const hasExtra = Boolean(slots.extra ?? props.extra);

const errorTitle = ref('加载失败');
const errorMessage = ref('');

const loadData = () => {
  setPageState(PageStates.Loading);
  errorMessage.value = '';
  invokeAsyncFunction(props.asyncData)
    .then(() => {
      setPageState(PageStates.Success);
    })
    .catch((err) => {
      errorMessage.value = err.message;
      setPageState(PageStates.Error);
      console.error(err);
    });
};

onMounted(() => {
  if (props.asyncData) {
    loadData();
  } else {
    setPageState(PageStates.Success);
  }
});

const onClickRetry = () => {
  loadData();
};
</script>

<template>
  <div class="PageMain">
    <header v-if="hasTitle || hasExtra" class="header" :class="{ showHeaderBorder }">
      <div class="content-title"
        ><slot name="title"
          ><span>{{ title }}</span></slot
        ></div
      >
      <div class="content-extra"
        ><slot name="extra"
          ><span>{{ extra }}</span></slot
        ></div
      >
    </header>
    <div class="content">
      <div v-if="pageState === PageStates.Loading" v-loading="true" class="loading"></div>
      <el-result
        v-else-if="pageState === PageStates.Error"
        icon="warning"
        :title="errorTitle"
        :sub-title="errorMessage"
      >
        <template #extra>
          <el-button type="primary" @click="onClickRetry">重新操作</el-button>
        </template>
      </el-result>
      <slot v-else></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .PageMain {
    position: relative;
    flex-direction: column;
    display: flex;
    background-color: var(--sdesign-color-bg-1);
    border-radius: 5px;
    margin: 10px;
    box-sizing: border-box;
  }

  .PageMain .header {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 20px;

    .content-title {
      flex: 1;
      font-size: var(--sdesign-font-size-large);
      font-weight: var(--sdesign-font-weight-medium);
      line-height: 22px;
    }

    .content-extra {
      font-size: var(--sdesign-font-size-regular);
      font-weight: var(--sdesign-font-weight-medium);
      line-height: 22px;
    }

    &.showHeaderBorder {
      border-bottom: 1px solid var(--sdesign-color-border-default);
    }
  }

  .PageMain .loading {
    height: 200px;
  }

  .PageMain .content {
    position: relative;
    flex: 1;
    padding: 20px 20px 20px 20px;
  }
</style>
