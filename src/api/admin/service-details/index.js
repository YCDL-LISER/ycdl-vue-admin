import request from '@/utils/request'

export function serviceDetails() {
  return request({
    url: '/uus/service-details',
    method: 'get'
  })
}
