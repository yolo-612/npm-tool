import ElementPlus  from 'element-plus';
import type { App } from 'vue';
import './style/index.scss'

const install = function(app: App, opt: any) {
  app.use(ElementPlus)
  console.log(opt)
}

export {
  ElMessageBox,
  ElMessage,
  ElNotification,
  ElLoading
} from 'element-plus';

export default {
  name: 'PC Web Element-Plus组件库',
  version: '1.0.0',
  install
};