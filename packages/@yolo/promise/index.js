class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(fn){
    this.PromiseState = MyPromise.PENDING
    this.PromiseResult = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    try{
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch(error){
      this.reject(error)
    }
  }

  resolve(result){
    if(this.PromiseState === MyPromise.PENDING){
      this.PromiseState = MyPromise.FULFILLED
      this.PromiseResult = result
      this.onFulfilledCallbacks.forEach((callback)=>{
        callback(this.PromiseResult)
      })
    }
  }

  reject(reason){
    if(this.PromiseState === MyPromise.PENDING){
      this.PromiseState = MyPromise.REJECTED
      this.PromiseResult = reason
      this.onRejectedCallbacks.forEach((callback)=>{
        callback(this.PromiseResult)
      })
    }
  }

  then(onFulfilled, onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason)=> {
      throw reason
    }
    if(this.PromiseState === MyPromise.PENDING){
      this.onFulfilledCallbacks.push(()=>{
        setTimeout(()=>{
          onFulfilled(this.PromiseResult);
        })
      })
      this.onRejectedCallbacks.push(()=>{
        setTimeout(()=>{
          onRejected(this.PromiseResult);
        })
      })
    }
    // 下面这两段分支还是需要的，为了防止以下现象：
    // then方法在resolve状态结束后再执行(**)
    // const p = new MyPromise((resolve, reject) => {
    //   resolve('OK')
    // });

    // setTimeout(() => {
    //   p.then(res => console.log('结果:', res));
    // }, 1000);
    if(this.PromiseState === MyPromise.FULFILLED){
      setTimeout(()=>{
        onFulfilled(this.PromiseResult)
      })
    }
    if(this.PromiseState === MyPromise.REJECTED){
      setTimeout(()=>{
        onRejected(this.PromiseResult)
      })
    }
  }
}


const promise1 = new MyPromise((resolve, reject)=>{
  resolve('执行成功')
  reject(new Error('error exec'))
})

promise1.then((data)=>{
  console.log(data, 'then==>first执行')
}, (error)=>{
  console.log(error, 'reject === > error')
})

