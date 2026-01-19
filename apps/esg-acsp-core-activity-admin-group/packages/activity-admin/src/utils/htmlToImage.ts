/**
 * @description 获取dom的截图
 */

import html2canvas from 'html2canvas';
import { postUploadFile } from '@/apis/methods/activity/business';

/**
 * base64 转 blob
 * @param base64 字符串
 * @param mimeType MIME 类型
 */
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(',')[1]); // 去掉头部并解码 Base64
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mimeType });
};

/**
 * html 转图片
 * @param element 需要截图的dom元素
 * @returns 图片地址
 */
export const htmlToImage = async (element: HTMLElement) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 1, // 提高清晰度
      useCORS: true, // 允许跨域
    });
    const coverImage = canvas.toDataURL('image/jpg'); // 转换为 base64 图片
    // 将 dataUrl 转换为 Blob
    const blob = base64ToBlob(coverImage, 'image/jpg');
    // 创建 FormData 并添加文件
    const formData = new FormData();
    formData.append('file', blob, 'cover.jpg'); // 第三个参数是文件名
    // 上传到服务器
    const { obj = {} } = await postUploadFile(formData); // 假设 postUploadFile 返回上传后的文件 URL
    if (obj.url) return obj.url;
    return '';
  } catch (err) {
    console.error('HTML 转图片失败:', err);
    return '';
  }
};
