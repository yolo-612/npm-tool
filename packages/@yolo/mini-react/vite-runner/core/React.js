const createTextNode = (text)=> {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child)=>{
        return typeof child === 'string' ? createTextNode(child) : child
      }) 
    }
  }
}



const render = (el, container) =>{
  // （1）创建dom节点 
  const dom = el.type === 'TEXT_ELEMENT'
      ? document.createTextNode("")
      : document.createElement(el.type)   
  
  // （2）更新props属性 
  Object.keys(el.props).forEach((key)=>{
    if(key !== "children"){
      dom[key] = el.props[key]
    }
  })
  // （3）处理子节点
  const children = el.props.children;
  children.forEach((child)=>{
    render(child, dom)
  })

  container.append(dom)
}

const React = {
  render,
  createElement,
};

export default React