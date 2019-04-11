import request from '@/utils/request'

/**
 * 从服务器获取路由信息
 */
export function loadRoutes() {
  return request({
    url: '/ycdl-admin/menu/sidebar',
    method: 'get'
  })
}

export function tree() {
  return request({
    url: '/ycdl-admin/menu/tree',
    method: 'get'
  })
}

export function postOne(obj) {
  return request({
    url: '/ycdl-admin/menu',
    method: 'post',
    data: obj
  })
}

export function getOne(id) {
  return request({
    url: '/ycdl-admin/menu/' + id,
    method: 'get'
  })
}

export function deleteOne(id) {
  return request({
    url: '/ycdl-admin/menu/' + id,
    method: 'delete'
  })
}

export function putOne(id, obj) {
  return request({
    url: '/ycdl-admin/menu/' + id,
    method: 'put',
    data: obj
  })
}
