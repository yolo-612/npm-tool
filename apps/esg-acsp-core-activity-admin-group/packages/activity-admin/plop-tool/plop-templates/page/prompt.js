export default (viewsDirs) => {
  return {
    description: '创建页面',
    tips: '页面创建成功后会在目录下生成页面文件，并自动重启。',
    prompts: [
      {
        type: 'list',
        name: 'path',
        message: '请选择页面创建目录',
        choices: viewsDirs,
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入文件名',
        validate: (v) => {
          if (!v || v.trim === '') {
            return '文件名不能为空';
          } else {
            return true;
          }
        },
      },
      {
        type: 'confirm',
        name: 'isFilesystem',
        message: '是否为基于文件系统的路由页面',
        default: false,
      },
      {
        type: 'input',
        name: 'routeTitle',
        message: '页面标题',
        default: '页面标题',
        when: (data) => {
          // 文件路由模式显示页面标题
          return !!data['isFilesystem'];
        },
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: `${data.path}/{{name}}.vue`,
          templateFile: 'plop-tool/plop-templates/page/index.hbs',
        },
      ];
      return actions;
    },
  };
};
