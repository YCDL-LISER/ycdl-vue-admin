import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/ycdl-holloo/vehicle',
    method: 'get',
    params: query
  })
}

export function getObj(id) {
  return request({
    url: '/ycdl-holloo/vehicle/' + id,
    method: 'get'
  })
}

export function clearObj(obj) {
  return request({
    url: '/ycdl-holloo/vehicle/batch',
    method: 'delete',
    data: obj
  })
}
