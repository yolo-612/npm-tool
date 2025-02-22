import { defineConfig } from 'vitepress'
import commonjs from 'vite-plugin-commonjs';

import path from 'path'
const build = false;
const envParams = build ? { base: '/' } : { base: '/' };

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YOLO Component",
  description: "YOLO Component",
  markdown: {
    config: (md: any) => {
      const {
        demoBlockPlugin,
        pagePipePlugin
      } = require('./config/markdown');
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss'
      });
      md.use(pagePipePlugin);
    }
  },
  themeConfig: {
    logo: '/img/logo-vue.svg',
    nav: [
      {
        text: '指南',
        activeMatch: `^${envParams.base}guide/`,
        items: [
          {
            text: '安装',
            link: '/guide/installation'
          },
          {
            text: '快速开始',
            link: '/guide/quickstart'
          },
          {
            text: '更新日志',
            link: 'https://inner-source.sf-express.com/incubation/SF-Tech-Web/sdesign/sdesign-vue3/-/releases'
          },
          {
            text: '开发计划',
            link: '/guide/plan.html'
          },
          { text: '常见问题', link: '/guide/faq' }
        ]
      },
      {
        text: '组件',
        activeMatch: `^${envParams.base}component/`,
        link: '/component/color'
      },
      {
        text: '试验区',
        activeMatch: `^${envParams.base}test/`,
        link: '/test/element-plus'
      },
      {
        text: '资源',
        link: '/resource'
      },
      {
        text: 'Vue3',
        items: [
          {
            text: 'Vue2',
            link: 'https://sdesign.sit.sf-express.com/v2/component/color/',
            self: true
          },
          {
            text: 'React',
            link: 'https://sdesign.sit.sf-express.com/react/components/color',
            self: true
          },
          {
            text: '图表',
            link: 'https://sdesign.sit.sf-express.com/charts/'
          },
          {
            text: 'SDesign Pro',
            link: 'https://sdesign.sit.sf-express.com/pro/'
          },
          {
            text: 'WEB应用研发解决方案',
            link: 'https://sf-cli.sit.sf-express.com/'
          }
        ]
      },
      {
        text: '内源',
        link: 'http://inner-source.sf-express.com/incubation/SF-Tech-Web/sdesign/sdesign-vue3'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            {
              text: '快速开始',
              link: '/guide/quickstart'
            },
            {
              text: '一键生成 sfdesign 项目',
              link: '/guide/start-sfdesign'
            },
            {
              text: '更新日志',
              link: 'https://inner-source.sf-express.com/incubation/SF-Tech-Web/sdesign/sdesign-vue3/-/releases'
            },
            { text: '开发计划', link: '/guide/plan' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/component/': [
        {
          text: '全局规范',
          items: [
            { text: '色彩 Color', link: '/component/color' },
            { text: '阴影 Shadow', link: '/component/shadow' },
            { text: '字体 Fonts', link: '/component/fonts' },
            { text: '圆角 Fillet', link: '/component/fillet' },
            { text: '线条 Line', link: '/component/line' },
            { text: '图标 Icon', link: '/component/icon' },
            { text: '布局 Layout', link: '/component/layout' }
          ]
        },
        {
          text: '导航与通用',
          items: [
            { text: '按钮 Button', link: '/component/button' },
            { text: '导航菜单 NavMenu', link: '/component/nav-menu' },
            { text: '下拉菜单 Dropdown', link: '/component/dropdown' },
            { text: '标签页 Tabs', link: '/component/tabs' },
            { text: '面包屑 Breadcrumb', link: '/component/breadcrumb' },
            { text: '分页器 Pagination', link: '/component/pagination' },
            { text: '步骤条 Step', link: '/component/step' },
            { text: '锚点 Anchor', link: '/component/anchor' },
            { text: '回到顶部 BackTop', link: '/component/back-top' }
          ]
        },
        {
          text: '数据录入',
          items: [
            { text: '输入框 Input', link: '/component/input' },
            { text: '选择器 Select', link: '/component/select' },
            { text: '单选框 Radio', link: '/component/radio' },
            { text: '多选框 Checkbox', link: '/component/checkbox' },
            { text: '开关 Switch', link: '/component/switch' },
            { text: '时间选择器 TimePicker', link: '/component/time-picker' },
            { text: '日期选择器 DatePicker', link: '/component/date-picker' },
            {
              text: '日期时间选择器 DateTimePicker',
              link: '/component/datetime-picker'
            },
            { text: '滑块 Slider', link: '/component/slider' },
            { text: '上传 Upload', link: '/component/upload' },
            { text: '穿梭框 Transfer', link: '/component/transfer' },
            {
              text: '步进器 Stepper',
              link: '/component/stepper'
            },
            {
              text: '树选择 TreeSelect',
              link: '/component/tree'
            },
            { text: '星标 Star', link: '/component/star' },
            { text: '表单 Form', link: '/component/form' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: '表格 Table', link: '/component/table' },
            { text: '灵活表格 SGrid', link: '/component/sgrid' },
            { text: '列表 List', link: '/component/list' },
            { text: '缺省页 Blank', link: '/component/blank' },
            { text: '文字提示 Tooltip', link: '/component/tooltip' },
            { text: '气泡卡片 Popover', link: '/component/popover' },
            { text: '折叠面板 Collapse', link: '/component/collapse' },
            { text: '卡片 Card', link: '/component/card' },
            { text: '标签 Tag', link: '/component/tag' },
            { text: '徽标数 Badge', link: '/component/badge' },
            { text: '头像 Avatar', link: '/component/avatar' },
            {
              text: '图片 Image',
              link: '/component/image'
            },
            {
              text: '时间轴 Timeline',
              link: '/component/timeline'
            }
          ]
        },
        {
          text: '反馈与其他',
          items: [
            { text: '全局提示 Message', link: '/component/message' },
            { text: '加载 Loading', link: '/component/loading' },
            { text: '抽屉 Drawer', link: '/component/drawer' },
            { text: '进度条 Progress', link: '/component/progress' },
            {
              text: '通知提醒框 Notification',
              link: '/component/notification'
            },
            { text: '结果 Result', link: '/component/result' },
            { text: '对话框 Model', link: '/component/model' },
            { text: '警告提示 Alert', link: '/component/alert' },
            { text: '弹窗 Popups', link: '/component/popups' }
          ]
        }
      ],
      '/test/': [
        {
          text: '试验区',
          items: [
            { text: '基于element-plus的组件', link: '/test/element-plus' },
            { text: '基于antdv3的组件', link: '/test/antdv3' }
          ]
        }
      ]
    },
    // page meta
    editLink: {
      repo: 'http://inner-source.sf-express.com/explore-area/SF-Tech-Web/sdesgin/sdesign-vue3',
      text: '在 Gitlab 上编辑此页'
    },
    footer: {
      license: {
        text: '顺丰科技内源规则',
        link: ''
      },
      copyright: 'Copyright © 2024 大前端委员会'
    },
    appearance: true
  },
  vite: {
    plugins: [commonjs()],
    resolve: {
      alias: {
        '@vue/theme': path.join(__dirname, './src'),
      }
    }
  }
})
