<template>
<transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
  <div class="set">
    <div class="title">
      <router-link to="/home" class="icon-left back" tag="i"></router-link>
      <span>设置中心</span>
    </div>
    <div class="main">
      <div class="info">
        <i class="fa icon-info"></i>&nbsp;&nbsp;个人资料
        <router-link to="/set/person" class="go icon-right" aria-hidden="true"></router-link>
      </div>
      <div class="list">
        <i class="fa icon-userlist"></i>&nbsp;&nbsp;人员管理
        <router-link to="/set/userlist" class="go icon-right" aria-hidden="true"></router-link>
      </div>
      <div class="news">
        <i class="fa icon-shild" aria-hidden="true"></i> &nbsp;&nbsp;安全设置
        <router-link to="/set/shild" class="go icon-right" aria-hidden="true"></router-link>
      </div>
      <div class="online" v-show="!this.passKey">
        <i class="fa icon-paypass" aria-hidden="true"></i> &nbsp;&nbsp;设置支付密码
        <router-link  to="/set/paypass/1" class="go icon-right" aria-hidden="true"></router-link>
      </div>
      <div class="about">
        <i class="fa icon-about" aria-hidden="true"></i> &nbsp;&nbsp;关于我们
        <router-link to="/set/about" class="go icon-right" aria-hidden="true"></router-link>
      </div>
    </div>
    <button class="logOut" @click="logOutBox">
      退出当前帐号
    </button>
      <transition
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <div class="confirmOut" v-show="logOutKey">
          
          <div class="buttonGroup">
            <button class="btn yes_btn" @click="logOut">退出登录</button>
            <button class="btn" @click="cancel">取消</button>
          </div>
        </div>
      </transition>
    <div class="mark" v-show="logOutKey"></div>
    <router-view></router-view>
  </div>
</transition>
</template>

<script>
export default {
  name: 'set',
  data () {
    return {
      logOutKey:false,     
    }
  },
  computed:{
    passKey:function(){
      return this.$store.state.homeinfo.pay_password;
    },

  },

  created:function(){
      this.getData()
  },

  methods:{
    getData(){
      $.ajax({
        url:this.BaseURL+'index/index/',
        method:'post',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          console.log(res)
          if(res.status==-1){
            this.$router.push({path:'/login'})
          }else{
            this.$store.dispatch('getHomeInfo',res)
          }
          
        },
        error: function(xhr, type){
          console.log('Ajax error!')
        }
      })
    },
    logOut:function(){
      /*var that=this;
      that.$router.push({path:"/login"})*/
      $.ajax({
        url:this.BaseURL+'Login/loginout',
        type:'post',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          //清除storage 跳转登录页
            console.log(res)
            if(res.status==1){
              localStorage.removeItem('token');
              this.$router.push({path:"/login"})
              //navigator.app.exitApp()
            }
            
          // }
        },
        error:(res) => {
          console.log('Ajax error!')
        } 
      });
      localStorage.removeItem('token');
    },
    logOutBox() {
      this.logOutKey=true;      
    },
    cancel(){
      this.logOutKey=false;
    }
  },
  mounted:function(){
    this.checkSystem($('.set'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.set
  position: fixed
  top 0
  left 0
  bottom 0
  width 100%
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
        left 0
        width $barHeight
        line-height $barHeight
  .main
    width 100%
    margin-top 10px
    padding  10px 20px
    background #fff
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .info,.list,.news,.online,.about
      position: relative
      width 100%
      height 60px
      line-height 60px
      font-size 16px
      font-weight 400
      border-1px(#eee)
      .icon-info
        color #41c86e
        font-size 20px
        vertical-align -2px
      .icon-userlist
        vertical-align middle
        display inline-block
        width 20px
        height 22px
        background url('./userlist.png') center center no-repeat
        background-size cover
      .icon-shild
        color #efb950
        font-size 20px
        vertical-align -2px 
      .icon-paypass
        color #30a1e3
        font-size 20px
        vertical-align -2px
      .icon-about
        color #eb6a2d
        font-size 20px
        vertical-align -2px
      .go
        position: absolute
        right 0
        text-align right
        line-height 60px
        width 100%
        opacity: 0.5
        &:active
          background rgba(0, 0, 0, .2)
  .logOut
    display block
    width 90%
    height $buttonHeight
    line-height $buttonHeight
    color #fff
    font-size 16px
    font-weight 300
    text-align center
    margin 30px auto
    border none
    border-radius 6px
    background $mainColor
    &:active
      background #942024
  .confirmOut
    position: absolute
    bottom 0
    width 100%
    z-index 10
    height 100px
    text-align center
    font-size 16px
    font-weight 500
    background #fff

    .tit
      margin-top 15px
      // margin-bottom 10px
      padding-bottom 15px
      border-1px(#eee)
    .buttonGroup
      background #eee
      .btn
        display block
        width 100%
        border none
        outline none
        height 50px
        font-size 15px
        background #fff
        &.yes_btn
          color #f00
          border-1px(#eee)
  .mark
    position: absolute
    top 0 
    right 0
    left 0
    bottom 0
    background rgba(0, 0, 0, .3)
</style>
