import axios from 'axios'
import {Notification} from 'element-ui'

export function myrequest(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return error
  })

  instance.interceptors.response.use(result => {
    const res = result.data

    if (res.respCode !== '200') {
      if (res.respCode === '500') {
        Notification({
          title: '操作失败',
          message: res.respMsg,
          type: "error",
          duration: 2000
        });
      }

      return Promise.reject(new Error(res.respMsg || 'Error'))
    } else {
      return res;
    }
  }, error => {
    console.log('err' + error) // for debug
    Notification({
      title: '操作失败',
      message: res.respMsg,
      type: "error",
      duration: 2000
    });
    return  Promise.reject(error)
  })

  return instance(config)
}
