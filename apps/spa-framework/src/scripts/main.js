// 测试动态 import
import('./module1/testSupEs2020.js')
  .then((module) => {
    console.log('导入成功', module);
  })
  .catch((err) => {
    console.error('导入失败', err);
  });

// 测试eslint规则 
const a = 10;
const app = document.getElementById('app');
app.innerHTML = 'Hello SPA Framework！';
