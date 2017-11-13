<template>
  <div class="footer">
      <!-- <router-view></router-view> -->
      <div class="item home">
        <router-link to="/home">
          <i class="fa icon-home"></i><br>
          <span class="text">首页</span>
        </router-link>
      </div>
      <div class="item msgs">
        <router-link to="/msgs">
          <i class="fa icon-msg"></i><br>
          <span class="text">消息</span>
        </router-link>
      </div>
      <div class="item my">
        <router-link to="/my">
          <i class="fa icon-my"></i><br>
          <span class="text">我的</span>
        </router-link>
      </div>
  </div>
</template>
<script>

export default {
	name:'footer',
    data() {
      return {

      }
    },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.footer
  display flex
  position: fixed
  z-index 99
  width 100%
  height 60px
  left 0px
  bottom 0px
  border-top 1px solid #e0e0e0
  padding-top 8px
  background #fff
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  .item
    flex 1
    text-align center
    a
      display inline-block
      width 100%
      height 100%
      &.router-link-active
        color:$mainColor
      .fa
        font-size 1.8em
      .text
        font-size 13px
        font-weight 400
        line-height 1.6
</style>
