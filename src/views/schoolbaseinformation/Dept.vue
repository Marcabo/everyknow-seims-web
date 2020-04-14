<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.deptName" placeholder="专业名称" style="width: 250px; margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.collegeCode" placeholder="学院" no-data-text="全部" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
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
      <el-table-column label="专业名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.deptName }}
        </template>
      </el-table-column>
      <el-table-column label="专业代码" align="center">
        <template slot-scope="scope">
          {{ scope.row.deptCode }}
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

    <!--  弹出框  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="80px" style="width: 400px; margin-left: 20px">
        <el-form-item label="id" prop="id" v-if="dialogStatus === 'update'">
          <el-input v-model="temp.id" :disabled="dialogStatus === 'update'"/>
        </el-form-item>
        <el-form-item label="专业代码" prop="deptCode">
          <el-input v-model="temp.deptCode"/>
        </el-form-item>
        <el-form-item label="专业名称" prop="deptName">
          <el-input v-model="temp.deptName"/>
        </el-form-item>
        <el-form-item label="学院" prop="deptName">
          <el-select v-model="temp.collegeCode" placeholder="学院" clearable class="filter-item" style="width: 250px">
            <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addDept():updateDept()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getCollegeList} from "@/api/college";
  import {getDeptList, getDeptListByCondition, deleteDeptById, updateDept, addDept} from "@/api/dept";


  export default {
    name: 'Dept',
    data() {
      return {
        list: null,
        listLoading: true,
        dialogStatus: '',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        temp: {
          id: undefined,
          deptCode: '',
          deptName: '',
          collegeCode: '',
          collegeName: '',
        },
        listQuery: {
          deptName: '',
          collegeCode: ''
        },
        collegeList: undefined
      }
    },
    created() {
      this.fetchData()
      this.fetchCollege()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getDeptList().then(response => {
          this.list = response.returnObject
          this.listLoading = false
        })
      },
      fetchCollege() {
        getCollegeList().then(response => {
          this.collegeList = response.returnObject
        })
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
        this.$confirm('此操作将永久删除该 专业 及该专业下所有 班级 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 真正执行删除
          this.deleteDept(row.id);

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
      addDept() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addDept({
              deptCode: this.temp.deptCode,
              deptName: this.temp.deptName,
              collegeCode: this.temp.collegeCode
            }).then(() => {
              this.dialogFormVisible = false;
              this.fetchData();
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })

          }
        })
      },
      updateDept() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateDept({
              id: this.temp.id,
              deptCode: this.temp.deptCode,
              deptName: this.temp.deptName,
              collegeCode: this.temp.collegeCode
            }).then(() => {
              this.dialogFormVisible = false;
              this.fetchData();
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }
        })
      },
      deleteDept(id) {
        deleteDeptById({
          id: id
        })
      },
      handleFilter() {
        this.listLoading = true

        if (this.listQuery.deptName === '' && this.listQuery.collegeCode === '') {
          this.fetchData()
        } else {
          getDeptListByCondition({
            deptName: this.listQuery.deptName,
            collegeCode: this.listQuery.collegeCode
          }).then(response => {
            console.log(response);
            this.list = response.returnObject
          })
        }

        this.listLoading = false
      }
    }
  }
</script>
