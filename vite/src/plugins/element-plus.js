import { ElButton } from "element-plus";

export default function ({router,app,pinia}) {
  // 命名空间、多语言（修改的话才加上）
  app.use(ElButton);
}
