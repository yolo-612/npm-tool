const modules: any = import.meta.glob('../layouts/*.vue', { eager: true });

const layouts:Record<string, any> = {};

Object.keys(modules).forEach((key) => {
  const mat = key.match(/^.*\/(\w+)\.vue$/);
  if (mat && mat[1]) {
    layouts[mat[1]] = modules[key];
  }
});

console.log('layouts', layouts);

export default layouts;
