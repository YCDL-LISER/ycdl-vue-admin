import request from '@/utils/request'
import { authorization } from '@/utils/auth'
import Qs from 'qs'

export function getIdentifyingCode(type) {
  return request({
    url: '/ycdl-auth/captcha/' + type,
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/ycdl-auth/oauth/token',
    method: 'post',
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: Qs.stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/ycdl-admin/user/information',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/ycdl-auth/oauth/logout',
    method: 'delete'
  })
}

