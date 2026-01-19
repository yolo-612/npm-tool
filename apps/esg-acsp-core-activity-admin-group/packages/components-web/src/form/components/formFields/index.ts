import { defineAsyncComponent } from 'vue';
import baseFields from '@/src/fields';

const scopeFiles = import.meta.glob('./*.vue');

const formFields = baseFields;

/* 往基础组件中添加form的个性的组件 */
Object.entries(scopeFiles).forEach(([path, resolver]: any) => {
  const name = path.match(/\/([\w-]+)\.vue$/)?.[1] || '';
  formFields[name] = defineAsyncComponent(resolver);
});
export default formFields;
