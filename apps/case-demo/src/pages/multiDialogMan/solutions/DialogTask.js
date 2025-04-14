import dialogParentElement from './dialogParentElement'

export default class DialogTask {
  key = ''; // 弹窗key
  name = ''; // 弹框名称
  type = ''; // 弹窗类型
  level = 0; // 层级

  compOptions = null; // 对应组件
  compVm = null; // 组件实例
  parentElement = null;

  showDialog = false; // 是否显示弹窗：asyncData返回的showDialog
  data = null; // 弹窗数据，asyncData返回的data
  /**
   * 获取数据方法(缓存判断、开关接口),最后返回是否显示弹窗showDialog和data对象，data会传给组件的showData方法
   * @param refresh 强制刷新
   * @returns {Promise<{showDialog: boolean, data: {a: number}}>}
   */
  asyncData (refresh) {
    return Promise.resolve().then(() => {
      return {
        showDialog: true, // 是否显示弹窗
        data: { a: 1 }, // 业务数据
      }
    })
  }

  showDialogResolve = null;
  showDialogReject = null;
  showDialogPromise = null; // 弹窗promise
  asyncDataPromise = null; // 获取数据promise

  constructor ({ key, name, type, level, compOptions, asyncData, parentElement } = {}) {
    this.key = key
    this.name = name
    this.type = type
    this.level = level
    this.compOptions = compOptions
    this.parentElement = parentElement || dialogParentElement
    this.asyncData = asyncData
  }

  /**
   * 获取异步数据Promise
   * 主要获取showDialog【是否展示弹窗】 和 data【弹窗展示数据】
   * @param refresh 重新获取数据，否则，会复用asyncDataPromise
   * @returns {Promise}
   */
  getAsyncDataPromise (refresh = false) {
    if (!this.asyncDataPromise || refresh) {
      this.asyncDataPromise = this.asyncData(refresh)
        .catch(() => ({ showDialog: false, data: null })) // 预防loadData的reject中断整个promise.all
        .then(({showDialog, data}) => {
          // 将返回接口设置到task上
          this.showDialog = showDialog
          this.data = data
          return { showDialog, data }
        })
    }
    return this.asyncDataPromise
  }

  show () {
    this.showDialogPromise = new Promise((resolve, reject) => {
      this.showDialogResolve = resolve
      this.showDialogReject = reject

      // 显示，挂载组件
      this.compVm = createApp(this.compOptions,  {
        onClose: (payload) => {
          this.close(payload.type, payload.action);
        }
      })
      this.compVm.mount(this.parentElement).show({
        showDialog: this.showDialog,
        data: this.data,
      })
    })
    return this.showDialogPromise
  }

  /**
   * 关闭弹窗
   * @param type 关闭类型，break=阻断后面的弹窗
   * @param action 关闭行为(场景)，close:关闭 click:点击
   */
  close (type = '', action = '') {
    if (['click', 'close'].indexOf(action) === -1) return
    if (this.compVm) {
      // 销毁组件
      this.compVm.unmount()
      // if (this.parentElement.contains(this.compVm.$el)) {
      //   this.parentElement.removeChild(this.compVm.$el)
      // }
      this.compVm = null
    }
    // 加一点延迟，下一个弹窗体验更好
    setTimeout(() => {
      if (type === 'break') {
        this.showDialogReject && this.showDialogReject()
      } else {
        this.showDialogResolve && this.showDialogResolve()
      }
    }, 300)
  }
}