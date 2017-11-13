<template>
  <div class="dataAnalysis">
    <div class="title">
      <router-link to="/home" class="fa icon-left back"></router-link>
      <span>数据分析</span>
    </div>
    <div class="main">
      <div class="tab">
        <router-link to="/home/dataanalysis/fansChart" class="item" tag="div">粉丝量</router-link>
        <router-link to="/home/dataanalysis/areaChart" class="item" tag="div">消费区域</router-link>
        <router-link to="/home/dataanalysis/buyChart" class="item" tag="div">购买消费</router-link>
        <router-link to="/home/dataanalysis/habitChart" class="item" tag="div">购物习惯</router-link>
      </div>
      <div class="content" id="content">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  	name:'dataAnalysis',
    
    data() {
      return {
         
      }
    },
    methods:{
      backToHome() {

      },
      sortBy() {
        this.sortKey=!this.sortKey
      }
    },
    mounted:function(){
      this.checkSystem($('.dataAnalysis'))
      setTimeout(() => {
        this.$router.push({path:"/home/dataanalysis/fansChart"})
      },0)
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.dataAnalysis
  position: absolute
  top 0
  left 0
  right 0px
  bottom 0
  background #fff
  padding 0 0
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
      left 0px
      width $barHeight
      line-height $barHeight 
      color #fff 
  .main
    width 100%
    .tab
      width 100%
      height 50px
      line-height: 50px;
      display flex
      background #eee
      .item
        flex 1
        text-align center
        font-size 13px
        font-weight 400
        &.router-link-active
          color $mainColor
          border-bottom 4px solid $mainColor      
  .content
    position: absolute
    z-index: 100
    width 100%
    left 0px
    top 40px + $barHeight
    bottom 0
    overflow auto
</style>
