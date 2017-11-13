<template>
  <div class="rebatecreditdetail" id="rebatecreditdetail">
    <div class="title">
      <router-link to="/home/rebate/" class="fa icon-left back"></router-link>
      <span>说明</span>
    </div> 
    <div class="main">
      <p>返利=（全年的消费总额-坏账-未还款） * 利率</p>
      <p>全年的消费总额，只计算已完成订单（用户确认收货已超过七天）</p>
      <p>结算完成之后7天，返利金额发放到余额，渠道可以提现，手续费千六</p>
    </div>
    
  </div>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
    name:'rebatecreditdetail',
    data() {
      return {
         /*activeKey:false,  //判断信用钱包是否激活    */     
      }
    },
    methods:{
     
    },
    computed:{
      activecredit:function(){
        return this.$store.state.activecredit;
      }
    },
    mounted:function(){
      this.checkSystem($('.rebatecreditdetail'))
      
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.rebatecreditdetail
  position: absolute
  top 0
  left 0
  right 0
  bottom 0
  background #fff
  overflow-x hidden
  overflow-y auto 
  -webkit-overflow-scrolling:touch
  .title
    position: relative
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 400
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
      color #fff
  .main
    padding 20px
    line-height 20px
    .list
      display flex
      width 100%
      height 50px
      line-height 50px
      background #fff
      border-1px(#eee)
      padding 0 15px
      font-size 15px
      font-weight 500
      .text
        flex 1
      .avatar,.tel,.sex,.quota,.service,.rebateMoney,.time,.activetime
        flex 1
        text-align right
        margin-right 30px
      .avatar
        width 40px
        height 40px
        margin-top 4px
        overflow hidden
  .tips
    width 100%
    margin-top 30px
    text-align center
    color $mainColor
    font-weight bolder
</style>
