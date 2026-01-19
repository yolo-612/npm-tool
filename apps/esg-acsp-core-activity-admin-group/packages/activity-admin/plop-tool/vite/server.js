import fs from 'node:fs';
import component from '../plop-templates/component/prompt.js';
import page from '../plop-templates/page/prompt.js';
import store from '../plop-templates/store/prompt.js';
import mock from '../plop-templates/mock/prompt.js';

/**
 * 获取path目录下文件名称
 * @param path
 * @param reg
 * @return {*[]}
 */
export const getFilesName = (path, reg = /\.(vue|tsx)$/) => {
  const components = [];
  const files = fs.readdirSync(path);
  files.forEach((item) => {
    const stat = fs.lstatSync(`${path}/${item}`);
    if (stat.isDirectory() === true) {
      components.push(...getFilesName(`${path}/${item}`));
    } else if (reg.test(item)) {
      components.push(item);
    }
  });
  return components;
};

/**
 * 获取path下的文件夹
 * @param path
 * @param ignorePathName 需要忽略的文件夹
 * @return {*[]}
 */
export const getFolder = (path, ignorePathName = '') => {
  const components = [];
  components.push(path);
  const files = fs.readdirSync(path);
  files.forEach((item) => {
    const stat = fs.lstatSync(`${path}/${item}`);
    if (stat.isDirectory() === true && (ignorePathName ? item !== ignorePathName : true)) {
      components.push(...getFolder(`${path}/${item}`));
    }
  });
  return components;
};

export const getPlopGeneratorData = async () => {
  const componentDirs = getFolder('src/components');
  const componentNames = getFilesName('src/components');
  const pageDirs = getFolder('src/views', 'components');
  const mockDirs = getFolder('mock');
  return {
    welcomeMessage: '请选择需要创建的模式：',
    generators: [
      { name: 'component', config: component(componentDirs, componentNames) },
      { name: 'page', config: page(pageDirs) },
      { name: 'store', config: store() },
      { name: 'mock', config: mock(mockDirs) },
    ],
  };
};
