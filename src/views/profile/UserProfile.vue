<template>
  <div style="padding-top: 50px">
    <el-form ref="userProfile" :model="form" label-width="120px" size="small" :rules="userProfileRules">

      <el-form-item label="账号" style="margin-left: 400px; margin-right: 600px" prop="username">
        <el-input v-model="form.username" disabled/>
      </el-form-item>

      <el-form-item label="用户昵称" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.nickname" placeholder="用户昵称"/>
      </el-form-item>

      <el-form-item label="手机号码" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.phone" placeholder="请输入手机号码"/>
      </el-form-item>

      <el-form-item label="邮箱" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.email" placeholder="请输入邮箱"/>
      </el-form-item>

      <el-row>
        <el-col :offset="8">
          <el-form-item>
            <el-button size="medium" type="primary" @click="editUserProfile()">更新</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { getUserProfile, updateUserProfile } from "@/api/user";


  export default {
    name: "UserProfile",
    data() {
      return {
        form: {
          id: '',
          username: '',
          nickname: '',
          avator: '',
          phone: '',
          email: '',
        },
        userProfileRules: {

        }
      }
    },
    created() {
      this.form.id = this.$store.getters.userId;
      console.log(this.$store.getters.userId)
      this.fetchUserProfile();
    },
    methods: {
      fetchUserProfile() {
        getUserProfile().then(response => {
          this.form = response.returnObject;
        })
      },
      editUserProfile() {
        this.$refs['userProfile'].validate( (valid) => {
          if (valid) {
            updateUserProfile({
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
            this.$refs['userProfile'].clearValidate()
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
