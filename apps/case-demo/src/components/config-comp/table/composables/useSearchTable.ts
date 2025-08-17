import type { Ref } from 'vue';
import type { IPageInfo, ElPaginationProps } from '@/components/config-comp/table/types';

/** 入参 */ 
export interface ISearchTableParams {
  searchAction:  (page: IPageInfo, action: string) => Promise<{ totalSize: number; list: any[] }>;
  headerRef?: Ref<any | null>;
  pagination?: ElPaginationProps;
}

/* 出参 */
export interface ISearchTableReturns {
  tableData: Ref<any[]>;
  pageInfo: IPageInfo;
  loading: Ref<boolean>;
  onSearch: () => Promise<void>;
  onReset: () => void;
  onPageChange: (params: IPageInfo) => Promise<void>;
  fetchData: (actionKey: string) => Promise<void>;
}

export function useSearchTable(params: ISearchTableParams) : ISearchTableReturns {
  const { searchAction, headerRef, pagination } = params;
  /* 表格数据 */
  const tableData = ref<any>([]);
  /* 表格loading */
  const loading = ref(false);

  /* 分页数据 */
  const pageInfo = reactive({
    pageNum: pagination?.defaultCurrentPage || 1,
    pageSize: pagination?.defaultPageSize || 10,
    total: 0,
  });

  /** 请求表格数据 */ 
  async function fetchData(actionKey = 'search') {
    if (headerRef?.value) {
      const res = await headerRef.value?.validateSearchData();
      if (!res) return;
    }
    loading.value = true;
    const { list, totalSize } = await searchAction(pageInfo, actionKey) || {};
    loading.value = false;
    tableData.value = list || [];
    pageInfo.total = totalSize || 0;
  }
  /** 搜索方法 */ 
  const onSearch = async () => {
    pageInfo.pageNum = pagination?.defaultCurrentPage || 1;
    await fetchData('search');
  };

  /** 重置方法 */ 
  const onReset = async () => {
    if (headerRef?.value) {
      headerRef.value?.resetSearchData();
    }
    pageInfo.pageNum = pagination?.defaultCurrentPage || 1;
    pageInfo.pageSize = pagination?.defaultPageSize || 10;
    await fetchData('reset');
  };

  /* 处理页码变动 */
  const onPageChange = async (page: IPageInfo) => {  
    pageInfo.pageNum = page.pageNum;
    pageInfo.pageSize = page.pageSize;
    await fetchData('pageChange');
  }

  return {
    tableData,
    pageInfo,
    loading,
    onSearch,
    onReset,
    onPageChange,
    fetchData,
  }
}