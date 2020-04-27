<template>
  <div ref="chartRef" :class="className" :style="{height:height,width:width}" />
</template>

<script>
//<!--  https://gallery.echartsjs.com/editor.html?c=x2tRzmh87r-->
  import echarts from 'echarts'

  export default {
    name: "CompanyNatureBar",
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
        default: '450px'
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
            text: '毕业生单位性质',
            left: 'center',
            top: 0,
            textStyle: {
              color: '#000000'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}<br/>{c}人",
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            top: '20%',
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: Object.keys(this.chartData),
          }],
          yAxis: [{
            type: 'value'
          }],

          series: [{
            name: '人数统计',
            barMaxWidth: '40%',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    '#C1232B', '#B5C334', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: (params) => {
                    var total = 0;
                    var percent = 0;
                    Object.values(this.chartData).forEach(function(value, index) {
                      total += value;
                    });
                    percent = ((params.value / total) * 100).toFixed(2);
                    return '' + params.name + '\n\n' + params.value + '人，' + '' + percent + '%';
                  },
                }
              }
            },
            data: Object.values(this.chartData),
          }]
        })
      }
    }
  }
</script>

<style scoped>

</style>
