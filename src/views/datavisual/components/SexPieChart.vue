<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
//<!--  https://echarts.apache.org/examples/zh/editor.html?c=pie-custom-->
  import echarts from 'echarts'

  export default {
    name: "SexPieChart",
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
        type: Array,
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
          backgroundColor: '#ffffff',
          color: ['#e76f51','#2a9d8f'],
          title: {
            text: '毕业生性别比例',
            left: 'center',
            top: 0,
            textStyle: {
              color: '#000000'
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: this.chartData.sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                color: 'rgba(0, 0, 0, 0.6)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                // shadowBlur: 200,
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
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
