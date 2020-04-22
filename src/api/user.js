import request from '@/utils/request'
import {myrequest} from '@/utils/myrequest'
import {getCurrentTime} from "@/utils";

export function login(request) {
  return myrequest({
    url: '/user/login',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request
    }
  })
}

export function getInfo(token) {
  return myrequest({
    url: '/user/currentUserInfo',
    method: 'post',
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
