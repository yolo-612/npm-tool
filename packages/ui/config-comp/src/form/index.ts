import _ConfigForm from './ConfigForm.vue';
import { withInstall } from '@/utils';

export * from './types'

export const ConfigForm = withInstall(_ConfigForm);
export default ConfigForm;