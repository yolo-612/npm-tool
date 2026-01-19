// export { default as SaspSvgIcon } from './SaspSvgIcon.vue'
import _component from './AcspSvgIcon.vue';
import { withInstall } from '@/utils';
// 直接使用 import "virtual:svg-icons-register" 在admin项目（webpack5）中会加载不出svg
// @ts-ignore
import('virtual:svg-icons-register').then();

export const AcspSvgIcon = withInstall(_component);
export default AcspSvgIcon;
