/**
 * 页面状态
 */
export enum PageStates {
  Success = 'success',
  Loading = 'loading',
  Error = 'error',
  NoPermission = 'no_permission',
}

export default function usePageState() {
  const pageState = ref<PageStates>(PageStates.Loading);

  const setPageState = (newState: PageStates) => {
    pageState.value = newState;
  };

  return {
    pageState,
    setPageState,
  };
}
