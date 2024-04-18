class User{
  async init(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve('vite')
      },1000)
    })

  }
}


export const appUser = new User()
