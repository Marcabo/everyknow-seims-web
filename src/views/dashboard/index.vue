<template>
  <div class="dashboard-container">
    <div >
      <el-card class="box-card" style="width: 500px">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        欢迎 <span style="font-size: 30px; font-weight: bolder">{{$store.getters.nickname}}</span> 进入高校就业管理分析平台
        <br><br>
        权限: {{getRole}}
        <br><br>
        手机号: {{form.phone}}
        <br><br>
        邮箱: {{form.email}}
      </el-card>
    </div>

    <img src="~@/views/dashboard/img/ncu_loge.jpg" style="position: absolute; bottom: 10px; right: 10px" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import {getUserProfile} from "@/api/user";

export default {
  name: 'Dashboard',
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
    }
  },
  created() {
    this.fetchUserProfile()
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    getRole() {
      let rolename = store.getters.rolename;
      if ('admin' === rolename) {
        return '管理员'
      }
      if ('employ_teacher' === rolename) {
        return '就业处老师'
      }
      if ('college_leader' == rolename) {
        return '学院领导'
      }
      if ('instructor' === rolename) {
        return '辅导员'
      }
      if ('student' === rolename) {
        return '学生'
      }
    }
  },
  methods: {
    fetchUserProfile() {
      getUserProfile().then(response => {
        this.form = response.returnObject;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-container1 {
    /*margin: 0;*/
    /*width: 100%;*/
    height: 100vh;
    background-image: url("http://alumni-cn.zuaa.zju.edu.cn/static/upload/pic/201310/16/212820131016105442995_bmiddle.jpg");
  }

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  img {
    filter: opacity(20%)
  }
</style>
