import React from './core/React.js'

function Counter(){
  return <div>counter</div>
}

function CounterContainer(){
  return <Counter></Counter>
}

function App(){
  return (<div id="app">
    hi- react jsx
    {/* 嵌套function component */}
    {/* <CounterContainer></CounterContainer> */}
    <Counter></Counter>
  </div>)
}

export default App