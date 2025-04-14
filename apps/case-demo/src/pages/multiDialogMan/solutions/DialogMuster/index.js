import DialogTask from '../DialogTask'
import DialogComp from './DialogComp.vue'

const Case1Dialog = new DialogTask({
  key: 'Case1Dialog',
  name: '案例1弹窗',
  type: 'OPERATION', // 弹窗类型
  level: 10, // 层级
  compOptions: DialogComp, 
  compProps: {
    name: '案例1弹窗',
    width: 1000
  },
  asyncData: () => {
    return Promise.resolve().then(() => {
      return {
        showDialog: true, // 是否显示弹窗
        data: { obj: ['dialog', 'yolo'] }, // 业务数据
      }
    })
  }
})


const Case2Dialog =  new DialogTask({
  key: 'Case2Dialog',
  name: '案例2弹窗',
  type: 'OPERATION', // 弹窗类型
  level: 12, // 层级
  compOptions: DialogComp, 
  asyncData: () => {
    return Promise.resolve().then(() => {
      return {
        showDialog: true, // 是否显示弹窗
        data: { obj: ['confirm', 'yolo'] }, // 业务数据
      }
    })
  }
})

export {
  Case1Dialog,
  Case2Dialog
}