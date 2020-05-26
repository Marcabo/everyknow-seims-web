<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
//<!--  https://gallery.echartsjs.com/editor.html?c=x6fvoDh-S-->

  import echarts from "echarts";

export default {
  name: "StuNumLineBar",
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
    setOptions() {
      this.chart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          right: '2%',
          left: '2%',
          bottom: '10%'
        },
        xAxis: [{
          type: 'category',
          color: '#59588D',
          data: Object.keys(this.chartData),
          axisLabel: {
            margin: 20,
            color: '#999',
            textStyle: {
              fontSize: 8
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(107,107,107,0.37)',
            }
          },
          axisTick: {
            show: true
          },
        }],
        yAxis: [{
          axisLabel: {
            formatter: '{value}',
            color: '#999',
            textStyle: {
              fontSize: 16
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(107,107,107,0.37)',
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(131,101,101,0.2)',
              type: 'dashed',
            }
          }
        }],
        series: [{
          name: '学生总人数',
          type: 'bar',
          data: Object.values(this.chartData),
          barWidth: '50px',
          itemStyle: {
            normal: {
              color: function(params){
                let colorArr = params.value > 0?['#FF9A22', '#FFD56E']:['#FFD56E', '#FF9A22']
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: colorArr[0] // 0% 处的颜色
                }, {
                  offset: 1,
                  color:  colorArr[1]// 100% 处的颜色
                }], false)
              },
              barBorderRadius: [30, 30, 0, 0]
            },
          },
          label: {
            normal: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333',
              position: 'top',
            }
          }
        }]
      })
    }
  }
  }
</script>

<style scoped>

</style>
