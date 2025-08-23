class Compile {
  constructor(el, vm){
    this.$el = document.querySelector(el)
    this.$vm = vm

    if(this.$el){
      this.compile(this.$el)
    }
  }

  compile(el){
    const childNodes = el.childNodes
    console.log(childNodes, '=====>')
  }
}