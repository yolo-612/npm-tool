// import http from '@fpkg/http';
// import qs from 'qs';



// /**
//  * 使用http请求组件
//  * @url https://confluence.sf-express.com/pages/viewpage.action?pageId=366647890
//  */
// export default function ({router,app,pinia}) {

//   // 请求拦截器
//   http.axiosInstance.interceptors.request.use(function(config){
//     const { headers = {}, method = 'get' } = config;
//     const contentType = headers['content-type'] || '';
//     const isFormData = Object.prototype.toString.call(config.data) === '[object FormData]';
//     if (!isFormData && /post|put|delete/i.test(method) && /application\/x-www-form-urlencoded/.test(contentType)) {
//       config.data = qs.stringify(config.data); // 序列化
//     }

//     config.timeout = config.timeout === undefined ? 15000 : config.timeout;
//     config.responseType = config.responseType || 'json';

//     return config
//   },function(err){
//     return Promise.reject(err)
//   });

//   // 响应拦截器
//   http.axiosInstance.interceptors.response.use(function(res){
//     return res
//   },function(err){
//     return Promise.reject(err)
//   });

// }
