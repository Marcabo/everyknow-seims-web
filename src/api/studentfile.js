import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 根据 stuId 获取学生档案信息
 * @param request
 * @returns {AxiosPromise}
 */
export function getStudentFile(request) {
  return myrequest({
    url: '/studentfile/queryByStuId',
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
 * 添加 或 更新 档案信息
 * @param request
 * @returns {AxiosPromise}
 */
export function updateStudentFile(request) {
  return myrequest({
    url: '/studentfile/edit',
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
