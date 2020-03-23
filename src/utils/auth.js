import Cookies from 'js-cookie'
import Base64JS from 'js-base64'

const TokenKey = 'Admin-Token'
const Base64 = Base64JS.Base64

export const oauth2 = {
  client_id: 'vueApp',
  client_secret: 'webApp'
}

export const authorization = 'Basic ' + Base64.encode(oauth2.client_id + ':' + oauth2.client_secret)

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
