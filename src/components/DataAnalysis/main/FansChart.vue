<template>
  <div class="fansChart" id="fansChart">

   <div>
     <div id="ageChart" style="width: 100%;height:250px;"></div>
     <div id="sexChart" style="width: 100%;height: 250px;"></div>
     <div id="consumeChart" style="width: 100%;height: 250px;"></div>
   </div>
   <div v-show='msg' style='position:absolute; top:0px; text-align:center; width:100%'><i class="el-icon-loading"></i>{{message}}</div>
  </div>

</template>
<script>
import BScroll from 'better-scroll'

export default {
  name:'fansChart',
  data(){
    return{
        msg:false,
        message:''
    }
  },
  created() {
      //axios 获取数据
  },
   mounted: function () {
    const ageOptions={
        title: { text: '年龄消费比例' },
        legend: {
          align: 'right',
          data: ['女生', '男生'],
          right:20,
          textStyle: {
              align: 'right',
              baseline: 'middle',
              fontFamily: 'IRANSans'
          }
        },
        grid: {
            left: '8%',
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
          name:"消费比例（%）",
        },
        series: [{
            name: '女生',
            type: 'line',
            data: [5, 10, 36, 20, 10]
        },
        {
            name: '男生',
            type: 'line',
            data: [8, 20, 30, 25, 5]
        }]
}
const sexOptions={
    title:{text:'男女比例'},
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        data: ['男', '女'],
        formatter: function(name) {
            var oa = sexOptions.series[0].data;
            var num = oa[0].value + oa[1].value;
            for (var i = 0; i < sexOptions.series[0].data.length; i++) {
                if (name == oa[i].name) {
                    return name + '     ' + oa[i].value + '     ' + (oa[i].value / num * 100).toFixed(2) + '%';
                }
            }
        }
    },
    series: [{
        name: '用户属性',
        type: 'pie',
        radius: '25%',
        center: ['50%', '50%'],
        data: [{
            value: 310,
            name: '男'
        }, {
            value: 434,
            name: '女'
        }],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    // position:'inside',
                    formatter: '{b} : {c} ({d}%)'
                }
            },
            labelLine: {
                show: true
            }
        }
    }]
};
const consumeOptions={
    title:{text:'男女消费占比'},
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        data: ['男', '女'],
        formatter: function(name) {
            var oa = consumeOptions.series[0].data;
            var num = oa[0].value + oa[1].value;
            for (var i = 0; i < consumeOptions.series[0].data.length; i++) {
                if (name == oa[i].name) {
                    return name +': ' + (oa[i].value / num * 100).toFixed(2) + '%';
                }
            }
        }
    },
    color:['#8fc31f','#f35833'],
    series: [{
        name: '用户属性',
        type: 'pie',
        radius: '25%',
        center: ['50%', '50%'],
        data: [{
            value: 310,
            name: '男'
        }, {
            value: 434,
            name: '女'
        }],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    // position:'inside',
                    formatter: '{b} : ({d}%)'
                }
            },
            labelLine: {
                show: true
            }
        }
    }]
};
    
    var that=this;
    that.fansChartscroll = new BScroll(document.getElementById('fansChart'), {
        // click:true,
      }) 
   /* that.fansChartscroll.on('scrollStart',function(){
     
            that.msg=true;
            that.message='下拉刷新'
        

    })
    that.fansChartscroll.on('touchend',function(pos){
        if(pos.y>50){
            console.log('sdfsfsd')
            that.msg=true;
            that.message='刷新成功'
        }

        setTimeout(()=>{
            that.msg=false;
            that.message=''
        },1000)
    })*/
    // simulating async data from server
    var ageChart = echarts.init(document.getElementById('ageChart'));
    // 绘制图表
    ageChart.setOption(ageOptions);

    //圆饼图  
    //男女占比
    var sexChart = echarts.init(document.getElementById('sexChart'));
    sexChart.setOption(sexOptions);
    //男女消费占比
    var consumeChart = echarts.init(document.getElementById('consumeChart'));
    consumeChart.setOption(consumeOptions);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
// @import "../../../common/index.styl"

.fansChart
  position:absolute
  width 100%
  left 0px
  top 0
  bottom 0
  overflow auto
  margin 20px auto
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
</style>
