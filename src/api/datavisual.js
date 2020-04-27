import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 获取可视化数据
 * @param request
 * @returns {AxiosPromise}
 */
export function getDataVisual(request) {
  return myrequest({
    url: '/datavisual/get',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        graduationSession: request.graduationSession,
        collegeCode: request.collegeCode,
        deptCode: request.deptCode,
        clazzId: request.clazzId
      }
    }
  })
}
