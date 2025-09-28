import React from "./core/React.js";

let countFoo = 1;
let fooFnId = 0;
function Foo() {
  console.log("foo rerun");
  const update = React.update();

  fooFnId++;

  function handleClickFoo() {
    // console.log("click-------foo", handleClickFoo.id)
    console.log(countFoo)
    countFoo++;
    update();
  }

  // handleClickFoo.id = fooFnId
  // fooFnId++
  // console.log(handleClickFoo, handleClickFoo.id)

  return (
    <div>
      <h1>foo</h1>
      {countFoo}
      <button onClick={handleClickFoo}>click</button>
    </div>
  );
}

let countBar = 1;
function Bar() {
  console.log("bar rerun");
  const update = React.update();
  function handleClickBar() {
    countBar++;
    update();
  }

  return (
    <div>
      <h1>bar</h1>
      {countBar}
      <button onClick={handleClickBar}>click</button>
    </div>
  );
}

let countRoot = 1;
function App() {
  console.log("app rerun");

  const update = React.update();
  function handleClickApp() {
    countRoot++;
    update();
  }

  return (
    <div>
      hi-mini-react count: {countRoot}
      <button onClick={handleClickApp}>click</button>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  );
}

export default App;
