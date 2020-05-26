<template>
  <div class="app-container">

    <div class="filter-container">
      <span class="el-row-span">用户名:</span>
      <el-input v-model="listQuery.username" placeholder="用户名(模糊)" style="width: 300px" class="filter-item"/>

      <span class="el-row-span">用户昵称:</span>
      <el-input v-model="listQuery.nickname" placeholder="用户昵称(模糊)" style="width: 300px" class="filter-item"/>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"
                 @click="handleFilter()">
        搜索
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-circle-plus"
                 @click="handleCreate()">
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
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="primary" size="mini" @click="handleResetPassword(row)">
            重置密码
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--  封装分页插件使用  -->
    <my-pagination :hidden-on-single="hiddenOnSingle" :total-count="page.totalCount" :current.sync="page.current"
                   :limit.sync="page.pageSize" @pagination="handleFilter()" />

    <!--  弹出框  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="80px"
               style="width: 400px; margin-left: 20px">
        <el-form-item label="id" prop="id" v-if="dialogStatus === 'update'">
          <el-input v-model="temp.id" :disabled="dialogStatus === 'update'"/>
        </el-form-item>
        <el-form-item label="用户名" prop="deptCode">
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="deptName">
          <el-input v-model="temp.nickname"/>
        </el-form-item>
        <el-form-item label="手机号" prop="deptName">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="deptName">
          <el-input v-model="temp.email"/>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
<!--    updateUser 暂时未开发    -->
        <el-button type="primary" @click="dialogStatus==='create'?addSysUser():updateSysUser()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserProfilePageByRole, addUser, updateUser, resetUserPassword, deleteUserById} from "@/api/user";
  import {e2page} from "@/utils";

  export default {
    name: "UserList",
    data() {
      return {
        list: null,
        currentRole: '',
        dialogStatus: '',
        dialogFormVisible: false,
        textMap: {
          update: '编辑用户',
          create: '创建用户'
        },
        listLoading: true,
        listQuery: {
          username: '',
          nickname: ''
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
        temp: {
          id: undefined,
          username: '',
          nickname: '',
          phone: '',
          email: '',
        },
        hiddenOnSingle: true,
      }
    },
    created() {
      this.currentRole = this.$route.path.split('/')[2]
      this.fetchUserProfileList();
    },
    methods: {
      fetchUserProfileList() {
        this.listLoading = true
        getUserProfilePageByRole({
          current: this.page.current,
          pageSize: this.page.pageSize,
          rolename: this.currentRole
        }).then(response => {
          this.list = response.returnObject;
          this.page = e2page(response);

          this.listLoading = false;
        })
      },
      handleFilter() {
        this.listLoading = true
        if (!this.isExisted(this.listQuery)) {
          this.fetchUserProfileList()
        } else {
          getUserProfilePageByRole({
            current: this.page.current,
            pageSize: this.page.pageSize,
            rolename: this.currentRole,
            username: this.listQuery.username,
            nickname: this.listQuery.nickname
          }).then(response => {
            this.list = response.returnObject;
            this.page = e2page(response);

            this.listLoading = false;
          });
        }
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;

      },
      addSysUser() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addUser({
              username: this.temp.username,
              nickname: this.temp.nickname,
              rolename: this.currentRole,
              phone: this.temp.phone,
              email: this.temp.email
            }).then(() => {
              this.dialogFormVisible = false;
              this.fetchUserProfileList();
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })

          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        // $nextTick 用于执行异步操作.在数据变化后立即执行
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateSysUser() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateUser({
              id: this.temp.id,
              username: this.temp.username,
              nickname: this.temp.nickname,
              phone: this.temp.phone,
              email:this.temp.email
            }).then(() => {
              this.dialogFormVisible = false;
              this.fetchUserProfileList();
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }
        })
      },
      handleResetPassword(row) {
        this.$confirm('此操作将重置用户名为 ' + row.username + ' 用户的密码 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 真正执行重置密码
          resetUserPassword({
            id: row.id
          }).then(() => {
            this.fetchUserProfileList();
            this.$notify({
              title: '操作成功',
              message: '重置用户密码成功!',
              type: 'success',
              duration: 2000
            });
          })
        }).catch(() => {
          this.fetchUserProfileList();
          this.$message({
            type: 'info',
            message: '已取消重置',
            duration: 1000
          });
        });
      },
      handleDelete(row) {
        this.$confirm('此操作将删除用户名为 ' + row.username + ' 的用户 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 真正执行重置密码
          deleteUserById({
            id: row.id
          }).then(() => {
            this.fetchUserProfileList();
            this.$notify({
              title: '操作成功',
              message: '删除用户成功!',
              type: 'success',
              duration: 2000
            });
          })


        }).catch(() => {
          this.fetchUserProfileList();
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
          username: '',
          nickname: '',
          phone: '',
          email: '',
        }
      },
      isExisted(listQuery) {
        for (const key in listQuery) {
          if (listQuery[key]) {
            return true;
          }
        }
        return false;
      }
    },
    computed: {}
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
