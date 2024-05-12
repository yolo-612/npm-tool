import { ref } from 'vue'
import { defineStore } from 'pinia'
import { routes } from '@/router/routes';


const useMenuStore = defineStore('menu', () => {
  const menuTree = ref([])

  const getMenuRouter = (routes)=>{
    if(!routes || routes.length===0){
      return []
    }

    const list = []
    routes.map(route=>{
      const { meta={} } = route
      // TODO: 这里可以结合权限一起玩
      if(!meta.hideInMenu && meta.permission){
        list.push({
          path: route.path,
          title: meta.title || '',
          icon: meta.icon,
          children: getMenuRouter(route.children)
        })
      }
    })

    return list
  }

  menuTree.value = getMenuRouter(routes)

  return {
    menuTree,
  }
})

export default useMenuStore
