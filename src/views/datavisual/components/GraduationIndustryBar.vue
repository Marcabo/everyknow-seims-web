<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
//<!--  https://gallery.echartsjs.com/editor.html?c=xiiP_yJDT-->
  import echarts from "echarts";

  var index = 0;
  var colorList = ['#004e64', '#00a5cf', '#20d180', '#0093ff','#1c7c54','#52796f'];

  export default {
    name: "GraduationIndustryBar",
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
        default: '900px'
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
        chart: null,
      }
    },
    // watch: {
    //   chartData: {
    //     deep: true,
    //     handler() {
    //       this.setOptions()
    //     }
    //   }
    // },
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
          title: {
            text: '毕业生行业类别',
            left: 'center',
            top: 0,
            textStyle: {
              color: '#000000'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false
          },
          grid: {
            left: 100
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'value',

            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }

          },
          yAxis: {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              label: {
                show: true,
                margin: 30
              }
            },
            data: Object.keys(this.chartData),
            axisLabel: {
              margin: 100,
              fontSize: 14,
              align: 'left',
              color: '#333',
              rich: {
                a1: {
                  color: '#fff',
                  backgroundColor: colorList[3],
                  width: 30,
                  height: 30,
                  align: 'center',
                  borderRadius: 2
                },
                a2: {
                  color: '#fff',
                  backgroundColor: colorList[3],
                  width: 30,
                  height: 30,
                  align: 'center',
                  borderRadius: 2
                },
                a3: {
                  color: '#fff',
                  backgroundColor: colorList[3],
                  width: 30,
                  height: 30,
                  align: 'center',
                  borderRadius: 2
                },
                b: {
                  color: '#fff',
                  backgroundColor: colorList[3],
                  width: 30,
                  height: 30,
                  align: 'center',
                  borderRadius: 2
                }
              },
              formatter: function(params) {
                if (index == 11) {
                  index = 0;
                }
                index++;
                if (index - 1 < 3) {
                  return [
                    '{a' + index + '|' + index + '}' + '  ' + params.substring(0,3)
                  ].join('\n')
                } else {
                  return [
                    '{b|' + index + '}' + '  ' + params.substring(0,3)
                  ].join('\n')
                }
              }
            }
          },
          series: [{
            z: 2,
            name: 'value',
            type: 'bar',
            data: Object.values(this.chartData).map((item, i) => {
              let itemStyle = {
                color: colorList[i % colorList.length]
              }
              return {
                value: item,
                itemStyle: itemStyle
              };
            }),
            label: {
              show: true,
              position: 'right',
              color: '#333333',
              fontSize: 14,
              offset: [10, 0]
            }
          }

          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
