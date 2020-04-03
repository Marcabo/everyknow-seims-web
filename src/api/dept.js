import {myrequest} from "@/utils/myrequest";

import {getCurrentTime} from "@/utils";

/**
 * 获取专业列表
 * @returns {AxiosPromise}
 */
export function getDeptList() {
  return myrequest({
    url: '/dept/queryAll',
    method: 'post'
  })
}

/**
 * 根据 collegeCode 获取专业列表
 * @returns {AxiosPromise}
 */
export function getDeptListByCollegeCode(request) {
  return myrequest({
    url: '/dept/queryListByCollegeCode',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "collegeCode": request.collegeCode
      }
    }
  })
}

/**
 * 条件获取专业列表
 * @param request
 * @returns {AxiosPromise}
 */
export function getDeptListByCondition(request) {
  return myrequest({
    url: '/dept/queryListByCondition',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "deptName": request.deptName,
        "collegeCode": request.collegeCode
      }
    }
  })
}



/**
 * 添加学院
 * @param request
 * @returns {AxiosPromise}
 */
export function addDept(request) {
  return myrequest({
    url: '/dept/insert',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "deptCode": request.deptCode,
        "deptName": request.deptName,
        "collegeCode": request.collegeCode,
      }
    }
  })
}

/**
 * 根据 id 更新学院
 * @param request
 * @returns {AxiosPromise}
 */
export function updateDept(request) {
  return myrequest({
    url: '/dept/updateById',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "id": request.id,
        "deptCode": request.deptCode,
        "deptName": request.deptName,
        "collegeCode": request.collegeCode,

      }
    }
  })
}

/**
 * 根据 id 删除学院
 * @param request
 * @returns {AxiosPromise}
 */
export function deleteDeptById(request) {
  return myrequest({
    url: '/dept/deleteById',
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

// /**
//  * 根据 collegeName 模糊搜索
//  * @param request
//  * @returns {AxiosPromise}
//  */
// export function queryByName(request) {
//   return myrequest({
//     url: '/dept/queryByName',
//     method: 'post',
//     data: {
//       "eKnowRequest": {
//         "organId": "NCU",
//         "requestDate": getCurrentTime()
//       },
//       "request": {
//         "deptName": request.deptName
//       }
//     }
//   })
// }
