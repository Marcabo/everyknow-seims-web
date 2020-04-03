<template>
  <div class="app-container">

    <div class="filter-container">
      <my-el-input v-model="listQuery.clazzName" placeholder="班级名称" style="width: 250px; margin-right: 10px" class="filter-item" />

      <el-select v-model="listQuery.collegeCode" placeholder="学院" clearable class="filter-item" style="width: 250px; margin-right: 10px" @change="fetchDept">
        <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
      </el-select>

      <el-select v-model="listQuery.deptCode" placeholder="专业" no-data-text="全部" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.deptCode" />
      </el-select>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-circle-plus"
                 @click="handleCreate">
        添加
      </el-button>
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
      <el-table-column align="center" label="ID" width="95" sortable prop="id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="班级名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.clazzName }}
        </template>
      </el-table-column>
      <el-table-column label="专业名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.deptName }}
        </template>
      </el-table-column>
      <el-table-column label="学院名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.collegeName }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--  封装分页插件使用  -->
    <my-pagination :hidden-on-single="hiddenOnSingle" :total-count="page.totalCount" :current.sync="page.current"
                   :limit.sync="page.pageSize" @pagination="fetchData" />

    <!--  弹出框  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="80px" style="width: 400px; margin-left: 20px">
        <el-form-item label="id" prop="id" v-if="dialogStatus === 'update'">
          <el-input v-model="temp.id" :disabled="dialogStatus === 'update'"/>
        </el-form-item>
        <el-form-item label="班级名称" prop="clazzName">
          <el-input v-model="temp.clazzName"/>
        </el-form-item>
        <el-form-item label="学院" prop="collegeCode">
          <el-select v-model="temp.collegeCode"  placeholder="学院" clearable class="filter-item" style="width: 250px" @change="selectDept">
            <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="deptCode">
          <el-select v-model="temp.deptCode" placeholder="专业" no-data-text="请先选择学院" clearable class="filter-item" style="width: 250px">
            <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.deptCode" />
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addClazz():updateCLazz()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {e2page} from "@/utils";

  import {getCollegeList} from "@/api/college";
  import {getDeptList, getDeptListByCollegeCode, queryByName, deleteDeptById, updateDept, addDept} from "@/api/dept";
  import {getClazzPage, getClazzPageByCondition, addClazz, updateClazz, deleteClazzById} from "@/api/clazz";


  export default {
    name: 'Dept',
    data() {
      return {
        list: null,
        listLoading: true,
        dialogStatus: '',
        dialogFormVisible: false,
        hiddenOnSingle: true,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        temp: {
          id: undefined,
          clazzName: '',
          deptCode: '',
          deptName: '',
          collegeCode: '',
          collegeName: '',
        },
        listQuery: {
          clazzName: '',
          deptCode: '',
          collegeCode: ''
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
        deptList: undefined
      }
    },
    created() {
      this.fetchData()
      this.fetchCollege()
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getClazzPage({
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
      selectDept() {
        if (this.temp.collegeCode === '') {
          this.deptList = undefined;
          this.temp.deptCode = '';
        } else {
          getDeptListByCollegeCode({
            collegeCode: this.temp.collegeCode
          }).then(response => {
            this.deptList = response.returnObject
          })
        }
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        // $nextTick 用于执行异步操作.在数据变化后立即执行
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleDelete(row, index) {
        this.$confirm('此操作将永久删除该 班级 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 真正执行删除
          this.deleteClazz(row.id);

          this.$notify({
            title: '操作成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
          // 从 list 中删除
          this.list.splice(index, 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });
        });

      },
      resetTemp() {
        this.temp = {
          id: undefined,
          deptCode: '',
          deptName: '',
          collegeCode: '',
          collegeName: '',
        }
      },
      addClazz() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addClazz({
              clazzName: this.temp.clazzName,
              deptCode: this.temp.deptCode,
              collegeCode: this.temp.collegeCode
            }).then(() => {
              this.dialogFormVisible = false;
              this.deptList = undefined;
              this.fetchData();
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })

          }
        })
      },
      updateCLazz() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateDept({
              id: this.temp.id,
              clazzName: this.temp.clazzName,
              deptCode: this.temp.deptCode,
              collegeCode: this.temp.collegeCode
            }).then(() => {
              this.dialogFormVisible = false;
              this.deptList = undefined;
              this.fetchData();
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }
        })
      },
      deleteClazz(id) {
        deleteClazzById({
          id: id
        })
      },
      handleFilter() {
        this.listLoading = true

        if (this.listQuery.clazzName === '' && this.listQuery.deptCode === '' && this.listQuery.collegeCode === '') {
          this.fetchData()
        } else {
          getClazzPageByCondition({
            current: this.page.current,
            pageSize: this.page.pageSize,
            clazzName: this.listQuery.clazzName,
            deptCode: this.listQuery.deptCode,
            collegeCode: this.listQuery.collegeCode
          }).then(response => {
            this.list = response.returnObject;
            this.page = e2page(response)
          })
        }

        this.listLoading = false
      }
    }
  }
</script>
