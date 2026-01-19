/* 面包屑 */
export interface BreadcrumbItem {
  path: string;
  title: string;
}

/* 分页参数 */
export interface IPageParams {
  /* 当前页码 */
  pageNum: number;
  /* 每页条数 */
  pageSize: number;
}

/* 列表返回 */
export interface IResList<T> {
  /* 总条数 */
  totalSize: number;
  /* 数据 */
  list: T[];
}
