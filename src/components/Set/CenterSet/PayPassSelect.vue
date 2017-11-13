<template>
  <div class="paypassselect">
    <div class="title">
      <router-link to="/set/shild" class="fa icon-left back" tag="i" ></router-link> 
      <!-- <span class="fa icon-left back" @click='back()'></span> -->
      修改支付密码
    </div>
    <div class="main">
      <div class="head">您正在为{{this.myInfo.tel | replace}}重置支付密码</div>
      <div class="rem" @click="openrem">
        我记得原支付密码<i class="go fa icon-right" aria-hidden="true"></i>
      </div>
      <div class="for" @click="openFor">
        我忘记原支付密码<i class="go fa icon-right" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'paypassselect',
  data () {
    return {
      email:'',
      msgKey:false,
     
    }
  },
  filters:{
    replace(str){
      return str.substr(0,3)+'*****'+str.substr(8,str.legnth)

    }
  },
  computed:{
     myInfo:function(){
      return this.$store.state.myinfo;
    },
   
  },
  created:function(){
   
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
   openrem () {
     this.$router.push({path:'/set/shild/paypassreset'})
   },
   openFor() {
    this.$router.push({path:'/set/shild/paypassfor/1'})
   }
  },
   mounted:function(){
    this.checkSystem($('.paypassselect'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.paypassselect
  position: absolute
  top 0
  left 0
  right 0px
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
    font-weight: 400
    .back
      position: absolute
      left 0px
      width $barHeight
      line-height: $barHeight;
  .main
    width 100%
    div
      height 60px
      line-height 60px
      text-indent 20px
      font-size 13px
      font-weight 500
      &.rem
        position relative
        background #fff
        border-1px(#eee)
        &:active 
          background rgba(0, 0, 0, .2)
        .go 
          position: absolute
          right 20px
          line-height 60px
          opacity 0.7
      &.for
        position relative
        background #fff
        border-1px(#eee)
        &:active 
          background rgba(0, 0, 0, .2)
        .go 
          position: absolute
          right 20px
          line-height 60px
          opacity 0.7
</style>
