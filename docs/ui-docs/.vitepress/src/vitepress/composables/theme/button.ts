import Color from 'colorjs.io';

export function vars() {
  const el: any = document.querySelector('.element-plus');
  const el2: any = document.querySelector('.el-button--large');
  const el3: any = document.querySelector('.el-button--small');
  const h = getComputedStyle(el)?.getPropertyValue(`--sdesign-color-brand-h`);
  const s = getComputedStyle(el)?.getPropertyValue(`--sdesign-color-brand-s`);
  const l = getComputedStyle(el)?.getPropertyValue(`--sdesign-color-brand-l`);
  return [
    {
      var: '--sf-color-primary',
      title: '主色',
      component: 'el-color-picker',
      value: new Color(`hsl(${h}, ${s}%, ${l}%)`).toString({ format: 'hex' }),
      isBaseColor: true
    },
    {
      var: '--sf-color-success',
      title: '成功',
      component: 'el-color-picker',
      value: getComputedStyle(el).getPropertyValue(`--sf-color-success`),
      isBaseColor: true
    },
    {
      var: '--sf-color-info',
      title: '信息',
      component: 'el-color-picker',
      value: getComputedStyle(el).getPropertyValue(`--sf-color-info`),
      isBaseColor: true
    },
    {
      var: '--sf-color-warning',
      title: '警告',
      component: 'el-color-picker',
      value: getComputedStyle(el).getPropertyValue(`--sf-color-warning`),
      isBaseColor: true
    },
    {
      var: '--sf-color-danger',
      title: '错误',
      component: 'el-color-picker',
      value: getComputedStyle(el).getPropertyValue(`--sf-color-danger`),
      isBaseColor: true
    },
    {
      var: '--sf-button-size',
      title: '尺寸(large)',
      component: 'el-input',
      dom: '.el-button--large',
      value: el2
        ? getComputedStyle(el2).getPropertyValue(`--sf-button-size`)
        : null,
      remark: '放到css的.el-button--large{}中'
    },
    {
      var: '--sf-button-size',
      title: '尺寸(small)',
      component: 'el-input',
      dom: '.el-button--small',
      value: el2
        ? getComputedStyle(el3).getPropertyValue(`--sf-button-size`)
        : null,
      remark: '放到css的.el-button--small{}中'
    }
  ];
}
