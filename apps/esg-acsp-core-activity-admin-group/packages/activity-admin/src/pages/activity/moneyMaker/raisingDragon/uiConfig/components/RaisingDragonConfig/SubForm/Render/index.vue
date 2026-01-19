<script setup lang="ts">
import type { IFormType } from '../../../../composables/types';
import RdEntry from './RdEntry.vue';
import RdFail from './RdFail.vue';
import RdHelpIcon from './RdHelpIcon.vue';
import RdHelpWrite from './RdHelpWrite.vue';
import RdPop from './RdPop.vue';
import RdSelectBg from './RdSelectBg.vue';
import RdSelectEmptyIcon from './RdSelectEmptyIcon.vue';
import RdSuccess from './RdSuccess.vue';
import RdTreasureIcon from './RdTreasureIcon.vue';
import RdTreasureList from './RdTreasureList.vue';
import RdTreasurePopUp from './RdTreasurePopUp.vue';
import RdTreasureWrite from './RdTreasureWrite.vue';
import RdWaitPage from './RdWaitPage.vue';
import RdWaitCustomerDetail from './RdWaitCustomerDetail.vue';
import RdRaisingWaitPage from './RdRaisingWaitPage.vue';
import RdRaisingCustomerDetail from './RdRaisingCustomerDetail.vue';

defineProps({
  /** name */
  name: {
    type: String,
    default: '',
  },
  /** form */
  prop: {
    type: Object as PropType<IFormType>,
    default: () => ({}),
  },
});

/** 组件映射 */
const comps: any = {
  RdEntry,
  RdFail,
  RdHelpIcon,
  RdHelpWrite,
  RdPop,
  RdWaitCustomerDetail,
  RdRaisingWaitPage,
  RdRaisingCustomerDetail,
  RdSelectBg,
  RdSelectEmptyIcon,
  RdSuccess,
  RdTreasureIcon,
  RdTreasureList,
  RdTreasurePopUp,
  RdTreasureWrite,
  RdWaitPage,
};
</script>

<template>
  <div v-if="comps[name]" class="raising-dragon-render">
    <!--
        通过:is绑定动态决定渲染的组件，这里的component的值应该是对应导入组件的名称等
        :key用于提供组件的唯一标识，帮助Vue进行高效的DOM更新和复用
        :form用于将父组件传递过来的form对象传递给动态渲染的组件
    -->
    <component :is="comps[name]" :prop="prop" />
  </div>
</template>

<style lang="scss" scoped>
.raising-dragon-render {
  --scale-factor: 0.3;
  width: calc(750px * var(--scale-factor));
  height: calc(1334px * var(--scale-factor));
  background: #eee;
  overflow: hidden;
}
</style>
