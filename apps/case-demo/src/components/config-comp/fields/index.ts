const modules = import.meta.glob('./components/*.vue')

const components: Record<string, any> = {}
Object.entries(modules).forEach(([path, resolver]) => {
  const name = path.match(/\/([\w-]+)\.vue$/)?.[1] || '';
  components[name] = defineAsyncComponent(resolver);
})

export default components