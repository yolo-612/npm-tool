export default (mockDirs) => {
  return {
    description: '创建Mock文件',
    prompts: [
      {
        type: 'list',
        name: 'path',
        message: '请选择mock模块目录',
        choices: mockDirs,
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
        type: 'list',
        name: 'method',
        message: '请选择请求方式',
        choices: ['post', 'get'],
        default: 'post',
      },
    ],
    actions: (data) => {
      const actions = [];
      actions.push({
        type: 'add',
        path: `${data.path}/{{name}}.mock.ts`,
        templateFile: 'plop-tool/plop-templates/mock/mock.hbs',
      });
      return actions;
    },
  };
};
