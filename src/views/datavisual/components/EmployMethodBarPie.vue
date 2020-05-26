<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
//<!--  https://gallery.echartsjs.com/editor.html?c=x7MdvdNf9_-->
  import echarts from "echarts";

  var colorList = ['#004e64', '#00a5cf', '#20d180', '#0093ff', '#1c7c54', '#52796f'];

  export default {
    name: "EmployMethodBarPie",
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
        default: '600px'
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
          title: {
            text: '毕业生就业方式',
            left: 'center',
            top: 0,
            textStyle: {
              color: '#000000'
            }
          },
          color: colorList,
          tooltip: {},
          // height: '750',
          grid: [{
            right: '20%',
            bottom: '5%',
          }],
          xAxis: {
            data: Object.keys(this.chartData)
          },
          yAxis: {},
          series: [{
            z: 2,
            name: 'value',
            type: 'bar',
            barWidth: 80,
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
          },

            {
              name: '访问来源',
              type: 'pie',
              radius: '40%',
              center: ['85%', '35%'],
              //          data:['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
              //          data: [5, 20, 36, 10, 10, 20]

              data: this.object2List(this.chartData),
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
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
