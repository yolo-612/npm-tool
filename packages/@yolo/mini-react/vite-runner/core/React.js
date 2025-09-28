function createTextNode (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child)=>{
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextNode(child) : child
      }) 
    }
  }
}

let wipRoot = null
let currentRoot = null;
let deletions = [];
let wipFiber = null;
function render (el, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [el]
    }
  }
  nextWorkOfUnit = wipRoot
}

let nextWorkOfUnit = null

function workLoop(deadline){
  let shouldYield = false
  while(!shouldYield && nextWorkOfUnit){
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)

    if(wipRoot?.sibling?.type === nextWorkOfUnit?.type){
      nextWorkOfUnit = undefined
    }

    shouldYield = deadline.timeRemaining() < 1
  }
  if(!nextWorkOfUnit && wipRoot){
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

function commitRoot(){
  deletions.forEach(commitDeletion)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
  deletions = []
}

function commitDeletion(fiber){
  if(fiber.dom){
    // 针对function component 需要不断向上找
    let fiberParent = fiber.parent
    while(!fiberParent.dom){
      fiberParent = fiberParent.parent
    }
    fiberParent.dom.removeChild(fiber.dom)
  }else{
    // function component 无dom，需要删除它的子节点
    commitDeletion(fiber.child)
  }
}

function commitWork(fiber){
  if(!fiber) return 
  
  let fiberParent = fiber.parent
  while(!fiberParent.dom){
    fiberParent = fiberParent.parent
  }
  if(fiber.effectTag === 'update'){
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  }else if(fiber.effectTag === 'placement'){
    if(fiber.dom) {
      fiberParent.dom.append(fiber.dom)
    };
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function createDom(type){
  return type === 'TEXT_ELEMENT'
      ? document.createTextNode("")
      : document.createElement(type)
}

function updateProps(dom, nextProps, prevProps){
  // old 有， 新的没有===》删除
  Object.keys(prevProps).forEach((key)=>{
    if(key !== 'children'){
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  })
  // old 有，新的有==修改
  // old 没，新的有 ===》新增
  Object.keys(nextProps).forEach((key)=>{
    if(key !== "children"){
      if(nextProps[key]!==prevProps[key]){
        if(key.startsWith('on')){
          const eventType = key.slice(2).toLowerCase()
          dom.removeEventListener(eventType, prevProps[key])
          dom.addEventListener(eventType, nextProps[key])
        }else{
          dom[key] = nextProps[key]
        }
      }
    }
  })
}

function reconcileChildren(fiber, children){
  let oldChildFiber = fiber.alternate?.child
  let prevChild = null
  children.forEach((child, index)=>{
    const isSameType = oldChildFiber && oldChildFiber.type === child.type;
    let newFiber
    if(isSameType){
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        sibling: null,
        parent: fiber,
        dom: oldChildFiber.dom,
        effectTag: 'update',
        alternate: oldChildFiber
      }
    }else{
      if(child.type){
        newFiber = {
          type: child.type,
          props: child.props,
          child: null,
          sibling: null,
          parent: fiber,
          dom: null,
          effectTag: 'placement',
        }
      }
      if(oldChildFiber) deletions.push(oldChildFiber)
    }
    
    if(oldChildFiber){
      oldChildFiber = oldChildFiber.sibling
    }
    if(index === 0){
      fiber.child = newFiber
    }else{
      prevChild.sibling = newFiber
    }
    if(newFiber){ prevChild = newFiber }
  })

  while(oldChildFiber){
    deletions.push(oldChildFiber)
    oldChildFiber = oldChildFiber.sibling
  }
}

function updateHostComponent(fiber){
  if(!fiber.dom){
    const dom = (fiber.dom = createDom(fiber.type));
    updateProps(dom, fiber.props, {});
  }  

  const children = fiber.props.children
  reconcileChildren(fiber, children)
}

function updateFunctionComponent(fiber){
  wipFiber = fiber
  // ** update方法为什么拿到的是最新的props数据 **
  // children 每次能拿到最新的props 是因为走了function component的执行，这里会更新最新值
  // 验证，把APP换成非function component的结构，添加{count}变量 不会更新
  const children = [fiber.type(fiber.props)]
  // console.log(children, '====>>>')
  reconcileChildren(fiber, children)
}

function performWorkOfUnit (fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'

  if(isFunctionComponent){
    //  console.log(fiber.type(fiber.props), 'fiber.type()===>')
    updateFunctionComponent(fiber)
  }else{
    updateHostComponent(fiber)
  }

  if(fiber.child) return fiber.child

  let nextFiber = fiber
  while(nextFiber){
    if(nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
}

requestIdleCallback(workLoop)

function update(){
  // 调整成闭包的结构后，update在初始化的时候就已经开始执行了
  // 【相当于执行第一次render的时候记录下wipFiber ，并通过currentFiber 缓存】
  const currentFiber = wipFiber
  return ()=>{
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber
    }
    nextWorkOfUnit = wipRoot
  }
}

const React = {
  update,
  render,
  createElement,
};

export default React