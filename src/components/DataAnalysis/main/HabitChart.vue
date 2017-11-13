<template>
  <div class="habitChart">
    <div id="habitChart" style="width: 100%;height:250px;"></div>
  </div>
</template>
<script>

const habitOptions={
        // title: { text: 'ECharts 入门示例' },
        
        legend: {
          align: 'left',
          data: ['分期', '现金'],
          textStyle: {
              align: 'right',
              baseline: 'middle',
              fontFamily: 'IRANSans'
          }
        },
        grid: {
            left: '4%',
            right: '13%',
            bottom: '20%',
            containLabel: true
        },  
        tooltip: {},
        xAxis: {
            name:"年龄",
            data: ["0-20","20-30","30-40","40-50","50-60"]
        },
        yAxis: {
          name:"比例（%）",
        },
        series: [{
            name: '分期',
            type: 'line',
            smooth:true, 
            data: [5, 10, 36, 20, 10]
        },
        {
            name: '现金',
            type: 'line',
            smooth:true, 
            data: [8, 20, 30, 25, 5]
        }]
}
export default {
  name:'habitChart',
  created() {
      //axios 获取数据
  },
   mounted: function () {
    // simulating async data from server
    var habitChart = echarts.init(document.getElementById('habitChart'));
    // 绘制图表
    habitChart.setOption(habitOptions);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.habitChart
  width 100%
  margin 30px auto
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
 
</style>
