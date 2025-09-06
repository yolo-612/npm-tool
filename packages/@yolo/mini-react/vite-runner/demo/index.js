let taskId = 1  

function workLoop(deadline){
  taskId++
  let shouldYield = false
  while(!shouldYield){
    // run task
    console.log('====>', taskId)
    if(deadline.timeRemaining() < 1) shouldYield = true;
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)