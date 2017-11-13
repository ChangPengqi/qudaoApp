<template>
  <div class="activecreditdetail">
    <div class="title">
      <router-link to="/home/countydetail" class="fa icon-left back"></router-link>
      <span>激活信用钱包</span>
    </div>
    <div class="main">
      <div class="credit item">
        <div class="text">信用钱包额度</div>
        <div class="content">{{countycreditdetail.creditscore}}</div>
      </div>
      <div class="activeTime item">
        <div class="text">激活时间</div>
        <div class="content">{{countycreditdetail.activation_time}}</div>
      </div>
      <div class="formalities item">
        <div class="text">手续费</div>
        <div class="content">￥ {{countycreditdetail.poundage}}</div>
      </div>
      <div class="rebateMoney item">
        <div class="text">返利</div>
        <div class="content">￥ {{countycreditdetail.money}}</div>
      </div>
      <div class="rebateTime item">
        <div class="text">返利时间</div>
        <div class="content">{{countycreditdetail.ctime}}</div>
      </div>
    </div>
  </div>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
  	name:'activecreditdetail',
    data() {
      return {
         
         
      }
    },
    methods:{
      openInstallment() {
        this.$router.push({path:'/home/fans/fansinstallmentdetail'})
      }
    },
    computed:{
      countycreditdetail:function(){
        return this.$store.state.countycreditdetail;
      }
    },
    mounted:function(){
       this.checkSystem($('.activecreditdetail'))
      // let rebateDetailscroll = new BScroll(document.getElementById('rebateDetail'), {
      //   // click:true,
      //   // bounceTime:300,
      //   // swipeBounceTime: 800
      // })
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.activecreditdetail
  position: fixed
  top 0
  left 0
  right 0px
  bottom 0
  background #eee
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
    width 100%
    padding 0 15px
    background #fff
    .item
      display flex
      height 60px
      width 100%
      border-1px(#eee)
      line-height 60px
      font-size 14px
      font-weight 500
      .text
        flex 1
      .content
        flex 1
        text-align right
        margin-right 30px
</style>
