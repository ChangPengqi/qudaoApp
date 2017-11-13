<template>
  <div class="shild">
    <div class="title">
      <router-link to="/set" class="fa icon-left back" tag="i"></router-link>
      安全中心
    </div>
    <div class="main">
      <div class="item loginPass" @click="goLoginPass">
        <div class="text"><i class="fa icon-loginpass" aria-hidden="true"></i> &nbsp;&nbsp;修改登录密码</div>
        <div class="go"><i class="go fa icon-right" aria-hidden="true"></i></div>   
      </div>
      <div class="item payPass" @click="goPayPassReset">
        <div class="text"><i class="fa icon-paypass" aria-hidden="true"></i> &nbsp;&nbsp;修改支付密码</div>
        <div class="go"><i class="go fa icon-right" aria-hidden="true"></i></div>
      </div>
     <!--  <div class="item shildMail">
       <div class="text"><i class="fa icon-email" aria-hidden="true"></i> &nbsp;&nbsp;安全邮箱</div>
       <div class="go"><i class="go fa icon-right" aria-hidden="true"></i></div>
     </div> -->
      <div class="item myCard" @click="openMyCard">
        <div class="text"><i class="fa icon-mycard" aria-hidden="true"></i> &nbsp;&nbsp;我的银行卡</div>
        <div class="go"><i class="go fa icon-right" aria-hidden="true"></i></div>
      </div>
    </div>    
  </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
  name: 'shild',
  data () {
    return {
      
    }
  }, 
  computed:{
    passKey:function(){
      return this.$store.state.homeinfo.pay_password;
    },

  },
  methods:{
    goLoginPass() {
      this.$router.push({path:'/set/shild/loginpass'})
    },
    goPayPassReset() {
      if(this.passKey){
        this.$router.push({path:'/set/shild/paypassselect'})
      }else{
        this.$router.push({path:'/set/paypass/1'})
      }
      
    },
    openMyCard() {
      this.$router.push({path:'/home/cash/mycard/1'})
    }
  },
   mounted:function(){
    this.checkSystem($('.shild'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.shild
  position: fixed
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
    margin-top 5px
    background #fff
    .item
      display flex
      position: relative
      width 100%
      height 60px
      line-height 60px
      padding-left 15px
      border-1px(#eee)
      font-size 15px
      font-weight 400
      &:active
        background rgba(0, 0, 0, .2)
      &.loginPass
        .fa
          color #41c86e
          font-size 20px
          vertical-align -2px
      &.payPass
        .fa
          color #efb950 
          font-size 20px
          vertical-align -2px
      &.shildMail
        .fa
          color #30a1e3
          font-size 20px
          vertical-align -2px
      &.myCard
        .fa
          color #eb6a2d
          font-size 20px
          vertical-align -2px
      .text
        flex 2
      .go
        flex 1
        text-align right
        margin-right 15px
        align-items center
        opacity 0.7
        .fa
          color #000    
         
</style>
