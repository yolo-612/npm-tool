import { Case1Dialog, Case2Dialog } from './DialogMuster'

class DialogManager {
  taskList = []
  showTaskList = []
  showIng = false // 是否在弹窗流程中

  constructor () {}

  initTask (tasks) {
    // 排序，优先级高的排在第一个
    this.taskList = tasks.sort((a, b) => b.level - a.level)
  }

  // 处理弹窗显示隐藏逻辑
  _getShowTask (taskList) {
    return taskList.filter((item)=> item.showDialog)
  }

  startTask(refresh = false){
    if (this.showIng) return
    this.showIng = true
    // 1、先获取所有弹窗数据接口
    Promise.all(this.taskList.map(item => item.getAsyncDataPromise(refresh)))
      .then(() => {
        // 2、筛选需要弹窗的task
        this.showTaskList = this._getShowTask(this.taskList)
        let promise = Promise.resolve()

        if (this.showTaskList.length > 0) {
          // 3、通过promise的链式调用实现按顺序弹窗
          // ** 同步生成promise链条 管理顺序 **
          this.showTaskList.forEach(item => {
            promise = promise.then(() => {
              return item.show()
            })
          })
        }
        return promise
      }).catch(() => {
        // 弹窗被阻断，或者代码报错
      }).finally(() => {
        this.showIng = false
      })
  }
}

const DialogManInstance = new DialogManager()

DialogManInstance.initTask([Case1Dialog, Case2Dialog])

export default DialogManInstance