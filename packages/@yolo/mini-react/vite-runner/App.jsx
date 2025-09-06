import React from './core/React.js'

function Counter({ num }){
  function handleClick(){
    console.log('click===>')
  }
  return <div>
    counter { num } 
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
  </div>)
}

export default App