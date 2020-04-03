import request from '@/utils/request'
import {myrequest} from '@/utils/myrequest'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function testget() {
 return myrequest({
   url: '/location/getProvinces',
   method: 'post',
   // data: {
   //   "eKnowRequest": {
   //     "organId": "NCU",
   //     "requestDate": "2020-03-24"
   //   },
   //   "request": {
   //
   //   }
   // }
 })
}
