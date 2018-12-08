<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
  import echarts from 'echarts'
  import tdTheme from './theme.json'
  import { on, off } from '@/libs/tools'
  echarts.registerTheme('tdTheme', tdTheme)
  export default {
    name: 'ChartBar',
    props: {
      value: Object,
      text: String,
      yname: String,
      subtext: String
    },
    data() {
      return {
        dom: null
      }
    },
    methods: {
      resize() {
        this.dom.resize()
      }
    },
    mounted() {
      this.$nextTick(() => {
        let xAxisData = Object.keys(this.value)
        let seriesData = Object.values(this.value)
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            borderWidth: 0,
            left: 60,
            bottom: 50,
            right: 20,
            textStyle: {
              // color: "#fff"
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            name: this.yname,
            splitNumber: 2,
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: {
              color: '#516b91'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            type: 'value'
          },
          series: [{
            data: seriesData,
            type: 'bar'
          }]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    },
    beforeDestroy() {
      off(window, 'resize', this.resize)
    }
  }
</script>