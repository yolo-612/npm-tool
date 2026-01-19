import _PureTable from './PureTable.vue';
import _SearchTable from './SearchTable.vue';
import { withInstall } from '@/utils';

export const PureTable = withInstall(_PureTable);
export const SearchTable = withInstall(_SearchTable);
export default SearchTable;

export * from './types';
