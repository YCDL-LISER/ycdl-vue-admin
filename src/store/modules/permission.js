import { constantRoutes, formattedRouter } from '@/router'
import { loadRoutes } from '@/api/admin/menu'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  loadRoutes({ commit }, role) {
    console.log('参数：' + JSON.stringify(role))
    return new Promise((resolve, reject) => {
      loadRoutes(role).then(response => {
        const { data } = response
        console.log('加载异步菜单：' + JSON.stringify(data.data))
        const finalRouters = formattedRouter(data.data)
        const notFound = { path: '*', redirect: '/404', hidden: true }
        finalRouters.push(notFound)
        commit('SET_ROUTES', finalRouters)
        resolve(finalRouters)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
