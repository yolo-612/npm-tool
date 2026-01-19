// export { default as Resize } from './resize';
// export { default as Debounce } from './debounce';
import vResize from './resize';
import vDebounce from './debounce';

export default {
  install(app: any) {
    app.directive('resize', vResize);
    app.directive('debounce', vDebounce);
  },
};
