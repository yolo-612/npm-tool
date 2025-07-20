
import { defineAsyncComponent } from 'vue';

// @ts-ignore
const files = import.meta.glob('./components/*.vue');

const components: { [key: string]: any } = {};

Object.entries(files).forEach(([path, resolver]:any) => {
  const name = path.match(/\/([\w-]+)\.vue$/)?.[1] || '';
  components[name] = defineAsyncComponent(resolver);
});

export default components;

export * from './types';
