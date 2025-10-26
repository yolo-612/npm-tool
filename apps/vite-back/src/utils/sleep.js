/**
 *
 * @param time 单位毫秒
 * @return {Promise<unknown>}
 */
export default function sleep(time=1000){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    },time)
  })
}
