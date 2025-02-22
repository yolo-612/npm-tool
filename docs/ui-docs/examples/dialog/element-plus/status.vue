<template>
  <el-button text @click="infoVisible = true"> 点击打开 info Dialog</el-button>
  <el-button text @click="successVisible = true">
    点击打开 success Dialog
  </el-button>
  <el-button text @click="warningVisible = true">
    点击打开 warning Dialog
  </el-button>
  <el-button text @click="exceptionVisible = true">
    点击打开 exception Dialog
  </el-button>
  <el-dialog v-model="infoVisible" width="30%" class="dialog-info">
    <template #header>
      <i class="icon-status"></i>
      <span>浏览器版本过旧</span>
    </template>
    <span>
      您使用的浏览器版本过旧，可能造成部分页面显示效果不全，部分功能也将无法使用，建议您升级浏览器版本
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="infoVisible = false">
          知道了
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="successVisible" width="30%" class="dialog-success">
    <template #header>
      <i class="icon-status"></i>
      <span>已提交申诉</span>
    </template>
    <span>
      您的申诉信息已成功提交，客服人员将在3个工作日内回复，请保持手机畅通
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="successVisible = false">
          知道了
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="warningVisible" width="30%" class="dialog-warning">
    <template #header>
      <i class="icon-status"></i>
      <span>浏览器版本过旧</span>
    </template>
    <span>
      您使用的浏览器版本过旧，可能造成部分页面显示效果不全，部分功能也将无法使用，建议您升级浏览器版本
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="warningVisible = false">
          知道了
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="exceptionVisible" width="30%" class="dialog-exception">
    <template #header>
      <i class="icon-status"></i>
      <span>申诉失败</span>
    </template>
    <span>
      您的申诉已被驳回，原因：经多方核实，您的订单未超出时效，且安装质量良好
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="exceptionVisible = false">
          知道了
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const infoVisible = ref(false);
const successVisible = ref(false);
const warningVisible = ref(false);
const exceptionVisible = ref(false);
</script>
