import {myrequest} from "@/utils/myrequest";
import {getCurrentTime} from "@/utils";

/**
 * 获取全部 就业方式
 * @returns {AxiosPromise}
 */
export function getEmployMethod() {
  return myrequest({
    url: '/employMethod/queryAll',
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
