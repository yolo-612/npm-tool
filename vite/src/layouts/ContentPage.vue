<script setup>
import {
  computed, defineProps, onMounted, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { invokeAsyncFunction } from '@/utils';

const props = defineProps({
  title: {
    // 标题
    type:String,
    default:undefined,
  },
  showTitle:{
    // 是否显示title
    type:Boolean,
    default:true,
  },
  asyncData: {
    // 为空时，不显示loading
    type: Function,
    default: null,
  },
});

const route = useRoute();
const routerTitle = computed(() => props.title || route.meta.title || '');
const loading = ref(true);
const loadingMessage = ref('加载中');
const errorTitle = ref('加载错误');
const errorMessage = ref('');

const loadData = () => {
  loading.value = true;
  errorMessage.value = '';
  invokeAsyncFunction(props.asyncData).catch((err) => {
    errorMessage.value = err.message;
    console.error(err);
  }).finally(() => {
    loading.value = false;
  });
};

onMounted(() => {
  if (props.asyncData) {
    loadData();
  } else {
    loading.value = false;
  }
});

const onClickRetry = () => {
  loadData();
};

</script>

<template>
  <div class='ContentPage'>
    <header class='header' v-if='showTitle'>
      <slot name="header"><span>{{ routerTitle }}</span></slot>
    </header>
    <div class='content'>
      <div v-if='loading' class='loading' v-loading='true' :element-loading-text="loadingMessage"></div>
      <el-result v-else-if='!loading && errorMessage' icon="warning" :title='errorTitle'  :sub-title="errorMessage">
        <template #extra>
          <el-button type="primary" @click='onClickRetry'>重新操作</el-button>
        </template>
      </el-result>
      <slot v-else></slot>
    </div>
  </div>
</template>

<style scoped>
.ContentPage{
  position: relative;
  flex-direction: column;
  display: flex;
  background-color: #FFFFFF;
  padding: 10px 20px;
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 5px;
}
.ContentPage .header{
  display: flex;
  justify-content: left;
  align-items: center;
  height: 56px;
  font-size: 24px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
}
.ContentPage .loading{
  height: 200px;
}
.ContentPage .content{
  flex-shrink: 0;
  flex-grow: 1;
}
</style>
