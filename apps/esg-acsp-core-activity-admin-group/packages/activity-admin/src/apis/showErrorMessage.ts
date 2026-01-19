import { ElMessage } from 'element-plus';
import HttpError from '@/apis/HttpError';

export default function showErrorMessage(error: any) {
  if (!error.success && error.errorMessage) {
    // 接口异常，sucess为false时调用
    ElMessage.error(error.errorMessage);
    return;
  }
  if (error instanceof HttpError) {
    // HttpError异常,已经全局提示了，不需要单独显示
    return;
  }

  if (error instanceof Error) {
    // error异常
    ElMessage.error(error.message);
    return;
  }

  ElMessage.error(JSON.stringify(error));
}
