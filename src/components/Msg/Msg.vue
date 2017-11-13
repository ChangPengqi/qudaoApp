<template>
<transition
  name="custom-classes-transition"
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
  mode="out-in"
>
  <div class="msg" v-show="msgKey">
    <div class="mark"></div>
    <div class="cont">{{cont}}</div>
  </div>
</transition>
</template>
<script>
export default{
  name:'msg',
  data () {
    return {
      
    }
  },
  props: ['msgKey','message'],
  computed:{
    cont (){
      return this.message||'成功';
    },
  },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.msg
  position: fixed
  z-index 19910102
  top 0
  bottom 0
  left 0
  right 0
  .mark
    position: absolute
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0, 0, 0, .6)
  .cont
    width 100px
    height 60px
    position: absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto auto
    text-align center
    line-height 60px
    border-radius 6px
    background #fff
    color #333
    font-size 15px
    font-weight 500
</style>
