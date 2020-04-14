<template>
  <div class="app-container">

    <div class="filter-container">
<!--      <my-el-input v-model="listQuery.clazzName" placeholder="班级名称" style="width: 250px; margin-right: 10px" class="filter-item" />-->

      <el-row>
        <span class="el-row-span">学院:</span>
        <el-select v-model="listQuery.collegeCode" placeholder="学院" clearable class="filter-item" style="width: 250px; margin-right: 10px" @change="fetchDept">
          <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
        </el-select>
        <span class="el-row-span">专业:</span>
        <el-select v-model="listQuery.deptCode" placeholder="专业" no-data-text="全部" clearable class="filter-item" style="width: 250px; margin-right: 10px" @change="fetchClazz">
          <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.deptCode" />
        </el-select>
        <span class="el-row-span">班级:</span>
        <el-select v-model="listQuery.clazzId" placeholder="班级" no-data-text="全部" clearable class="filter-item" style="width: 250px">
          <el-option v-for="item in clazzList" :key="item.id" :label="item.clazzName" :value="item.id" />
        </el-select>

        <span class="el-row-span">姓名:</span>
        <el-input v-model="listQuery.stuName" placeholder="学生姓名(模糊)" style="width: 250px" class="filter-item"/>

        <span class="el-row-span">学号:</span>
        <el-input v-model="listQuery.stuId" placeholder="学生学号(模糊)" style="width: 300px" class="filter-item"/>
      </el-row>

      <el-row>
        <span class="el-row-span">入学年份:</span>
        <el-date-picker
                v-model="listQuery.entryTime"
                :default-value="new Date().setFullYear(new Date().getFullYear() - 4)"
                format="yyyy"
                value-format="yyyy-MM-dd"
                type="year"
                placeholder="选择年"
                class="filter-item">
        </el-date-picker>

        <span class="el-row-span">毕业年份:</span>
        <el-date-picker
                v-model="listQuery.graduationSession"
                :default-value="new Date()"
                format="yyyy"
                value-format="yyyy"
                type="year"
                placeholder="选择年"
                class="filter-item">
        </el-date-picker>

        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"
                   @click="handleFilter">
          搜索
        </el-button>

      </el-row>

    </div>

    <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
    >

      <!--  要实现排序 要加 sortable 和 prop https://www.jianshu.com/p/060008556374  -->
      <el-table-column align="center" label="ID" width="75" sortable prop="id" fixed="left">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="130" fixed="left">
        <template slot-scope="scope">
          {{ scope.row.stuName }}
        </template>
      </el-table-column>
      <el-table-column label="学号" align="center" width="150" fixed="left">
        <template slot-scope="scope">
          {{ scope.row.stuId }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.sex | sexFilter  }}
        </template>
      </el-table-column>
      <el-table-column label="学院" align="center" width="200">
        <template slot-scope="scope">
          {{ scope.row.collegeName }}
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center" width="300">
        <template slot-scope="scope">
          {{ scope.row.deptName }}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center" width="300">
        <template slot-scope="scope">
          {{ scope.row.clazzName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="学历" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.educationBackground }}
        </template>
      </el-table-column>
      <el-table-column label="入学时间" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.entryTime | entryTimeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="毕业届数" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.graduationSession }}
        </template>
      </el-table-column>

    </el-table>

    <!--  封装分页插件使用  -->
    <my-pagination :hidden-on-single="hiddenOnSingle" :total-count="page.totalCount" :current.sync="page.current"
                   :limit.sync="page.pageSize" @pagination="fetchData" />

  </div>
</template>

<script>
  import {e2page} from "@/utils";

  import {getCollegeList} from "@/api/college";
  import {getDeptListByCollegeCode} from "@/api/dept";
  import {getClazzListByDeptCode} from "@/api/clazz";
  import {getNoFileStudentPage} from "@/api/studentinfo";


  export default {
    name: 'NoFileStudentList',
    data() {
      return {
        list: null,
        listLoading: true,
        dialogStatus: '',
        dialogFormVisible: false,
        hiddenOnSingle: true,
        temp: {
          id: undefined,
          clazzName: '',
          deptCode: '',
          deptName: '',
          collegeCode: '',
          collegeName: '',
        },
        listQuery: {
          collegeCode: '',
          deptCode: '',
          clazzId: undefined,
          stuName: '',
          stuId: '',
          entryTime: undefined,
          graduationSession: ''
        },
        page: {
          // 分页请求
          page: 1,
          current: 1,
          pageSize: 10,
          totalCount: 0,
          hasNextPage: false,
          hasPreviousPage: false
        },
        collegeList: undefined,
        deptList: undefined,
        clazzList: undefined
      }
    },
    created() {
      this.fetchData()
      this.fetchCollege()
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getNoFileStudentPage({
          current: this.page.current,
          pageSize: this.page.pageSize
        }).then(response => {
          this.list = response.returnObject;
          this.page = e2page(response);
          this.listLoading = false
        })
      },
      fetchCollege() {
        getCollegeList().then(response => {
          this.collegeList = response.returnObject
        })
      },
      fetchDept() {
        if (this.listQuery.collegeCode === '') {
          this.deptList = undefined
        } else {
          getDeptListByCollegeCode({
            collegeCode: this.listQuery.collegeCode
          }).then(response => {
            this.deptList = response.returnObject
          })
        }
      },
      fetchClazz() {
        if (this.listQuery.deptCode === '') {
          this.deptList = undefined;
        } else {
          getClazzListByDeptCode({
            deptCode: this.listQuery.deptCode
          }).then(response => {
            this.clazzList = response.returnObject
          })
        }
      },
      handleFilter() {
        this.listLoading = true
        if (this.listQuery.clazzName === '' && this.listQuery.deptCode === '' && this.listQuery.collegeCode === '' &&
            this.listQuery.stuName === '' && this.listQuery.stuId === '' && this.listQuery.identificaNumber === '' &&
            this.listQuery.entryTime === null && this.listQuery.graduationSession === null) {
          this.fetchData()
        } else {
          getNoFileStudentPage({
            current: this.page.current,
            pageSize: this.page.pageSize,
            collegeCode: this.listQuery.collegeCode,
            deptCode: this.listQuery.deptCode,
            clazzName: this.listQuery.clazzName,
            stuName: this.listQuery.stuName,
            stuId: this.listQuery.stuId,
            identificationNumber: this.listQuery.identificaNumber,
            entryTime: this.listQuery.entryTime,
            graduationSession: this.listQuery.graduationSession
          }).then(response => {
            this.list = response.returnObject;
            this.page = e2page(response)
          })
        }

        this.listLoading = false
      }
    },
    filters: {
      sexFilter(sex) {
        return sex === 0 ? '女' : '男'
      },
      entryTimeFilter(entryTime) {
        // return parseTime(new Date(entryTime), '')
        return new Date(entryTime).Format('yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .el-row-span {
    margin-left: 10px;
    margin-right: 15px;
    height: 40px;
    text-align: center;
  }
</style>
