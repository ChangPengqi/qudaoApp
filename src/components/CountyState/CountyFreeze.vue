<template>
  <div class="countydetail">
    <div class="title">
      <router-link to="/home/countydealer" class="fa icon-left back" tag="i"></router-link>
      <span>{{county_name}}</span>
    </div>
    <div class="main">
      <div class="item img"><img src="./freeze.png" width="26" height="30"></div>
      <div class="item text">您的帐号已经被冻结</div>
      <div class="item reason">原因：资质造假，提交虚假信息</div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'countydetail',
    data() {
      return {
         msg:"wo shi fensi xiangqing"
      }
    },
    methods:{
      
    },
    computed:{
      county_name:function(){
        return this.$store.state.county_name;
      }
    },
    mounted:function(){
      this.checkSystem($('.countydetail'))
      
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.countydetail
  position: fixed
  top 0
  left 0
  right 0
  bottom 0
  background #eee
  .title
    position: relative
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight 500
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
  .main
    width 100%
    height 145px
    background #fff
    text-align center
    overflow hidden
    .item
      margin-bottom 15px
      &:first-child
        margin-top 30px
      &.text
        font-weight 500
        font-size 14px
      &.reason
        font-size 12px
        color $mainColor
        font-weight 500
</style>
