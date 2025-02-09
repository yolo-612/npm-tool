import { ref } from 'vue'
import { defineStore } from 'pinia'
import { routes } from '@/router/routes';
import usePermission from '@/hook/usePermission';


const useMenuStore = defineStore('menu', () => {
  const menuTree = ref([])
  const permission = usePermission()

  const getMenuRouter = (routes)=>{
    if(!routes || routes.length===0){
      return []
    }

    const list = []
    routes.map(route=>{
      const { meta={} } = route
      if(!meta.hideInMenu && permission.checkPermission(meta.permission || [])){
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
