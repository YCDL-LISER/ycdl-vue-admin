import request from '@/utils/request'

export function databaseTree(query) {
  return request({
    url: '/ycdl-admin/resource',
    method: 'get',
    params: query
  })
}

export function swaggerTree() {
  return request({
    url: '/ycdl-admin/api/document',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/ycdl-admin/resource',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/ycdl-admin/resource/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/ycdl-admin/resource/' + id,
    method: 'delete'
  })
}

export function delBatchObj(obj) {
  return request({
    url: '/ycdl-admin/resource/batches',
    method: 'delete',
    data: obj
  })
}

export function putObj(id, obj) {
  return request({
    url: '/ycdl-admin/resource/' + id,
    method: 'put',
    data: obj
  })
}

export function putObjBatch(obj) {
  return request({
    url: '/ycdl-admin/resource/batches',
    method: 'put',
    data: obj
  })
}
