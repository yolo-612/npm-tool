import baseFields from '@/components/config-comp/fields/index';

const scopeFiles = import.meta.glob('./*.vue');

const columnFiles = baseFields;

Object.entries(scopeFiles).forEach(([path, resolver]) => {
  const name = path.match(/\/([\w-]+)\.vue$/)?.[1] || '';
  columnFiles[name] = defineAsyncComponent(resolver);
})

export default columnFiles;


