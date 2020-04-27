<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "EmployRatioTreeMap",
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

      }
    },
    // watch: {
    //   chartData: {
    //     deep: true,
    //     handler(val) {
    //       this.setOptions(val)
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
            text: '毕业生就业比例',
            left: 'center',
            top: 0,
            textStyle: {
              color: '#000000'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },

          series: [{
            type: 'treemap',
            left: 'center',
            width: '50%',
            height: '60%',
            roam: false,
            breadcrumb:{
              show:false
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b}"
                },
                borderWidth:2
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            label: {
              normal: {
                fontSize: 17
              }
            },
            data: this.chartDataC(this.chartData)
          }],
          color: ["#FFBD9D",  "#F75000"]
        })
      },
      chartDataC(valList) {
        console.log(valList)
        let total = 0;
        for (let val in valList) {
          total = total + valList[val]['value'];
        }
        console.log(total)
        for (let i=0; i < valList.length; i++) {
          valList[i]['name'] = valList[i]['name'] + '\n\n' + (parseInt(valList[i]['value'])/total * 100).toFixed(2) + '%'
        }
        return valList;
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
