<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from "echarts";

  var datas = {
    company: "%",
    // xdata: ['景洪市', '勐海县', '勐腊县'],
    legend: ['已就业', '未就业', '就业率'],
    // dataArr: [2.5, 2.1, 1.8],
    // dataArr2: [8, 3.9, 6.5, ],
    // dataArr3: [65,84, 102],
    total:30
  }
  // var ydata = [];
  // var scale = 1;
  // // var color = 'rgba(0,254,255,';
  // var maxYdata = [];
  // for (var i = 0; i < datas.dataArr.length; i++) {
  //   var item = scale;
  //   ydata.push(item);
  //   maxYdata.push(100)
  // };
  var normalColor = "rgba(0,0,0,.5)";

  export default {
    name: "StuEmployRatioLineBar",
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
      getEmployStu() {
        return Object.keys(this.chartData).map(key => {
          return this.chartData[key]['employ_num']
        })
      },
      getNoEmployStu() {
        return Object.keys(this.chartData).map(key => {
          return this.chartData[key]['total_num'] - this.chartData[key]['employ_num']
        })
      },
      getStuNum() {
        return Object.keys(this.chartData).map(key => {
          return this.chartData[key]['total_num']
        })
      },
      getEmployRatio() {
        return Object.keys(this.chartData).map(key => {
          return this.chartData[key]['employ_num']/this.chartData[key]['total_num'] * 100
        })
      },
      setOptions() {
        this.chart.setOption({
          // backgroundColor: 'rgb(8,43,101)',
          title: {
            textStyle: {
              fontSize: 14
            }
          },
          legend: {
            show: true,
            // icon: "rect",
            // itemWidth: 20,
            // itemHeight: 3,
            right: "center",
            top: "5%",
            textStyle: {
              color: "#000",
              fontSize: 16
            },
            data: datas.legend
          },
          tooltip: { // 提示框组件
            trigger: 'axis',
            show: true,
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            padding:10,
            formatter: function(params) {
              return params[0].name + "<br/>"
                + "总人数:" + (parseInt(params[0].data) + parseInt(params[1].data)) + "<br/>"
                + datas.legend[0] + ":" + params[0].data + "<br/>"
                + datas.legend[1] + ":" + params[1].data + "<br/>"
                + datas.legend[2] + ":" + params[2].data + '%';
              // return params[0].name + "年" + params[0].data + datas.company;
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            top: '15%',
            containLabel: true,
            show: false // 网格边框是否显示，上和右边框
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true, // 坐标轴两边留白
            axisLabel: {
              color: normalColor,
              fontSize: 16,
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: normalColor,
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "solid",
                color: normalColor
              }
            },
            data: Object.keys(this.chartData)
          }],
          yAxis: [{
            name: "单位:人",
            nameTextStyle: {
              fontSize: 16,
            },
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: normalColor,
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: normalColor,
              fontSize: 16,
              // margin: 25,
              formatter: '{value}'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                color: normalColor
              }
            },
          }, {
            name: "单位:%",
            nameTextStyle: {
              fontSize: 16,
            },
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
              show: false,
              lineStyle: {
                color: normalColor,
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: normalColor,
              fontSize: 16,
            },
            splitLine: {
              show: false,
            },
          }, ],

          series: [{
            name: '未修复',
            type: 'bar',
            yAxisIndex: 0,
            stack: '1',
            zlevel: 2,
            barGap: '50%',
            barWidth: '40%',
            barCategoryGap: "50%",
            color: normalColor,

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(91,155,213,1)'
                }, {
                  offset: 1,
                  color: 'rgba(91,120,213,.8)'
                }]),
                label: {
                  show: false,
                }

              }
            },
            data: this.getEmployStu()
          },
            {
              name: '已修复',
              type: 'bar',
              yAxisIndex: 0,
              stack: '1',
              zlevel: 2,
              barGap: '50%',
              barWidth: '40%',
              barCategoryGap: "50%",
              color: normalColor,

              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    // color: color +'.5)'
                    color: 'rgba(237,125,49,.8)'
                  }, {
                    offset: 1,
                    // color: 'rgba(25,94,122,0.8)'
                    color: 'rgba(237,105,49,1)'
                  }]),
                  label: {
                    show: false,
                  }

                }
              },
              data: this.getNoEmployStu()
            },
            {
              name: '修复率',
              type: 'line',
              yAxisIndex: 1,
              zlevel: 2,
              symbol: 'none',
              lineStyle: {
                width: 3
              },
              itemStyle: {
                normal: {
                  color: 'rgba(218,234,6,1)',

                }
              },
              data: this.getEmployRatio()
            },
            {
              name: '',
              type: 'bar',
              barGap: '-100%',
              yAxisIndex: 1,
              zlevel: 1,
              itemStyle: {
                normal: {
                  color: 'rgba(25,94,122,0)',
                }
              },
              barWidth: '40%',
              // data: maxYdata
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
