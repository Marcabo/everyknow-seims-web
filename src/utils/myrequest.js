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
      if (result.headers['content-type'] === 'application/octet-stream') {
        // 如果是文件下载
        return  result;
      } else {
        // 非文件下载
        // 自己封装的错误
        if (res.respCode !== '200') {
          // 如果有后续的错误, 可以自行添加
          if (res.respCode === '500') {
            Notification({
              title: '操作失败',
              message: res.respMsg,
              type: 'error',
              duration: 2000
            });
            return Promise.reject(new Error(res.respMsg || 'Error'))
          }
        } else {
          // 正常返回
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
