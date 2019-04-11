import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/ycdl-admin/user',
    method: 'get',
    params: query
  })
}

export function getUserRoles(userId) {
  return request({
    url: '/ycdl-admin/role/users/' + userId,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/ycdl-admin/user',
    method: 'post',
    data: obj
  })
}

export function assignRoles(userId, obj) {
  return request({
    url: '/ycdl-admin/role/users/' + userId,
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/ycdl-admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/ycdl-admin/user/' + id,
    method: 'delete'
  })
}

export function removeRoles(userId, obj) {
  return request({
    url: '/ycdl-admin/role/users/' + userId,
    method: 'delete',
    data: obj
  })
}

export function putObj(id, obj) {
  return request({
    url: '/ycdl-admin/user/' + id,
    method: 'put',
    data: obj
  })
}
