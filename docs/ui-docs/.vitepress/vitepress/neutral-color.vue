<template>
  <div class="mod-colors">
    <el-row :gutter="12">
      <el-col :span="12" v-for="token in baseTokens" :key="token">
        <div class="demo-color-box">
          <div
            class="value"
            :style="`background: var(--sdesign-color-${token}-8)`"
          >
            {{ token }}<br />{{ `var(--sdesign-color-${token}-8)` }}<br />{{
              getValue(`${token}-8`)
            }}
          </div>
          <div class="bg-color-sub">
            <div v-for="item of 12" :key="item" class="bg-red-sub-item">
              <div
                class="bg-item"
                :style="`background: var(--sdesign-color-${token}-${item})`"
                @click="copyContent(getValue(`${token}-${item}`))"
              ></div>
              <div class="content">
                color-{{ token }}-{{ item }}<br />{{
                  getValue(`${token}-${item}`)
                }}
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <h2>全局模态</h2>
        <div class="demo-color-box">
          <div class="value" :style="`background: rgba(0,0,0,50%)`">
            用于全局模态黑色蒙层，#000000 <br />（0，0，0，50%）
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import clipboardCopy from 'clipboard-copy';
import { ElMessage } from '@yolo/element-plus';

const baseTokens = ['grey', 'neutral'];
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
