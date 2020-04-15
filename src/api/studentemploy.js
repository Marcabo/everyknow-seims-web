import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 根据 stuId 获取学生就业信息
 * @param request
 * @returns {AxiosPromise}
 */
export function getStudentEmploy(request) {
  return myrequest({
    url: '/studentemploy/queryByStuId',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        stuId: request.stuId
      }
    }
  })
}

/**
 * 添加 或 更新 就业信息
 * @param request
 * @returns {AxiosPromise}
 */
export function updateStudentEmploy(request) {
  return myrequest({
    url: '/studentemploy/edit',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        ...request
      }
    }
  })
}
