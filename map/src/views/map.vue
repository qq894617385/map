<!-- 地球 -->
<template>
  <div class="main-contant">
    <div ref="charts" class="charts" />
  </div>
</template>

<script>
var echarts = require('echarts')
import world from 'echarts/map/json/world.json'
echarts.registerMap('world', world)
import map from './map_json/geoCoordMap.js'
export default {
  name: 'Map',
  components: {},
  data() {
    return {
      charts: {}
    }
  },

  computed: {},

  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.charts = echarts.init(this.$refs.charts)
      var data = [
        { name: '上海', value: 40300 },
        { name: '北京', value: 5000 },
        { name: '广州', value: 50000 },
        { name: '杭州', value: 213213 },
        { name: '新疆', value: 213213 },
        { name: '重庆', value: 213213 },
        { name: '云南', value: 213 },
        { name: '青海', value: 213 }
      ]
      var max = 50000
      var geoCoordMap = map

      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              num: data[i].value
            })
          }
        }
        return res
      }

      var option = {
        backgroundColor: '#000001',
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'world',
          center: [108.97, 35.71],
          zoom: 4,
          label: {
            emphasis: {
              show: true
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#012537',
              borderColor: '#056da2'
            },
            emphasis: {
              areaColor: '#004981'
            }
          }
        },
        series: [
          {
            name: '数值',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              const maxSize = 20
              const minSize = 8
              let tar = parseInt(val[2] / max * maxSize, 10)
              if (tar < minSize) {
                tar = minSize
              }
              if (tar > maxSize) {
                tar = maxSize + 1
              }
              return tar
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              color: '#ffec3d',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            hoverAnimation: true,
            tooltip: {
              formatter: (params) => {
                return params.data.name + ':' + params.data.num
              }
            }
          }
        ]
      }
      this.charts.setOption(option)
    }
  }
}

</script>
<style lang='less' scoped>
.main-contant {
  display: flex;
  align-items: center;
  justify-content: center;
  .charts {
    width: 100vw;
    height: 100vh;
  }
}
</style>
