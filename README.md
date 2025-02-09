分支说明：【日期为分支创建时间】
main分支：不提交|归档
  release/2025/0209-init: 分支基本的文件初始化
  project/2025/0209：工程化相关开发【包括npm+组件库】

  feature/2025/V0209-user：用户管理后台模块

少点强迫症：差不多就可以，先实现再优化

project/2025/0209： 
  1. 接入pc端组件库
  【参考实现：https://juejin.cn/post/7198159223204675643】 + sdesgin【套壳】

近期目标：弹窗管理实现，弹窗权限配置 整一个管理后台【管理后台加上ui组件库的配置】 + 弹窗ui使用taro参照目前项目的实现
  ====> 完成该目标的成果：移动端+PC端UI组件库 + 管理后端模板 + taro项目融合进来
  ====> 完成该目标的项目成果：当作一个项目难点


2025-0209：
  阻塞问题：
  (1)、在pg-component组件库中 /button/index.js导出了 plugin的 install方法，
  在vite-demo使用的时候  app.use(ButtonInstall) 也没有报错，
  但是在页面vue中直接用<pg-button>1221</pg-button>没有效果