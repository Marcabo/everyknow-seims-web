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

export function getUserProfile() {
  return myrequest({
    url: '/user/userProfile',
    method: 'post'
  })
}

/**
 * 跟新用户 个人信息
 * @param request
 * @returns {AxiosPromise}
 */
export function updateUserProfile(request) {
  return myrequest({
    url: '/user/changeProfile',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        id: request.id,
        nickname: request.nickname,
        phone: request.phone,
        email: request.email
      }
    }
  })
}

export function updatepassword(request) {
  return myrequest({
    url: '/user/changePassword',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        userId: request.id,
        oldPassword: request.oldpassword,
        newPassword: request.newpassword
      }
    }
  })
}


/**
 * 分页获取 用户信息(根据角色和条件)
 * @param request
 * @returns {AxiosPromise}
 */
export function getUserProfilePageByRole(request) {
  return myrequest({
    url: '/user/page',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "pageSize": request.pageSize,
        "requestDate": getCurrentTime(),
        "current": request.current
      },
      "request": {
        // 用户名, 用户昵称 (模糊查询)
        "rolename": request.rolename,
        "username": request.username,
        "nickname": request.nickname
      }
    }
  })
}


export function addUser(request) {
 return myrequest({
   url: '/user/addUser',
   method: 'post',
   data: {
     "eKnowRequest": {
       "organId": "NCU",
       "requestDate": getCurrentTime()
     },
     request: {
       username: request.username,
       nickname: request.nickname,
       rolename: request.rolename,
       phone: request.phone,
       email: request.email
     }
   }
 })
}

/**
 * 根据用户 id 更新用户
 * @param request
 * @returns {AxiosPromise}
 */
export function updateUser(request) {
  return myrequest({
    url: '/user/updateUser',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        id: request.id,
        nickname: request.nickname,
        phone: request.phone,
        email: request.email
      }
    }
  })
}

/**
 * 根据 用户 id 重置密码
 * @param request
 * @returns {AxiosPromise}
 */
export function resetUserPassword(request) {
  return myrequest({
    url: '/user/resetUserPassword',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        userId: request.id
      }
    }
  })
}


/**
 * 根据 用户id 删除用户
 * @param request
 * @returns {AxiosPromise}
 */
export function deleteUserById(request) {
  return myrequest({
    url: '/user/deleteUser',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        id: request.id
      }
    }
  })
}
