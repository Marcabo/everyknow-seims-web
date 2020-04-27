<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
//<!--  https://gallery.echartsjs.com/editor.html?c=x1r0Pqnp-I-->
  import resize from "@/views/datavisual/components/mixins/resize";
  import echarts from 'echarts'

  export default {
    mixins: [resize],
    name: "PieChart",
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
        bgColor: '#ffffff',
        total: this.chartData.reduce((a, b) => {
          return a + b.value * 1
        }, 0)
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
        console.log(this.chart);
        this.setOptions()
      },
      setOptions() {
        this.chart.setOption({
          backgroundColor: this.bgColor,
          title: [{
            text: '{name|' + this.title + '}\n{val|' + this.formatNumber(this.total) + '}',
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: '#666666',
                  padding: [10, 0]
                },
                val: {
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#333333',
                }
              }
            }
          }, {
            text: '毕业生人数学历比例',
            top: 0,
            left: "center",
            textStyle: {
              color: '#000000'
            }
          }],
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          series: [{
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            data: this.chartData.sort(function (a, b) { return a.value - b.value; }),
            // hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: this.bgColor,
                borderWidth: 2
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 90,
                lineStyle: {
                  color: '#e6e6e6'
                }
              }
            },
            label: {
              normal: {
                formatter: params => {
                  return (
                    '{icon|●}{name|' + params.name + '}{value|' +
                    this.formatNumber(params.value) + '}'
                  );
                },
                padding: [0, -100, 25, -100],
                rich: {
                  icon: {
                    fontSize: 16
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 10, 0, 4],
                    color: '#666666'
                  },
                  value: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333333'
                  }
                }
              }
            },
          }]
        })
      },
      formatNumber(num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
      },

    }
  }
</script>

<style scoped>

</style>
