import {myrequest} from '@/utils/myrequest'
import {getCurrentTime} from "@/utils";

/**
 * 添加学生
 * @param request
 * @returns {AxiosPromise}
 */
export function addStudent(request) {
  return myrequest({
    url: '/studentinfo/insert',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        ...request
      }
    }
  })
}

/**
 * 根据 id 修改学生
 * @param request
 * @returns {AxiosPromise}
 */
export function updateStudent(request) {
  return myrequest({
    url: '/studentinfo/updateById',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        ...request
      }
    }
  })
}

/**
 * 根据 id 查询学生
 * @param request
 * @returns {AxiosPromise}
 */
export function getStudentById(request) {
  return myrequest({
    url: '/studentinfo/queryById',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "id": request.id
      }
    }
  })
}

/**
 * 根据 stuId 查询学生
 * @param request
 * @returns {AxiosPromise}
 */
export function getStudentByStuId(request) {
  return myrequest({
    url: '/studentinfo/queryByStuId',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "requestDate": getCurrentTime()
      },
      "request": {
        "stuId": request.stuId
      }
    }
  })
}

/**
 * 分页获取 学生列表
 * @param request
 * @returns {AxiosPromise}
 */
export function getStudentPage(request) {
  return myrequest({
    url: 'studentinfo/page',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "pageSize": request.pageSize,
        "requestDate": getCurrentTime(),
        "current": request.current
      },
      "request": {
        //学院,专业,班级,姓名(模糊),学号(模糊),身份证号(模糊),入学时间,毕业届数
        "collegeCode": request.collegeCode,
        "deptCode": request.deptCode,
        "clazzId": request.clazzId,
        "stuName": request.stuName,
        "stuId": request.stuId,
        "identificationNumber": request.identificationNumber,
        "entryTime": request.entryTime,
        "graduationSession": request.graduationSession
      }
    }
  })
}

/**
 * 分页获取 未登记就业信息统计 学生列表
 * @param request
 * @returns {AxiosPromise}
 */
export function getNoEmployStudentPage(request) {
  return myrequest({
    url: 'studentinfo/noEmployPage',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "pageSize": request.pageSize,
        "requestDate": getCurrentTime(),
        "current": request.current
      },
      "request": {
        //学院,专业,班级,姓名(模糊),学号(模糊),入学时间,毕业届数
        "collegeCode": request.collegeCode,
        "deptCode": request.deptCode,
        "clazzId": request.clazzId,
        "stuName": request.stuName,
        "stuId": request.stuId,
        "entryTime": request.entryTime,
        "graduationSession": request.graduationSession
      }
    }
  })
}

/**
 * 分页获取 未登记档案信息统计 学生列表
 * @param request
 * @returns {AxiosPromise}
 */
export function getNoFileStudentPage(request) {
  return myrequest({
    url: 'studentinfo/noFilePage',
    method: 'post',
    data: {
      "eKnowRequest": {
        "organId": "NCU",
        "pageSize": request.pageSize,
        "requestDate": getCurrentTime(),
        "current": request.current
      },
      "request": {
        //学院,专业,班级,姓名(模糊),学号(模糊),身份证号(模糊),入学时间,毕业届数
        "collegeCode": request.collegeCode,
        "deptCode": request.deptCode,
        "clazzId": request.clazzId,
        "stuName": request.stuName,
        "stuId": request.stuId,
        "entryTime": request.entryTime,
        "graduationSession": request.graduationSession
      }
    }
  })
}


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

/**
 * 下载 Excel 模板
 * @returns {AxiosPromise}
 */
export function downloadExcel() {
  // const request = new XMLHttpRequest();
  // request.open('get', '/api/studentinfo/templatedownload');
  // request.responseType = "blob";

  return myrequest({
    url: 'studentinfo/templatedownload',
    method: 'get',
    responseType: 'blob'
  })
}


/**
 * 获取全部毕业届数
 * @param request
 * @returns {AxiosPromise}
 */
export function getAllGraduationSession() {
  return myrequest({
    url: 'studentinfo/getAllGraduationSession',
    method: 'post'
  })
}


