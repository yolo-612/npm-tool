import React from './core/React.js'

function Counter({ num }){
  return <div>counter { num }</div>
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
    <Counter num={60}></Counter>
  </div>)
}

export default App