export default () => {
  return {
    description: '创建全局状态',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入模块名称',
        suffix: '大驼峰格式',
        validate: (v) => {
          if (!v || v.trim === '') {
            return '模块名称不能为空';
          } else {
            return true;
          }
        },
      },
    ],
    actions: () => {
      const actions = [
        {
          type: 'add',
          path: 'src/stores/modules/{{dashCase name}}/index.ts',
          templateFile: 'plop-tool/plop-templates/store/index.hbs',
        },
        {
          type: 'append',
          path: 'src/stores/index.ts',
          templateFile: 'plop-tool/plop-templates/store/export.hbs',
        },
      ];
      return actions;
    },
  };
};
