<template>
  <div class="app-container">

    <div class="filter-container">
      <my-el-input v-model="listQuery.collegeName" placeholder="学院名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter"
                suffix-icon="el-icon-search" @change="handleFilter"/>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus"
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
      <el-table-column label="学院名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.collegeName }}
        </template>
      </el-table-column>
      <el-table-column label="学院代码" align="center">
        <template slot-scope="scope">
          {{ scope.row.collegeCode }}
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
        <el-form-item label="学院代码" prop="collegeCode">
          <el-input v-model="temp.collegeCode"/>
        </el-form-item>
        <el-form-item label="学院名称" prop="collegeName">
          <el-input v-model="temp.collegeName"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addCollege():updateCollege()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getCollegeList, addCollege, updateCollege, deleteCollegeById, queryByName} from "@/api/college";

  export default {
    name: 'College',
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
          collegeCode: '',
          collegeName: '',
        },
        listQuery: {
          collegeName: ''
        },
        queryName: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getCollegeList().then(response => {
          this.list = response.returnObject
          this.listLoading = false
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
        this.$confirm('此操作将永久删除该 学院 及该学院下所有 专业 班级 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 真正执行删除
          this.deleteCollege(row.id);

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
            message: '已取消删除'
          });
        });

      },
      resetTemp() {
        this.temp = {
          id: undefined,
          collegeCode: '',
          collegeName: '',
        }
      },
      addCollege() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addCollege({
              collegeCode: this.temp.collegeCode,
              collegeName: this.temp.collegeName,
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
      updateCollege() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateCollege({
              id: this.temp.id,
              collegeCode: this.temp.collegeCode,
              collegeName: this.temp.collegeName
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
      deleteCollege(id) {
        deleteCollegeById({
          id: id
        })
      },
      handleFilter() {
        this.listLoading = true

        if (this.listQuery.collegeName.length === 0) {
          this.fetchData()
        } else {
          queryByName({
            collegeName: this.listQuery.collegeName
          }).then(response => {
            this.list = response.returnObject

          })
        }

        this.listLoading = false
      },
    }
  }
</script>
