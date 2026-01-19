import ComponentsWb from '@fpkg/components-web';
import '@fpkg/components-web/dist/lib/style.css';

console.log('导入components-web====');

export default function ({ app }:any) {
  app.use(ComponentsWb);
}
