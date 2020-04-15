import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 获取全部 单位性质
 * @returns {AxiosPromise}
 */
export function getCompanyNature() {
  return myrequest({
    url: '/companyNature/queryAll',
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
