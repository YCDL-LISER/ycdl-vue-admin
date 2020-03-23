import request from '@/utils/request'
import { authorization } from '@/utils/auth'
// import Qs from 'qs'

export function getIdentifyingCode(type) {
  return request({
    url: '/auth/captcha/' + type,
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    headers: {
      'Authorization': authorization
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    // data: Qs.stringify(data)
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/admin/users/information',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/oauth/token',
    method: 'delete'
  })
}

