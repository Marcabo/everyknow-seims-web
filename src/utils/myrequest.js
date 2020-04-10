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
    const res = result.data;

    if (result.status !== 200) {
      Notification({
        title: '操作失败',
        message: result.data,
        type: 'error',
        duration: 2000
      });

      return Promise.reject(new Error('Error'));
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
      }
    } else {
      // 自己封装的错误
      if (res.respCode !== '200') {
        // 如果后续有其他错误,可自行添加
        if (res.respCode === '500') {
          Notification({
            title: '操作失败',
            message: res.respMsg,
            type: 'error',
            duration: 2000
          });
        }
      } else {
        if (result.headers['content-type'] === 'application/octet-stream') {
          return result;
        } else {
          return res;
        }
      }
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
