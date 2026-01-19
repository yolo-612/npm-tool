import SDesignElementPlus from '@sdesign/element-plus';
import '@/assets/styles/_element-plus-variables.scss';
// 规范(默认)
import '@sdesign/theme/index.css';
// 红色主题
import '@sdesign/theme/src/css/brand/_blue.css';
import '@sdesign/theme/src/css/brand/_red.css';
import '@/assets/styles/theme_orange.css';
// 继承并扩展了element-plus多语言文件
// import { Utils } from '@sdesign/element-plus';
console.log('导入sdesign====');
// @ts-ignore
export default function ({ app }) {
  // 命名空间、多语言（修改的话才加上）
  app.use(SDesignElementPlus);
}
