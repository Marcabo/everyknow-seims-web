<template>
  <div class="app-container">
    <div class="components-type">
      {{componentsType}}
    </div>

    <el-form ref="stuFileForm" :model="form" label-width="120px" size="small" :rules="stuFileFormRules">

      <el-form-item label="接收档案机构" style="margin-left: 400px; margin-right: 600px" prop="institutionName">
        <el-input v-model="form.institutionName" placeholder="请输入接收档案结构"/>
      </el-form-item>

      <el-form-item label="机构地址" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.institutionPlace" placeholder="请输入机构地址"/>
      </el-form-item>

      <el-form-item label="机构号码" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.institutionPhone" placeholder="请输入机构联系方式"/>
      </el-form-item>

      <el-form-item label="转出方式" style="margin-left: 400px; margin-right: 600px">
        <el-input v-model="form.outWay" placeholder="请输入转出方式"/>
      </el-form-item>

      <el-form-item label="转出日期" style="margin-left: 400px; margin-right: 600px">
        <el-date-picker
                v-model="form.outDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="描述" style="margin-left: 400px; margin-right: 600px">
        <el-input
                type="textarea"
                :autosize="{minRows: 3, maxRows: 5}"
                v-model="form.description"
                placeholder="请输入描述"/>
      </el-form-item>

      <el-row>
        <el-col :offset="8">
          <el-form-item>
            <el-button size="medium" type="primary" @click="editStudentFile()">更新</el-button>
            <el-button size="medium" @click="onCancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {getStudentFile, updateStudentFile} from "@/api/studentfile";

  export default {
    name: "StudentFileEdit",
    props: {
    },
    data() {
      return {
        form: {
          id: undefined,
          stuId: '',
          institutionName: '',
          institutionPlace: '',
          institutionPhone: '',
          outWay: '',
          outDate: undefined,
          description: ''
        },
        stuFileFormRules: {
          institutionName: [
            {required: true, message: '接收档案机构不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.fetchStudentFile();
    },
    methods: {
      fetchStudentFile() {
        getStudentFile({
          stuId: this.$route.params.stuId
        }).then(response => {
          this.form = response.returnObject;
          this.form.stuId = this.$route.params.stuId;
        })
      },
      onCancel() {
        this.$router.push('/studentinfo/baseInfo')
      },
      editStudentFile() {
        this.$refs['stuFileForm'].validate( (valid) => {
          if (valid) {
            updateStudentFile({
              ...this.form
            }).then( () => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })

              this.$router.push('/studentinfo/baseInfo')
            })
          } else {
            this.$message({
              type: 'error',
              message: '表单校验未通过!'
            })
            return false;
          }
          this.$nextTick(() => {
            this.$refs['stuFileForm'].clearValidate()
          })
        })
      }
    },
    computed: {
      componentsType() {
        return '编辑' + ' - ' + this.$route.params.stuId;
      },

    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .components-type {
    font-size: 30px;
    line-height: 60px;
    margin-left: 20px;
    margin-bottom: 20px;
    width: fit-content;
    border-bottom: 2px solid #5a5e66;
  }
</style>
