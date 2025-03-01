<template>
  <div class="vars">
    <el-button
      link
      class="code"
      type="primary"
      v-if="currentVars?.length > 0"
      @click="() => (isCode = !isCode)"
    >
      {{ isCode ? '编辑' : '代码' }}
    </el-button>
    <el-input
      :value="codeVars()"
      v-if="isCode"
      type="textarea"
      :rows="12"
      readonly
    />
    <el-row :gutter="20" v-for="item in currentVars" v-else>
      <el-col :span="16" style="line-height: 32px">
        {{ item.title }} <small>{{ item.var }}</small>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <component
          :is="item.component"
          v-model="item.value"
          @change="(v: any) => handleChange(v, item)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useData } from 'vitepress';
import { gradient } from '../composables/theme/color';
// import { vars as buttonVars } from '../composables/theme/button';

interface itemType {
  var: string;
  isBaseColor?: Boolean;
  dom?: string;
}
// 全部vars
const { page } = useData();
// 当前vars
const currentVars: any = ref([]);
// 模式切换
const isCode: any = ref(false);
watch(
  () => page.value.frontmatter.theme,
  () => {
    isCode.value = false;
    init();
  }
);

onMounted(() => {
  init();
});

const init = () => {
  nextTick(() => {
    switch (page.value.frontmatter.theme) {
      // case 'button':
      //   currentVars.value = buttonVars();
      //   break;
      default:
        currentVars.value = [];
        break;
    }
  });
};

const handleChange = (v: string, item: itemType) => {
  if (v) {
    const el: any = document.querySelectorAll(item.dom || '.element-plus');
    el.forEach((element: any) => {
      element.style.setProperty(item.var, v);
    });
    // 色阶调整
    if (item.isBaseColor) {
      gradient(v, item);
    }
  }
};

const codeVars = () => {
  var code: any = [];
  currentVars.value.forEach((x: any) => {
    code.push(
      `${x.remark ? '// ' + x.remark + '\n' : ''}${x.var}: ${x.value};`
    );
  });

  return code.join('\n');
};
</script>

<style lang="scss" scoped>
.vars {
  padding-top: 12px;
  .code {
    margin-top: -32px;
    float: right;
  }
}
.el-col {
  margin: 2px 0;
}
</style>
