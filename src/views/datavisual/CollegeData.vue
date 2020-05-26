<template>
  <div class="data-visual-school">
    <el-row style="text-align: center; margin-top: 30px">
      <span class="el-row-span">请选择:</span>
      <el-select v-model="query.graduationSession" placeholder="毕业届数" clearable class="filter-item" style="width: 250px; margin-right: 10px" @change="fetchData()">
        <el-option v-for="item in graduationSessionList" :key="item" :label="item" :value="item" />
      </el-select>

      <el-select v-model="query.collegeCode" placeholder="学院" clearable class="filter-item" style="width: 250px; margin-right: 10px" @change="fetchData()">
        <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
      </el-select>
    </el-row>


    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-col :span="12">
        <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
          <education-pie-chart v-if="loadingFlag" :chart-data="graduationEducationRatioData" />
        </el-card>

      </el-col>
      <el-col :span="12">
        <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
          <sex-pie-chart v-if="loadingFlag" :chart-data="graduationSexRatioData" />
        </el-card>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-col :span="12" :offset="6">
        <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
          <employ-ratio-tree-map v-if="loadingFlag" :chart-data="employRatioData" />
        </el-card>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        <graduation-industry-bar v-if="loadingFlag" :chart-data="graduationIndustry" />
      </el-card>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        <graduation-province-scatter v-if="loadingFlag" :chart-data="graduationProvince" />
      </el-card>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        <company-nature-bar v-if="loadingFlag" :chart-data="graduationNature" />
      </el-card>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        <employ-method-bar-pie v-if="loadingFlag" :chart-data="graduationEmployMethod" />
      </el-card>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        <salary-line-bar v-if="loadingFlag" :chart-data="graduationSalary" />
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import SalaryLineBar from "@/views/datavisual/components/SalaryLineBar";
  import EducationPieChart from "@/views/datavisual/components/EducationPieChart";
  import SexPieChart from "@/views/datavisual/components/SexPieChart";
  import EmployRatioTreeMap from "@/views/datavisual/components/EmployRatioTreeMap";
  import GraduationProvinceScatter from "@/views/datavisual/components/GraduationProvinceScatter";
  import GraduationIndustryBar from "@/views/datavisual/components/GraduationIndustryBar";
  import CompanyNatureBar from "@/views/datavisual/components/CompanyNatureBar";
  import EmployMethodBarPie from "@/views/datavisual/components/EmployMethodBarPie";
  import {getDataVisual} from "@/api/datavisual";
  import {getAllGraduationSession} from "@/api/studentinfo";
  import {getCollegeList} from "@/api/college";

  export default {
    name: "CollegeData",
    components: {
      SalaryLineBar,
      EducationPieChart,
      SexPieChart,
      EmployRatioTreeMap,
      GraduationProvinceScatter,
      GraduationIndustryBar,
      CompanyNatureBar,
      EmployMethodBarPie
    },
    data() {
      return {
        responseData: undefined,
        graduationEducationRatioData: undefined,
        graduationSexRatioData: undefined,
        employRatioData: undefined,
        graduationProvince: undefined,
        graduationIndustry: undefined,
        graduationNature: undefined,
        graduationEmployMethod: undefined,
        graduationSalary: undefined,
        loadingFlag: false,
        graduationSessionList: undefined,
        collegeList: undefined,
        query: {
          graduationSession: '',
          collegeCode: ''
        }
      }
    },
    created() {
      this.fetchData();
      this.fetchGraduationSession();
      this.fetchCollege();
    },
    methods: {
      fetchData() {
        this.loadingFlag = false;
        getDataVisual({
          graduationSession: this.query.graduationSession,
          collegeCode: this.query.collegeCode
        }).then(response => {
          this.responseData = response.returnObject;
          this.graduationEducationRatioData = this.object2List(this.responseData['graduation_education_ratio']);
          this.graduationSexRatioData = this.object2List(this.responseData['graduation_sex_ratio']);
          this.employRatioData = this.object2List(this.responseData['graduation_employ_ratio']);
          this.graduationProvince = this.object2List(this.responseData['graduation_province']);
          this.graduationIndustry = this.responseData['graduation_industry'];
          this.graduationNature = this.responseData['graduation_nature'];
          this.graduationEmployMethod = this.responseData['graduation_employ_method'];
          this.graduationSalary = this.responseData['graduation_salary'];
          this.loadingFlag = true;
        })
      },
      fetchGraduationSession() {
        getAllGraduationSession().then(response => {
          this.graduationSessionList = response.returnObject;
        })
      },
      fetchCollege() {
        getCollegeList().then(response => {
          this.collegeList = response.returnObject;
        })
      },
      object2List(obj) {
        return Object.keys(obj).map(key => {
          let objItem = {};
          objItem["name"] = key;
          objItem["value"] = parseInt(obj[key]);
          return objItem;
        });
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
