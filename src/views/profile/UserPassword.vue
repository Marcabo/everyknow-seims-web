<template>
  <div style="padding-top: 50px">
    <el-form ref="userPassword" :model="form" label-width="120px" size="small" :rules="userPasswordRules">

      <el-form-item label="原密码" style="margin-left: 400px; margin-right: 600px" prop="username">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"/>
      </el-form-item>

      <el-form-item label="新密码" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.newpassword" placeholder="请输入新密码"/>
      </el-form-item>

      <el-form-item label="确认密码" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.confirmpassword" placeholder="请确认密码"/>
      </el-form-item>

      <el-row>
        <el-col :offset="8">
          <el-form-item>
            <el-button size="medium" type="primary" @click="editPassword()">更新</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { updatepassword } from "@/api/user";

  export default {
    name: "UserProfile",
    data() {
      return {
        form: {
          id: undefined,
          oldpassword: '',
          newpassword: '',
          confirmpassword: ''
        },
        userPasswordRules: {

        }
      }
    },
    created() {
      this.form.id = this.$store.getters.userId;
    },
    methods: {
      editPassword() {
        this.$refs['userPassword'].validate( (valid) => {
          if (valid) {
            updatepassword({
              ...this.form
            }).then(() => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
            })
          } else {
            this.$message({
              type: 'error',
              message: '表单校验未通过!'
            })
            return false;
          }
          this.$nextTick(() => {
            this.$refs['userPassword'].clearValidate()
          })
        })
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
