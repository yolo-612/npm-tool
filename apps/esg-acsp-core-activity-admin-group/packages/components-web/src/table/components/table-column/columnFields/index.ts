import baseFields from '@/src/fields';

const scopeFiles = import.meta.glob('./*.vue');

const columnFields = baseFields;

/* 往基础组件中添加table的组件 */
Object.entries(scopeFiles).forEach(([path, resolver]: any) => {
  const name = path.match(/\/([\w-]+)\.vue$/)?.[1] || '';
  columnFields[name] = defineAsyncComponent(resolver);
});

export default columnFields;
