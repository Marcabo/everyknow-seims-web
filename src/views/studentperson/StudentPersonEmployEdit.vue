<template>
  <div class="app-container">
    <div class="components-type">
      {{componentsType}}
    </div>

    <el-form ref="stuEmployForm" :model="form" label-width="120px" size="small" :rules="stuEmployFormRules">

      <el-form-item label="就业方式" style="margin-left: 400px; margin-right: 500px" prop="employMethod">
        <el-select v-model="form.employMethod" placeholder="请选择就业方式" clearable class="filter-item" style="width: 100%">
          <el-option v-for="item in employMethodList" :key="item.code" :label="item.method" :value="item.code"/>
        </el-select>
      </el-form-item>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="用人单位名称" prop="companyFullName">
            <el-input v-model="form.companyFullName" placeholder="请输入全称"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="组织机构代码" prop="companyCode">
            <el-input v-model="form.companyCode" placeholder="请输入组织机构代码"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="单位性质">
            <el-select v-model="form.companyNatureCode" placeholder="请选择单位性质" clearable class="filter-item">
              <el-option v-for="item in companyNatureList" :key="item.code" :label="item.name" :value="item.code"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="单位联系人">
            <el-input v-model="form.companyContactName" placeholder="请输入单位联系人"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="单位联系电话">
            <el-input v-model="form.companyContactPhone" placeholder="请输入单位联系电话"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="单位省份">
            <el-select v-model="form.companyProvince" placeholder="请选择省份" clearable class="filter-item" style="width: 250px" @change="changeProvince()">
              <el-option v-for="item in provinceList" :key="item.code" :label="item.provinceName" :value="item.code"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="单位城市">
            <el-select v-model="form.companyCity" placeholder="请选择城市" clearable class="filter-item" style="width: 250px">
              <el-option v-for="item in cityList" :key="item.code" :label="item.cityName" :value="item.code"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="单位地址">
            <el-input v-model="form.companyAddr" placeholder="请输入单位地址"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="职位类别">
            <el-input v-model="form.major" placeholder="请输入职位类别"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="行业类别">
            <el-select v-model="form.industryType" placeholder="请选择行业类别" clearable class="filter-item">
              <el-option v-for="item in industryList" :key="item.code" :label="item.name" :value="item.code"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="薪资" prop="salary">
            <el-input v-model="form.salary" placeholder="请输入工资"/>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :offset="8">
          <el-form-item>
            <el-button size="medium" type="primary" @click="editStudentEmploy()">更新</el-button>
            <el-button size="medium" @click="onCancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {getCitysByProvinceCode, getProvinces} from "@/api/location";
  import {addStudent, getStudentById, updateStudent} from "@/api/studentinfo";
  import {getEmployMethod} from "@/api/employmethod";
  import {getCompanyNature} from "@/api/companynature";
  import {getIndustryType} from "@/api/industrytype";
  import {getStudentEmploy, updateStudentEmploy} from "@/api/studentemploy";
  import store from "@/store";

  export default {
    name: "StudentEmployEdit",
    props: {
    },
    data() {
      return {
        form: {
          id: undefined,
          stuId: '',
          companyFullName: '',
          companyCode: '',
          companyNatureCode: '',
          companyNatureName: '',
          companyContactName: '',
          companyContactPhone: '',
          companyProvince: '',
          companyProvinceName: '',
          companyCity: '',
          companyCityName: '',
          companyAddr: '',
          major: '',
          industryType: '',
          industryTypeName: '',
          salary: undefined,
          employMethod: '',
          employMethodMethod: ''
        },
        employMethodList: undefined,
        companyNatureList: undefined,
        provinceList: undefined,
        cityList: undefined,
        industryList: undefined,
        stuEmployFormRules: {
          employMethod: [
            { required: true, message: '就业方式不能为空', trigger: 'blur' }
          ],
          salary: [
            { required: false, pattern: /^\d+$/, message: '薪资为整数字', trigger: 'blur'}
          ],
          companyFullName: [
            {required: true, message: '用人单位名称不能为空', trigger: 'blur'}
          ],
          companyCode: [
            {required: true, message: '组织机构代码', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      const username = store.getters.username;

      // 这里直接传是因为. 当用户身份为 student 时. 其 username 就是 stuId
      this.fetchStudentEmploy(username);
    },
    methods: {
      fetchStudentEmploy(stuId) {
        getStudentEmploy({
          stuId: stuId
        }).then(response => {
          this.form = response.returnObject;
          this.form.stuId = store.getters.username;
        }).then(() => {
          this.fetchEmployMethod();
          this.fetchCompanyNature();
          this.fetchProvinces();
          this.fetchIndustryType();
        }).then(() => {
          this.fetchCitys();
        })
      },
      fetchEmployMethod() {
        getEmployMethod().then(response => {
          this.employMethodList = response.returnObject;
        })
      },
      fetchCompanyNature() {
        getCompanyNature().then(response => {
          this.companyNatureList = response.returnObject;
        })
      },
      fetchProvinces() {
        getProvinces().then(response => {
          this.provinceList = response.returnObject
        })
      },
      fetchCitys() {
        getCitysByProvinceCode({
          provinceCode: this.form.companyProvince
        }).then(response => {
          this.cityList = response.returnObject
        })
      },
      fetchIndustryType() {
        getIndustryType().then(response => {
          this.industryList = response.returnObject;
        })
      },
      changeProvince() {
        this.form.companyCity = '';
        this.fetchCitys();
      },
      changeDept() {
        this.form.deptCode = '';
        this.form.clazzId = '';
        this.fetchDept();
      },
      onCancel() {
        // this.$router.push('/studentinfo/baseInfo')
      },
      editStudentEmploy() {
        this.$refs['stuEmployForm'].validate( (valid) => {
          if (valid) {
            updateStudentEmploy({
              ...this.form
            }).then( () => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })

              // this.$router.push('/studentinfo/baseInfo')
            })
          } else {
            this.$message({
              type: 'error',
              message: '表单校验未通过!'
            })
            return false;
          }
          this.$nextTick(() => {
            this.$refs['stuEmployForm'].clearValidate()
          })
        })
      }
    },
    computed: {
      componentsType() {
        return '编辑' + ' - ' + store.getters.username;
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
