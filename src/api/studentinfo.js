import {myrequest} from '@/utils/myrequest'
import {getCurrentTime} from "@/utils";

/**
 * 上传 Excel
 * @returns {AxiosPromise}
 */
export function uploadExcel(request) {
  let formData = new FormData();
  formData.append('file', request.rawFile);
  return myrequest({
    url: '/studentinfo/upload',
    method: 'post',
    // 这里如果 data 是 form-data 类型的会自动加上 header Content-Type: multipart/form-data;
    data: formData
  })
}

// 文件下载需要用到请求头.所以自己封装一个XMLHttpRequest
export function downloadExcel() {
  const request = new XMLHttpRequest();
  request.open('get', '/api/studentinfo/templatedownload');
  request.responseType = "blob";

  return myrequest({
    url: 'studentinfo/templatedownload',
    method: 'get',
    responseType: 'blob'
  })
}


