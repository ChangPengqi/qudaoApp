<template>
  <div class="withdrawalresult">
    <div class="title">
      <span>结果详情</span>
      <router-link to="/home/cashdetail/2" class="close">完成</router-link tag="span">
    </div>
    <div class="main">
      <el-steps :space="80" direction="vertical" :active="1"  finish-status="success">
        <el-step title="提现结果已经提交，等待银行处理" :description="description"  ></el-step>
        <el-step title="预计24小时内到账"></el-step>
       <!--  <el-step title="步骤 3"></el-step> -->
      </el-steps>
      <div></div>
    </div>
     <div class="process" @click="openProcess">去查看进度</div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {Step ,Steps} from 'element-ui'
export default {
  	name:'withdrawalresult',
    data() {
      return {
       /*  description:this.withDrawInfo.bankName+'('+this.withDrawInfo.bankFourNum+')'+this.withDrawInfo.money+'元'*/
      }
    },
    computed:{
      withDrawInfo:function(){
        return this.$store.state.withdrawInfo
      },
      description:function(){
        return this.withDrawInfo.bankName+' ('+this.withDrawInfo.bankFourNum+') '+this.withDrawInfo.money+'   元'
      }
    },
    components:{
      'el-steps':Steps,
      'el-step':Step
    },
    methods:{
      openProcess() {
        this.$router.push({path:'/home/cash/withdrawalprocess'})
      }
    },
    mounted:function(){
      this.checkSystem($('.withdrawalresult'))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.withdrawalresult
  position: fixed
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
  .title
    position: relative
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 400
    .close
      position: absolute
      right 0px
      width 60px
      line-height $barHeight
      color #fff
      font-size 14px
  .main
    width 100%
    padding 20px 
    background #fff
    border-1px(#eee)
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  .process
    width 100%
    height 50px
    line-height 50px
    text-align center
    font-size 14px
    font-weight 400
    background #fff
    &:active
      background rgba(0, 0, 0, .2)
</style>
