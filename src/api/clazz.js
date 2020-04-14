import {myrequest} from "@/utils/myrequest";

import {getCurrentTime} from "@/utils";

/**
 * 分页获取班级列表
 * @returns {AxiosPromise}
 */
export function getClazzPage(request) {
  return myrequest({
    url: '/clazz/page',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "pageSize": request.pageSize,
        "requestDate": getCurrentTime(),
        "current": request.current
      }
    }
  })
}

/**
 * 分页模糊查询获取班级列表
 * @returns {AxiosPromise}
 */
export function getClazzPageByCondition(request) {
  return myrequest({
    url: '/clazz/queryPageByCondition',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "pageSize": request.pageSize,
        "requestDate": getCurrentTime(),
        "current": request.current
      },
      "request": {
        "clazzName": request.clazzName,
        "collegeCode": request.collegeCode,
        "deptCode": request.deptCode
      }
    }
  })
}

export function getClazzListByDeptCode(request) {
  return myrequest({
    url: 'clazz/queryListByDeptCode',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "deptCode": request.deptCode
      }
    }
  })

}


/**
 * 添加班级
 * @param request
 * @returns {AxiosPromise}
 */
export function addClazz(request) {
  return myrequest({
    url: '/clazz/insertBatch',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "clazzName": request.clazzName,
        "deptCode": request.deptCode,
        "collegeCode": request.collegeCode,
      }
    }
  })
}

/**
 * 根据 id 更新班级
 * @param request
 * @returns {AxiosPromise}
 */
export function updateClazz(request) {
  return myrequest({
    url: '/clazz/updateById',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "id": request.id,
        "clazzName": request.clazzName,
        "deptCode": request.deptCode,
        "collegeCode": request.collegeCode,

      }
    }
  })
}

/**
 * 根据 id 删除班级
 * @param request
 * @returns {AxiosPromise}
 */
export function deleteClazzById(request) {
  return myrequest({
    url: '/clazz/deleteById',
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
