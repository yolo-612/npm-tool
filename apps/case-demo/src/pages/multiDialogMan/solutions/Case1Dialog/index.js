import DialogTask from '../DialogTask'
import Case1Dialog from './Case1Dialog.vue'

export default new DialogTask({
  key: 'Case1Dialog',
  name: '案例1弹窗',
  type: 'OPERATION', // 弹窗类型
  level: 10, // 层级
  compOptions: Case1Dialog, 
  asyncData: () => {
    return Promise.resolve().then(() => {
      return {
        showDialog: true, // 是否显示弹窗
        data: { obj: ['dialog', 'yolo'] }, // 业务数据
      }
    })
  }
})