import DialogTask from '../DialogTask'
import Case2Dialog from './Case2Dialog.vue'

export default new DialogTask({
  key: 'Case2Dialog',
  name: '案例2弹窗',
  type: 'OPERATION', // 弹窗类型
  level: 12, // 层级
  compOptions: Case2Dialog, 
  asyncData: () => {
    return Promise.resolve().then(() => {
      return {
        showDialog: true, // 是否显示弹窗
        data: { obj: ['confirm', 'yolo'] }, // 业务数据
      }
    })
  }
})