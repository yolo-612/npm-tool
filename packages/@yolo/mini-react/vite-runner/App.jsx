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

function Counter2() {
  const foo = (
    <div>
      foo
      <div>child1</div>
      <div>child2</div>
    </div>
  );

  const bar = <div>bar</div>;

  function handleShowBar() {
    showBar = !showBar;
    React.update();
  }

  return (
    <div>
      Counter
      <button onClick={handleShowBar}>showBar</button>
      <div>{showBar ? bar : foo}</div>
    </div>
  );
}

function CounterContainer(){
  return <Counter></Counter>
}

// const App = (<div id="app">
//     hi- react jsx {count}
//     {/* 嵌套function component */}
//     {/* <CounterContainer></CounterContainer> */}
//     <Counter num={20}></Counter>
//     {/* 多个并行的function component */}
//     {/* <Counter num={60}></Counter> */}
//   </div>)
function App(){
  return (<div id="app">
    hi- react jsx {count}
    {/* 嵌套function component */}
    {/* <CounterContainer></CounterContainer> */}
    {/* 多个并行的function component */}
    {/* <Counter num={60}></Counter> */}
    {/* 5.1: dom节点类型不一样，需要支持新增和删除 【同时也需要支持function component】 */}
    {/* <Counter num={20}></Counter> */}
    {/* 5.2: 新dom节点比旧dom节点短的时候，删除旧的中多余的节点 【同时支持删除多个同级节点】 */}
    <Counter2 num={20}></Counter2>
  </div>)
}

export default App