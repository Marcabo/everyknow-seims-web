import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 获取全部 行业类别
 * @returns {AxiosPromise}
 */
export function getIndustryType() {
  return myrequest({
    url: '/industryType/queryAll',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {

      }
    }
  })
}
