// 解析模板语法
// 1.处理插值表达式{{}}
// 2.处理指令和事件
// 3.以上两者初始化和更新
export class Compile {
  /**
   * @param {*} el 宿主元素
   * @param {*} vm vue实例
   */
  constructor(el, vm){
    this.$el = document.querySelector(el)
    this.$vm = vm

    if(this.$el){
      this.compile(this.$el)
    }
  }

  compile(el){
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      // 这个分支代表节点的类型是元素
      if (node.nodeType === 1) { 
        // 获取到元素上的属性
        const attrs = node.attributes
        // 把 attrs 转换成真实数组
        Array.from(attrs).forEach(attr => {
          // 指令长 my-xxx = 'abc'  这个样子
          // 获取节点属性名
          const attrName = attr.name
          // 获取节点属性值
          const exp = attr.value
          // 判断节点属性是不是一个指令
          if (attrName.startsWith('my-')) {
            // 获取具体的指令类型 也就是 my-xxx 后面的 xxx 部分
            const dir = attrName.substring(3)
            // 如果this[xxx]指令存在  执行这个指令
            this[dir] && this[dir](node, exp)
          }
        })
      }else if(this.isInter(node)){
        // 文本的初始化
        this.compileText(node)
      }

      // 递归遍历 dom 树
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 编译文本
  compileText(node) {
    // **RegExp.$1 表示最近一次正则匹配中第一个捕获分组的内容 **
    // 可以通过 RegExp.$1 来获取到 插值表达式中间的内容 {{key}}
    // this.$vm[RegExp.$1] 等价于 this.$vm[key]
    // 然后把这个 this.$vm[key] 的值 赋值给文本 就完成了 文本的初始化
    node.textContent = this.$vm[RegExp.$1]
  }

  // my-text 指令对应的方法
  text(node, exp) {
    // 这个指令用来修改节点的文本,这个指令长这样子 my-text = 'key'
    // 把 this.$vm[key] 赋值给文本 即可
    node.textContent = this.$vm[exp]
  }

  // my-html 指令对应的方法
  html(node, exp) {
    // 这个指令用来修改节点的文本,这个指令长这样子 my-html = 'key'
    // 把 this.$vm[key] 赋值给innerHTML 即可
    node.innerHTML = this.$vm[exp]
  }

  // 是否是插值表达式{{}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}