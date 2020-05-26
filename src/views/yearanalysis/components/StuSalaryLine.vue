<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "StuSalaryLine",
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      chartData: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        default: '总数'
      }
    },
    data() {
      return {

      }
    },
    watch: {
      chartData: {
        deep: true,
        handler() {
          this.setOptions()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs['chartRef']);
        this.setOptions()
      },
      getService() {
        let result = [];
        const chartDataArr = Object.keys(this.chartData);
        for (let index in chartDataArr) {
          result.push({
            name: chartDataArr[index],
            type: 'line',
            symbol: 'circle',
            sybolSize: 3,
            data: Object.values(this.chartData[chartDataArr[index]]),
            itemStyle: {
              normal: {
                shadowColor: 'rgba(210, 111, 214, 1)',
                shadowBlur: 10
              }
            }
          })
        }

        return result;
      },
      getYearSalary(year) {
        return Object.values(this.chartData[year])
      },
      setOptions() {
        this.chart.setOption({
          backgroundColor: '#fffcfc',
          // title: {
          //   text: '血糖达标率统计',
          //   left: '10px',
          //   textStyle: {
          //     color: '#333'
          //   }
          // },
          name: 'a',
          tooltip: {
            trigger: 'axis', //按x轴显示
            show: true,
            formatter :function(params){
              let name = params[0].name + '<br>';
              let result = name;
              for (let index in params) {
                result += params[index].marker + params[index].seriesName + ':' + params[index].value + '<br>';
              }
              return result
            },
            axisPointer: {
              type:"line",
              lineStyle: {
                width:50,
                color: 'rgba(255,255,255,.3)',
                extraCssText: 'z-index: -111', //添加阴影
                symbolSize: 10
              },

            },
            backgroundColor: 'rgba(0,0,0,.5)',
            textStyle: {
              align: 'left',
              fontSize: 12,
              color: '#fff',
            }
          },
          color: ['#D26962','#41CBA6','#D26FD6','#4C91E3','#008080','#FFD700'],
          grid: {
            left: '5%',
            right: '6%',
            top: '20%',
            bottom: '6%',
            containLabel: true
          },
          legend: {
            show: true,
            right: 45,
            shadowColor:'rgba(210, 105, 98, 1)',
            shadowBlur:10,
            itemGap: 63,
            textStyle: {
              fontSize: 12,
              color: ['#D26962','#41CBA6','#D26FD6','#4C91E3']
            },
            data: Object.keys(this.chartData)
          },
          xAxis: {
            show: true,
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#2A2A2A',
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#E0E0E0',
                type:"dashed"
              }
            },
            axisLabel: {
              rotate: 0,
              textStyle: {
                fontSize: '70%',
                color: '#aaa'
              },
            },
            // data: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7','4-8','4-9','4-10','4-11','4-12','4-13','4-14']
            // "s_l4w":0,"s4_8W":0,"s8_12w":0,"s12_16w":0,"s16_20w":0,"s20_24w":0,"s24_28w":0,"s_g28w":0
            data: ['0-4w','4-8w','8-12w','12-16w','16-20w','20-24w','24-28w','28-++w']
          },
          yAxis: {
            show: true,
            name: '单位: 人',
            type: 'value',
            splitNumber : 12,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#aaa',
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type:"dashed",
                color: '#E0E0E0'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: '70%',
                color: '#aaa'
              }
            }
          },
          series: this.getService()
        })
      }
    }
  }
</script>

<style scoped>

</style>
