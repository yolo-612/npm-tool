
let menus = []
let defaultActive = ''

const getMenuRouter = (routes)=>{
  if(!routes || routes.length===0){
    return []
  }
  return routes.filter(route=>route.meta?.menu?.show).map(route=>{
    const { meta } = route
    const { menu } = meta
    return {
      path: route.path,
      title: menu.title || meta.title,
      icon: menu.icon,
      children:getMenuRouter(route.children)
    }
  })
}

/**
 * 初始化menus
 * @param routes
 */
export const initMenus = (routes)=>{
  console.log("initMenus")
  menus = getMenuRouter(routes)

  defaultActive = location.pathname

  console.log("menus",menus)
}

export const getMenusInfo = ()=>{
  return {
    menus,
    defaultActive
  }
}
