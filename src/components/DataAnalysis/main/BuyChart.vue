<template>
  <div class="buyChart">
    <div id="buyChart" style="width: 100%;height: 250px;"></div>
  </div>
</template>
<script>

const buyOptions={
    title : {
        text: '用户消费分析',
        // subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['食品','教育','箱包','家电','服装']
    },
    series : [
        {
            name: '购买消费',
            type: 'pie',
            radius : '55%',
            center: ['60%', '50%'],
            data:[
                {value:335, name:'食品'},
                {value:310, name:'教育'},
                {value:234, name:'箱包'},
                {value:135, name:'家电'},
                {value:548, name:'服装'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
export default {
  name:'buyChart',
  created() {
      //axios 获取数据
  },
   mounted: function () {
    // simulating async data from server
    var buyChart = echarts.init(document.getElementById('buyChart'));
    // 绘制图表
    buyChart.setOption(buyOptions);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.buyChart
  width 100%
  margin 30px auto
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
 
</style>
