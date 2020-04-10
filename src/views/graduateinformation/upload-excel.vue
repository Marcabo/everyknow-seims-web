<template>
  <div class="app-container">
    <div class="upload-excel-component">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" @uploadExcel="uploadExcel"/>
      <el-button type="info" icon="el-icon-download" style="margin-top: 10px;" @click="download"
                 >
        下载模板文件
      </el-button>
    </div>

<!--    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">-->
<!--      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />-->
<!--    </el-table>-->
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel';
import {uploadExcel, downloadExcel} from "@/api/studentinfo";
import {Notification} from 'element-ui';

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    download() {
      // let a = document.createElement('a');
      // a.href = 'http://localhost:8090/studentinfo/templatedownload';
      // a.click();
      downloadExcel().then(response => {
        let url = window.URL.createObjectURL(new Blob([response.data],{type:'application/octet-stream'}));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", response.headers['filename']);
        //
        // document.body.appendChild(link);
        console.log(response);

        link.click();
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传 1m 以上文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    uploadExcel(rawFile) {
      console.log(rawFile);
      uploadExcel({
        rawFile
      }).then(response => {
        if (response !== undefined) {
          Notification({
            title: '上传成功',
            message: '成功插入 ' + response.returnObject.count + ' 条数据',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .upload-excel-component {
    margin-top: 50px;
    text-align: center;
  }
</style>
