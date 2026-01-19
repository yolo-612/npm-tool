export default (componentDirs, componentNames) => {
  return {
    description: '创建组件',
    prompts: [
      {
        type: 'list',
        name: 'path',
        message: '请选择组件创建目录',
        choices: componentDirs,
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入组件名称',
        suffix: '大驼峰格式',
        validate: (v) => {
          // 已存在的组件名称
          if (!v || v.trim === '') {
            return '组件名称不能为空';
          } else if (componentNames.findIndex((item) => item === `${v}.vue` || item === `${v}.tsx`) !== -1) {
            return `已存在${v}组件，请输入其他名称！`;
          } else {
            return true;
          }
        },
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: `${data.path}/{{name}}.vue`,
          templateFile: 'plop-tool/plop-templates/component/index.hbs',
        },
      ];
      return actions;
    },
  };
};
