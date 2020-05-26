import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 获取可视化数据
 * @param request
 * @returns {AxiosPromise}
 */
export function getYearAnalysis(request) {
  return myrequest({
    url: '/analysis/get',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      request: {
        startSession: request.startSession,
        endSession: request.endSession,
        collegeCode: request.collegeCode,
        deptCode: request.deptCode
      }
    }
  })
}
