import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/ycdl-admin/role/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/ycdl-admin/role',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/ycdl-admin/role/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/ycdl-admin/role/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return request({
    url: '/ycdl-admin/role/' + id,
    method: 'put',
    data: obj
  })
}
