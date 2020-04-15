<template>
  <div class="app-container">
    <div class="components-type">
      {{componentsType}}
    </div>

    <el-form ref="stuForm" :model="form" label-width="120px" size="small" :rules="stuFormRule">

      <el-form-item label="毕业届数" style="margin-left: 300px; margin-right: 400px" prop="graduationSession">
        <el-input v-model="form.graduationSession" placeholder="请输入毕业届数(年份)"/>
      </el-form-item>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="学生姓名" prop="stuName">
            <el-input v-model="form.stuName" placeholder="请输入学生姓名"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="学号" prop="stuId">
            <el-input v-model="form.stuId" placeholder="请输入学生学号"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="性别" clearable class="filter-item">
              <el-option v-for="item in stuSex" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="出生日期">
            <el-date-picker
                    v-model="form.birthDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="学院" prop="collegeCode">
            <el-select v-model="form.collegeCode" placeholder="学院" clearable class="filter-item" style="width: 250px" @change="changeDept()">
              <el-option v-for="item in collegeList" :key="item.collegeCode" :label="item.collegeName"
                         :value="item.collegeCode"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="专业" prop="deptCode">
            <el-select v-model="form.deptCode" placeholder="专业" clearable class="filter-item" style="width: 250px" @change="changeClazz()">
              <el-option v-for="item in deptList" :key="item.deptCode" :label="item.deptName" :value="item.deptCode"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="班级" prop="clazzId">
            <el-select v-model="form.clazzId" placeholder="班级" clearable class="filter-item" style="width: 250px">
              <el-option v-for="item in clazzList" :key="item.id" :label="item.clazzName" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="入学时间" prop="entryTime">
            <el-date-picker
                    v-model="form.entryTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="政治面貌">
            <el-select v-model="form.politicalStatus" placeholder="政治面貌" clearable class="filter-item">
              <el-option v-for="item in stuPoliticalStatus" :key="item.id" :label="item.status" :value="item.status"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="学历">
            <el-select v-model="form.educationBackground" placeholder="学历" clearable class="filter-item">
              <el-option v-for="item in stuEducation" :key="item.id" :label="item.value" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="民族">
            <el-input v-model="form.nation" placeholder="民族"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="身份证号码" prop="identificationNumber">
            <el-input v-model="form.identificationNumber" placeholder="身份证号码"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="户口性质">
            <el-select v-model="form.accountType" placeholder="户口性质" clearable class="filter-item">
              <el-option v-for="item in stuAccountType" :key="item.id" :label="item.value" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="户口所在地">
            <el-input v-model="form.accountLocation" placeholder="请输入户口所在地"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="生源地">
            <el-select v-model="form.nativePlace" placeholder="生源地" clearable class="filter-item">
              <el-option v-for="item in provinceList" :key="item.code" :label="item.provinceName" :value="item.provinceName"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="所在地址">
            <el-input v-model="form.stuAddr" placeholder="请输入现在居住地址"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" placeholder="手机号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="微信号" prop="wechatCode">
            <el-input v-model="form.wechatCode" placeholder="微信号"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="QQ号" prop="qqCode">
            <el-input v-model="form.qqCode" placeholder="QQ号"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="电子邮箱" prop="stuEmail">
            <el-input v-model="form.stuEmail" placeholder="电子邮箱"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="8">
          <el-form-item>
            <el-button size="medium" type="primary" @click="isEdit === false ? addStudent() : editStudent()">{{editButtonMsg}}</el-button>
            <el-button size="medium" @click="onCancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {getCollegeList} from "@/api/college";
  import {getDeptListByCollegeCode} from "@/api/dept";
  import {getClazzListByDeptCode} from "@/api/clazz";
  import {getProvinces} from "@/api/location";
  import {addStudent, getStudentById, updateStudent} from "@/api/studentinfo";

  export default {
    name: "StudentDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          id: undefined,
          graduationSession: '',
          stuName: '',
          stuId: '',
          sex: undefined,
          birthDate: undefined,
          collegeCode: '',
          deptCode: '',
          clazzId: '',
          politicalStatus: '',
          nation: '',
          identificationNumber: undefined,
          accountType: '',
          accountLocation: '',
          nativePlace: '',
          educationBackground: '',
          phone: '',
          wechatCode: '',
          qqCode: '',
          stuEmail: '',
          stuAddr: '',
          entryTime: undefined,
        },
        stuSex: [
          {
            id: 0,
            name: '女'
          },
          {
            id: 1,
            name: '男'
          }
        ],
        stuPoliticalStatus: [
          {
            id: 0,
            status: '共青团员'
          },
          {
            id: 1,
            status: '群众'
          },
          {
            id: 3,
            status: '中共党员'
          }
        ],
        stuAccountType: [
          {
            id: 0,
            value: '农村'
          },
          {
            id: 1,
            value: '城市'
          }
        ],
        stuEducation: [
          {
            id: 0,
            value: '专科',
          },
          {
            id: 1,
            value: '本科'
          },
          {
            id: 2,
            value: '硕士'
          },
          {
            id: 3,
            value: '博士'
          },
          {
            id: 4,
            value: '博士后'
          }
        ],
        collegeList: undefined,
        deptList: undefined,
        clazzList: undefined,
        provinceList: undefined,
        stuFormRule: {
          graduationSession: [
          // 如果需要,自行添加
          ],
          stuName: [
            { required: true, message: '姓名为必填项', trigger: 'blur' },
            { min: 2, message: '姓名长度不能小于2', trigger: 'blur'},
            { required: true, pattern: /^[\u4e00-\u9fa5A-Za-z]{0,}$/, message: '姓名必须为中文或英文字母', trigger: 'blur' }
          ],
          stuId: [
            { required: true, message: '学号为必填项', trigger: 'blur' },
            { required: true, pattern: /^[A-Za-z0-9]{0,30}$/, message: '学号必须为数字,字母', trigger: 'blur'}
          ],
          sex: [
            { required: true, message: '性别为必填项', trigger: 'change' }
          ],
          collegeCode: [
            { required: true, message: '学院为必填项', trigger: 'change' }
          ],
          deptCode: [
            { required: true, message: '专业为必填项', trigger: 'change' }
          ],
          clazzId: [
            { required: true, message: '班级为必填项', trigger: 'change' }
          ],
          entryTime: [
            { required: true, message: '入学时间为必填项', trigger: 'change' }
          ],
          identificationNumber: [
            { required: false, pattern: /^\d{15}|\d{18}$/, message: '身份证号必须为 15 或 18 位', trigger: 'blur' }
          ],
          phone: [
            { required: false, pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0-9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          qqCode: [
            { required: false, pattern: /^\d+$/, message: '请输入正确的qq号', trigger: 'blur' }
          ],
          stuEmail: [
            { required: false, pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit === true) {
        const id = this.$route.params.id;
        this.fetchStudent(id);
      } else {
        this.fetchCollege();
        this.fetchProvinces();
      }
    },
    methods: {
      fetchStudent(id) {
        getStudentById({
          id
        }).then(response => {
          this.form = response.returnObject
          this.fetchProvinces();
        }).then( () => {
          this.fetchCollege();
        }).then( () => {
          this.fetchDept();
        }).then( () => {
          this.fetchClazz();
        })
      },
      fetchCollege() {
        getCollegeList().then(response => {
          this.collegeList = response.returnObject
        })
      },
      changeDept() {
        this.form.deptCode = '';
        this.form.clazzId = '';
        this.fetchDept();
      },
      fetchDept() {
        if (this.form.collegeCode === '') {
          this.deptList = undefined
        } else {
          getDeptListByCollegeCode({
            collegeCode: this.form.collegeCode
          }).then(response => {
            this.deptList = response.returnObject
          })
        }
      },
      changeClazz() {
        this.form.clazzId = '';
        this.fetchClazz();
      },
      fetchClazz() {
        if (this.form.deptCode === '') {
          this.deptList = undefined;
        } else {
          getClazzListByDeptCode({
            deptCode: this.form.deptCode
          }).then(response => {
            this.clazzList = response.returnObject
          })
        }
      },
      fetchProvinces() {
        getProvinces().then(response => {
          this.provinceList = response.returnObject
        })
      },
      onCancel() {
        this.$router.push('/studentinfo/baseInfo')
      },
      addStudent() {
        this.$refs['stuForm'].validate( (valid) => {
          if (valid) {
            addStudent({
              ...this.form
            }).then( () => {
              this.$message({
                type: 'success',
                message: '添加成功'
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
            this.$refs['stuForm'].clearValidate()
          })
        })
      },
      editStudent() {
        this.$refs['stuForm'].validate( (valid) => {
          if (valid) {
            updateStudent({
              ...this.form
            }).then( () => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })

              this.$router.push('/studentinfo/baseInfo')
            })
          }
        })
      }
    },
    computed: {
      componentsType() {
        return this.isEdit === true ? '编辑' + this.editStuIdC : '新增';
      },
      editStuIdC() {
        return this.$route.params.id === '' ? '' : ' - ' + this.$route.params.id
      },
      editButtonMsg() {
        return this.isEdit ? '修改' : '新增'
      }
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
