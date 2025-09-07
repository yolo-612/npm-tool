import React from './core/React.js'

let count = 10
let props = { id: "11111111111" };
let showBar = false;

function Counter({ num }){
  function handleClick(){
    console.log('click===>')
    // 节点类型一致，props值变化，props更新，
    count++
    // 节点类型一致，props属性变少，props更新，
    props = {}
    // 节点类型不一致，dom更新
    showBar = !showBar;
    React.update()
  }

  // const foo = <div>foo</div>;
  function Foo () {
    return <div>foo</div>
    
  }
  const bar = <p>bar</p>;

  return <div {...props}>
    counter { count } 
    {/* <div>{showBar ? bar : foo}</div> */}
    <div>{showBar ? bar : <Foo></Foo>}</div>
    <button onClick={handleClick}>click</button>
  </div>
}

function CounterContainer(){
  return <Counter></Counter>
}

function App(){
  return (<div id="app">
    hi- react jsx
    {/* 嵌套function component */}
    {/* <CounterContainer></CounterContainer> */}
    <Counter num={20}></Counter>
    {/* 多个并行的function component */}
    {/* <Counter num={60}></Counter> */}
  </div>)
}

export default App