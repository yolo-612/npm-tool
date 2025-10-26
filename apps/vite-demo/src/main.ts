import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PgKit from '@yolo/pg-kit'
import "@yolo/pg-kit/dist/index.css"
import ElementPlus from '@yolo/element-plus'
import '@yolo/element-plus/dist/index.css'
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";


function render(props: QiankunProps = {}){
  const { container } = props;

  const app = createApp(App) 
  app.use(PgKit)
  ElementPlus.install(app, {})

  console.log('qiankun===>', container)
  container
    ? app.mount(container.querySelector("#app") as HTMLElement)
    : app.mount("#app");
}



function initApp() {
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log("%c 独立渲染", "color: red; font-size: 20px;");
    render();
    return;
  }
  renderWithQiankun({
    mount(props) {
      console.log("%c qiankun 渲染", "color: red; font-size: 20px;");
      console.log(props);
      render(props);
    },
    bootstrap() {
      console.log("bootstrap");
    },
    unmount(props) {
      console.log("unmount", props);
    },
    update(props) {
      console.log("update", props);
    },
  });
}

initApp();