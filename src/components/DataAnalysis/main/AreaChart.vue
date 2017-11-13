<template>
  <div class="areaChart" id="areaChart">
   <div>
     <div id="countyChart" style="width: 100%;height:250px;"></div>
     <div id="dayChart" style="width: 100%;height: 250px;"></div>
     <div id="monthChart" style="width: 100%;height: 250px;"></div>
     <div id="yearChart" style="width: 100%;height: 250px;"></div>
     <div id="hzChart" style="width: 100%;height: 250px;"></div>
   </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name:'areaChart',
  created() {
      //axios 获取数据
  },
   mounted() {


    const countyOptions={
        title: {
            text: '区域消费分析',
            // subtext: 'By sunweizy'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
            data: ['2016年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            "axisLabel": {
                "interval": 0,
                formatter: '{value}%',
            }
        },
        yAxis: {
            type: 'category',
            data: ['郑州市',
                '金水区',
                '二七区',
                '中原区',
                '高新区',
                '经开区',
                '惠济区',
                '荥阳市',
                '新密市',
                '新郑市',
                '中牟市',
            ]
        },
        series: [{
            name: '2016年占比',
            type: 'bar',
            data: [2.00, 3.00, 5.00, 5.50, 6.50, 6.50, 7.50, 8.50, 8.50, 9.50, 10.0]
        }]
    };
    const dayOptions={
            title: { text: '日消费分析' },
            
            legend: {
              align: 'left',
              data: ['日消费分析'],
              textStyle: {
                  align: 'right',
                  baseline: 'middle',
                  fontFamily: 'IRANSans'
              }
            },    
            tooltip: {},
            xAxis: {
                // name:"年龄",
                data: ["12-23","12-24","12-25","12-26","12-27"]
            },
            yAxis: {
              name:"（万）",
            },
            series: [{
                name: '日消费分析',
                type: 'line',
                data: [5, 10, 36, 20, 10]
            },
            
             ]
    }
    const monthOptions={
            title: { text: '月消费分析' },
            
            legend: {
              align: 'left',
              data: ['月消费分析'],
              textStyle: {
                  align: 'right',
                  baseline: 'middle',
                  fontFamily: 'IRANSans'
              }
            },    
            tooltip: {},
            xAxis: {
                // name:"年龄",
                data: ["6","7","8","9","10"]
            },
            yAxis: {
              name:"（万）",
            },
            series: [{
                name: '月消费分析',
                type: 'line',
                data: [5, 10, 16, 20, 25]
            },
            
             ]
    }
    const yearOptions={
            title: { text: '年消费分析' },
            
            legend: {
              align: 'left',
              data: ['年消费分析'],
              textStyle: {
                  align: 'right',
                  baseline: 'middle',
                  fontFamily: 'IRANSans'
              }
            },    
            tooltip: {},
            xAxis: {
                // name:"年龄",
                data: ["2012","2013","2014","2015","2016"]
            },
            yAxis: {
              name:"（万）",
            },
            series: [{
                name: '年消费分析',
                type: 'line',
                data: [5, 8, 10, 20, 30]
            },
            
             ]
    }
    const hzOptions={
            title: { text: '消费频次分析' },
            
            legend: {
              align: 'left',
              data: ['消费频次分析'],
              textStyle: {
                  align: 'right',
                  baseline: 'middle',
                  fontFamily: 'IRANSans'
              }
            },    
            tooltip: {},
            xAxis: {
                // name:"年龄",
                data: ["2012","2013","2014","2015","2016"]
            },
            yAxis: {
              name:"（万）",
            },
            series: [{
                name: '消费频次分析',
                type: 'line',
                smooth:true,
                data: [5, 8, 10, 20, 30]
            },
            
             ]
    }
    let fansChartscroll = new BScroll(document.getElementById('areaChart'), {
        // click:true,
      }) 
    // simulating async data from server
    var countyChart = echarts.init(document.getElementById('countyChart'));
    // 绘制图表
    countyChart.setOption(countyOptions);

    //日消费分析
    var dayChart = echarts.init(document.getElementById('dayChart'));
    dayChart.setOption(dayOptions);
    //月消费分析
    var monthChart = echarts.init(document.getElementById('monthChart'));
    monthChart.setOption(monthOptions);
    //年消费分析
    var yearChart = echarts.init(document.getElementById('yearChart'));
    yearChart.setOption(yearOptions);
    //男女消费占比
    var hzChart = echarts.init(document.getElementById('hzChart'));
    hzChart.setOption(hzOptions);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.areaChart
  position: absolute
  z-index 1000
  top -20px 
  right 0
  left 0
  bottom 0
  overflow auto
  width 100%
  margin 15px auto
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  div
    width 100%
    margin 30px auto
    border-1px(#eee)
</style>
