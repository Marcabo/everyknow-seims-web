import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 获取全部省份
 * @param request
 * @returns {AxiosPromise}
 */
export function getProvinces(request) {
  return myrequest({
    url: '/location/getProvinces',
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
