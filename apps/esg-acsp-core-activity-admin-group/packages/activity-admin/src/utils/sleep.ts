/**
 * @param time 单位毫秒
 * @return {Promise<void>}
 */
export default function sleep(time = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
