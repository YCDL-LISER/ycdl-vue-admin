import request from '@/utils/request'

/**
 * 从服务器获取路由信息
 */
export function loadRoutes(role) {
  return request({
    url: '/admin/menus/sidebar/' + role,
    method: 'get'
  })
}

export function fetchMenuTree(query) {
  return request({
    url: '/admin/menus/tree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/menus',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/menus/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/menus/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/menus',
    method: 'put',
    data: obj
  })
}
