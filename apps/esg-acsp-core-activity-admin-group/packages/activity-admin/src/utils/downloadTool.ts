// 前端生成excel
import { utils, writeFile } from 'xlsx';
/** 全局的下载文件 */
import { ElMessageBox, ElMessage } from 'element-plus';
import { asyncDownloadFile } from '@/apis/methods/common';
import type { IDownloadFileParam } from '@/apis/methods/common/types';

/**
 * list转换成excel并下载
 */
export function exportDataByExcel(list: any[], fileName: string) {
  // 创建sheet
  const ws = utils.aoa_to_sheet(list || []);
  // 创建workbook
  const wb = utils.book_new();
  // 把sheet文件放入workbook
  utils.book_append_sheet(wb, ws, 'sheet1');
  // 写入文件
  writeFile(wb, fileName);
}

/* 全局异步下载文件 */
export const globalDownloadAsync = async <T>(params: IDownloadFileParam<T>) => {
  try {
    await asyncDownloadFile(params);
    ElMessageBox({
      title: '下载任务已执行',
      message: '请到<月结客户运营管理平台-上传下载管理-下载任务>查看下载结果',
      confirmButtonText: '去查看',
      showCancelButton: true,
      cancelButtonText: '关闭',
      callback: (action: string) => {
        if (action === 'confirm') {
          window.open(`${window.location.origin}/activity/`);
        }
      },
    });
  } catch (error: any) {
    ElMessage.error(error?.message || '下载失败');
  }
};
