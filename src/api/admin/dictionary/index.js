import request from '@/utils/request'

export function loadDictionaryCode() {
  return request({
    url: '/admin/dictionary/code',
    method: 'get'
  })
}

export function loadDictionaryList() {
  return request({
    url: '/admin/dictionary/list',
    method: 'get'
  })
}
