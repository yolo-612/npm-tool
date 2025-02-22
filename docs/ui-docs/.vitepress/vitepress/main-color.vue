<template>
  <el-row :gutter="12">
    <el-col :span="12">
      <div class="demo-color-box">
        <div
          class="value"
          :style="{ background: `var(--sdesign-color-brand-6)` }"
        >
          brand <br />
          var(--sdesign-color-brand-6)<br />{{ getValue('brand-6') }}
        </div>
        <div class="bg-color-sub">
          <div v-for="item in 10" :key="item" class="bg-red-sub-item">
            <div
              class="bg-item"
              :style="`background: var(--sdesign-color-brand-${item})`"
              @click="copyContent(getValue(`brand-${item}`))"
            ></div>
            <div class="content">
              color-brand-{{ item }}<br />{{ getValue(`brand-${item}`) }}
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="demo-color-box">
        <div
          class="value"
          :style="{ background: `var(--sdesign-color-neutral-12)` }"
        >
          neutral<br />
          var(--sdesign-color-neutral-12)<br />{{ getValue('neutral-12') }}
        </div>
        <div class="bg-color-sub">
          <div v-for="item in 12" :key="item" class="bg-red-sub-item">
            <div
              class="bg-item"
              :style="`background: var(--sdesign-color-neutral-${item})`"
              @click="copyContent(getValue(`neutral-${item}`))"
            ></div>
            <div class="content">
              color-neutral-{{ item }}<br />{{ getValue(`neutral-${item}`) }}
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import clipboardCopy from 'clipboard-copy';
import { ElMessage } from '@sdesign/element-plus';

export default defineComponent({
  setup() {
    const getValue = (type: string) => {
      const getCssVarValue = (prefix: string, type: string) =>
        getComputedStyle(document.documentElement).getPropertyValue(
          `--sdesign-${prefix}-${type}`
        );
      return getCssVarValue('color', type);
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
    return { getValue, copyContent };
  }
});
</script>

<style lang="scss" scoped>
.demo-block-control {
  display: none;
}
.demo-block.demo-color {
  border: none;
  padding: 0;
}
.demo-block.demo-color:hover {
  box-shadow: none;
}
.demo-block.demo-color .source {
  padding: 0;
}
.demo-color-box {
  position: relative;
  border-radius: 4px;
  margin: 5px 0;
  box-sizing: border-box;
  color: var(--sdesign-color-white);
  font-size: 14px;
  .value {
    padding: 20px;
  }
  .bg-color-sub {
    width: 100%;
    height: 100%;
    cursor: pointer;
    .bg-red-sub-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 50px;
      .bg-item {
        width: 60%;
      }
      .content {
        width: 40%;
        color: #8f8f8f;
        margin: auto;
        padding: 0 12px;
      }
    }

    .bg-secondary-sub-item {
      width: 50%;
      height: 100%;
      display: inline-block;
      &:first-child {
        border-radius: 0 0 0 var(--el-border-radius-base);
      }
    }
  }
}
</style>
