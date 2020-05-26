<template>
  <div class="data-visual-school">
    <el-row style="text-align: center; margin-top: 30px">
      <span class="el-row-span">请选择毕业年份:</span>
      <el-date-picker
              v-model="year1"
              type="year"
              placeholder="选择年">
      </el-date-picker>
      ~
      <el-date-picker
              v-model="year2"
              type="year"
              placeholder="选择年">
      </el-date-picker>
      &nbsp;
      <el-select v-model="collegeCode" placeholder="学院" clearable class="filter-item" style="width: 250px; margin-right: 10px">
        <el-option v-for="item in collegeList" :key="item.id" :label="item.collegeName" :value="item.collegeCode" />
      </el-select>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"
                 @click="fetchData()">
        查看
      </el-button>
    </el-row>
    <br/>
    <el-row>
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        历年毕业生总人数
        <stu-num-line-bar v-if="loadingFlag" :chart-data="graduationTotal" />
      </el-card>
    </el-row>
    <br/>
    <el-row>
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        历年就业率
        <stu-employ-ratio-line-bar v-if="loadingFlag" :chart-data="graduationEmployRatio" />
      </el-card>
    </el-row>
    <br/>
    <el-row>
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        就业年薪分布
        <stu-salary-line v-if="loadingFlag" :chart-data="graduationYearSalary" />
      </el-card>
    </el-row>
    <br/>
    <el-row>
      <el-card shadow="hover"  style="margin-right:20px; margin-left:20px;">
        就业方式分布
        <stu-employ-method-line v-if="loadingFlag" :chart-data="graduationEmployType" />
      </el-card>
    </el-row>

  </div>
</template>

<script>
  import StuEmployMethodLine from "@/views/yearanalysis/components/StuEmployMethodLine";
  import StuNumLineBar from "@/views/yearanalysis/components/StuNumLineBar";
  import StuEmployRatioLineBar from "@/views/yearanalysis/components/StuEmployRatioLineBar";
  import StuSalaryLine from "@/views/yearanalysis/components/StuSalaryLine";
  import {getYearAnalysis} from "@/api/yearanalysis";
  import {getCollegeList} from "@/api/college";

  export default {
    name: "CollegeAnalysis",
    components: {
      StuEmployMethodLine,
      StuNumLineBar,
      StuEmployRatioLineBar,
      StuSalaryLine,
      StuEmployMethodLine
    },
    data() {
      return {
        year1: '',
        year2: '',
        collegeCode: '',
        collegeList: undefined,
        loadingFlag: false,
        responseDate: undefined,
        graduationTotal: undefined,
        graduationEmployRatio: undefined,
        graduationYearSalary: undefined,
        graduationEmployType: undefined
      }
    },
    created() {
      this.fetchData();
      this.fetchCollege();
    },
    methods: {
      fetchData() {
        this.loadingFlag = false;
        getYearAnalysis({
          startSession : this.year1 === '' ? new Date().getFullYear() - 6 : this.year1.getFullYear(),
          endSession : this.year2 === '' ? new Date().getFullYear() : this.year2.getFullYear(),
          collegeCode: this.collegeCode
        }).then(response => {
          this.responseData = response.returnObject;
          this.graduationTotal = this.responseData['graduation_total'];
          this.graduationEmployRatio = this.responseData['graduation_employ_ratio'];
          this.graduationYearSalary = this.responseData['graduation_year_salary'];
          this.graduationEmployType = this.responseData['graduation_employ_type'];
          this.loadingFlag = true;
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
    }
  }
</script>

<style scoped>

</style>
