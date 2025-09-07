import React from './core/React.js'

let count = 10
let props = { id: "11111111111" };

function Counter({ num }){
  function handleClick(){
    console.log('click===>')
    count++
    props = {}

    React.update()
  }
  return <div {...props}>
    counter { count } 
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