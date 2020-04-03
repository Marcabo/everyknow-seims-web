import {myrequest} from "@/utils/myrequest";

import {getCurrentTime} from "@/utils";

/**
 * 获取学院列表
 * @returns {AxiosPromise}
 */
export function getCollegeList() {
  return myrequest({
    url: '/college/queryAll',
    method: 'post'
  })
}

/**
 * 添加学院
 * @param request
 * @returns {AxiosPromise}
 */
export function addCollege(request) {
  return myrequest({
    url: '/college/insert',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "collegeCode": request.collegeCode,
        "collegeName": request.collegeName
      }
    }
  })
}

/**
 * 根据 id 更新学院
 * @param request
 * @returns {AxiosPromise}
 */
export function updateCollege(request) {
  return myrequest({
    url: '/college/updateById',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "id": request.id,
        "collegeCode": request.collegeCode,
        "collegeName": request.collegeName,
      }
    }
  })
}

/**
 * 根据 id 删除学院
 * @param request
 * @returns {AxiosPromise}
 */
export function deleteCollegeById(request) {
  return myrequest({
    url: '/college/deleteById',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "id": request.id
      }
    }
  })
}

/**
 * 根据 collegeName 模糊搜索
 * @param request
 * @returns {AxiosPromise}
 */
export function queryByName(request) {
  return myrequest({
    url: '/college/queryByName',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "collegeName": request.collegeName
      }
    }
  })
}
