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
  import {getYearAnalysis} from "@/api/yearanalysis";
  import StuNumLineBar from "@/views/yearanalysis/components/StuNumLineBar";
  import StuEmployRatioLineBar from "@/views/yearanalysis/components/StuEmployRatioLineBar";
  import StuSalaryLine from "@/views/yearanalysis/components/StuSalaryLine";
  import StuEmployMethodLine from "@/views/yearanalysis/components/StuEmployMethodLine";
  import {getCurrentTime} from "@/utils";

  export default {
    name: "SchoolAnalysis",
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
    },
    methods: {
      fetchData() {
        this.loadingFlag = false;
        getYearAnalysis({
          startSession : this.year1 === '' ? new Date().getFullYear() - 6 : this.year1.getFullYear(),
          endSession : this.year2 === '' ? new Date().getFullYear() : this.year2.getFullYear()
        }).then(response => {
          this.responseData = response.returnObject;
          this.graduationTotal = this.responseData['graduation_total'];
          this.graduationEmployRatio = this.responseData['graduation_employ_ratio'];
          this.graduationYearSalary = this.responseData['graduation_year_salary'];
          this.graduationEmployType = this.responseData['graduation_employ_type'];
          this.loadingFlag = true;
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
