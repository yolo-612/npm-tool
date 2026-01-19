/**
 * 获取图片的宽高
 * @param file 上传资源
 * @returns 返回宽高
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const dom = document.createElement('img');
    dom.src = URL.createObjectURL(file);
    dom.onload = () => {
      const { width, height } = dom;
      dom.remove();
      resolve({ width, height });
    };
    dom.onerror = () => {
      dom.remove();
      resolve({ width: 0, height: 0 });
    };
  });
};

/** 校验图片宽高 */
/** 图片宽高限制 */
interface ImageSize {
  width?: number;
  height?: number;
}
export const validateImgDimensions = async (
  file: File,
  { width, height }: ImageSize,
): Promise<{ valid: boolean; msg?: string }> => {
  if (!width && !height) return { valid: true };
  const { width: imgWidth, height: imgHeight } = (await getImageDimensions(file)) || {};
  if (!width && height !== imgHeight) return { valid: false, msg: `请上传高度为${height}px的图片` };
  if (!height && width !== imgWidth) return { valid: false, msg: `请上传宽度为${width}px的图片` };
  if (width && height && (imgWidth !== width || imgHeight !== height)) {
    return { valid: false, msg: `请上传宽度为${width}x${height}px的图片` };
  }
  return { valid: true };
};
