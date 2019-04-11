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
  loadRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      loadRoutes().then(response => {
        const { data } = response
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
