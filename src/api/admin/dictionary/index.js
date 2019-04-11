import request from '@/utils/request'

export function loadDictionaryCode() {
  return request({
    url: '/ycdl-admin/dictionary/code',
    method: 'get'
  })
}

export function loadDictionaryList() {
  return request({
    url: '/ycdl-admin/dictionary/list',
    method: 'get'
  })
}
