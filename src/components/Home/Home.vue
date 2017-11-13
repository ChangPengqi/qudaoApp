<template>
<transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
  <div class="home" id="home">
    <div id="homeWrapper">
      <div>
        <div class="head">
          <router-link to="/set" class="set fa icon-set fa-fw"></router-link>
          <div class="info">
            <div class="avatar">
              <img v-if='homeInfo.touxiang' :src="homeInfo.touxiang" width="61" height="61">
              <img v-if='!homeInfo.touxiang' src="./default.png" width="61" height="61">
            </div>
            <div class="text">
              <div class="balance">余额</div>
              <div class="money">{{homeInfo.balance_active ? homeInfo.balance_active:0.00}}</div>
            </div>
          </div>
          <div class="count-wrap">
            <div class="item rebate">
              <span class="count">{{homeInfo.total_rebate ? homeInfo.total_rebate:0.00}}</span><br>
              <span class="text">渠道返利</span>
            </div>
            <span class="line"></span>
            <div class="item cash">
              <span class="count">{{ homeInfo.total_subsidy ? homeInfo.total_subsidy:0.00}}</span><br>
              <span class="text">补贴</span>
            </div>
            <span class="line"></span>
            <div class="item fans">
              <span class="count">{{homeInfo.fencount ? homeInfo.fencount:0}}</span><br>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>
        <div class="main">
            <div class="row row1">
              <router-link to="/home/rebate" class="item" tag="div">
                <span class="icon icon-1"></span>
                <span class="text">收益</span>
              </router-link>
              <router-link to="/home/cash/withdrawal" class="item" tag="div">
                <span class="icon icon-2"></span>
                <span class="text">提现</span>
              </router-link>
              <router-link to="/home/fans" class="item" tag="div">
                <span class="icon icon-3"></span>
                <span class="text">粉丝</span>
              </router-link>

            </div>
            <div class="row row2">
              <router-link to="/home/qrcode" class="item" tag="div">
                <span class="icon icon-1"></span>
                <span class="text">二维码</span>
              </router-link>
              <router-link to="/home/countydealer" class="item" tag="div" v-if='showAreaMana'  >
                <span class="icon icon-2"></span>
                <span class="text">县区管理</span>
              </router-link>
              <router-link to="/home/dataanalysis" class="item" tag="div">
                <span class="icon icon-3"></span>
                <span class="text">数据分析</span>
              </router-link>
              <router-link to="/home/dataanalysis" class="item" tag="div" v-if='!showAreaMana'>
                <span class="icon"></span>
                <span class="text"></span>
              </router-link>
            </div>
        </div>
        <div class="news">
          <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          >
            <chart></chart>
          </transition>
        </div>
        <div class="bottom"> 
            
        </div>
      </div>
      <div class="dialog-wrap" v-show="dialog">
          <div class="mark"></div>
          <div class="dialog">
            <div class="dtitle">确定退出吗？</div>
            <div class="btnGrounp">
              <button class="no" @click='removeNo'>取消</button>
              <button class="yes" @click='exitApp'>确定</button>
            </div>
          </div>
      </div> 
    </div>
    <w-footer></w-footer>
  </div>

   
</transition>
</template>

<script>
// import axios from "axios"
import BScroll from 'better-scroll'
// import store from 'store2'
import Chart from '../Chart/Chart'
import Footer from '../Footer/Footer'
export default {
  name:'home',
  components:{
    'w-footer':Footer,
    Chart
  },
  data(){
    return {
      dialog:false,
      spinshow:true  
    }
  },
  filters:{   
  },
  created:function(){
    //登录成功进入home初始化数据
    /*this.initialize();*/
    console.log(location.hash)
    this.getQualification(localStorage.getItem('token'))
    this.getPersonData(localStorage.getItem('token'))
    this.getData(localStorage.getItem('token'));
    document.addEventListener('deviceready',this.onDeviceReady, false);
     
  },
  methods:{
    onDeviceReady(){
      document.addEventListener("backbutton",this.onBackKeyDown, false);
    },
    onBackKeyDown(e){
        e.preventDefault();
        if(document.getElementById('homeWrapper')){
            if(this.dialog){
              document.getElementById('homeWrapper').style.zIndex=10
              this.dialog=false
            }else{
              document.getElementById('homeWrapper').style.zIndex=100
              this.dialog=true
            }
        }else if(document.getElementById('login')){
          navigator.app.exitApp()
        }else if(document.getElementById('inforStatus')){
           navigator.app.exitApp()
        }else if(document.getElementById('information')){
           navigator.app.exitApp()
        }else{
          this.$router.go(-1)
        }   
      },
    getData(token){
      
      $.ajax({
        url:this.BaseURL+'index/index/',
        method:'post',
        data:{
          token:token
        },
        success:(res) => {
          console.log(res)
          if(res.status==-1){
             this.$router.push({path:'/login'}) 
          }else{
            this.$store.dispatch('getHomeInfo',res)
          }
          
          /*this.spinshow=false*/
        },
        error: function(xhr, type){
          console.log('Ajax error!')
        }
      })
    },
    getPersonData(token){
      $.ajax({
        url:this.BaseURL+'Personal/index',
        type:'get',
        data:{
          token:token
        },
        success:(res) => {
          console.log(res);
          this.$store.dispatch('getMyInfo',res);
        },
        error:(res) => {
          console.log('Ajax error!')
        } 
      })
    },
    getQualification(token){
      $.ajax({
        url:this.BaseURL+'/Qualification/qualificationInfo',
        type:'get',
        data:{
          token:token
        },
        success:(res) => {
          console.log(res);
          this.$store.dispatch('getQualification',res);
        },
        error:(res) => {
          console.log(res)
        } 
      })
    },
    
    removeNo(){
      var _this=this
      setTimeout(function(){
        document.getElementById('homeWrapper').style.zIndex=10
        _this.dialog=false
      },50)
      
    },
    exitApp(){
      navigator.app.exitApp()  
    },
  },
 
  mounted:function(){
    let homescroll = new BScroll(document.getElementById('homeWrapper'), {
      click:true,
      bounceTime:300,
      swipeBounceTime: 800
    });
    this.checkSystem($('#homeWrapper'))
  },
  computed:{
    qualification:function(){
      return this.$store.state.qualification;
    },
    showAreaMana:function(){
      if(this.homeInfo.proxy_level==1){
        return true
      }else{
        return false
      }
    },
    avatar:function(){
      return this.$store.state.myinfo.touxiang;
    },
    homeInfo:function(){
      return this.$store.state.homeinfo;
    },
    
  } 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.home
  position: fixed
  top 0
  left 0
  bottom 60px
  width 100%
  background #eee
  height 100%
  .dialog-wrap
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    .mark
      position:absolute;
      width: 100%
      top 0
      bottom 0
      background rgba(0, 0, 0, .4)
    .dialog
      position: absolute
      width 80%
      height 110px
      top: 40%;
      margin-left 10%
      border-radius 4px
      background #fff
      overflow hidden
      .dtitle
        width 100%
        height 60px
        font-size 18px
        font-weight 400
        line-height 60px
        background #fff
        color #333
        text-align center
        border-bottom 1px solid #eee
      .btnGrounp
        display flex
        button
          flex 1
          height 50px
          border none
          font-size 15px
          background #fff
          &:first-child
            border-right 1px solid #eee
          &:active
            background #c81623
            color #fff
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
  .title
      position: fixed
      top 0
      z-index: 10
      width 100%
      height 45px
      line-height: 45px
      background #393a3f
      font-size 16px
      color #fff
      text-align center
      .set
        position: absolute
        line-height: 65px;
        right 0px
        width 50px
        font-size 30px
        color #fff
  #homeWrapper
    height 100%
    position: fixed
    // top 45px
    top 0
    width 100%
    bottom 50px
    overflow hidden
    .head
      position: relative
      .set
        position: absolute
        line-height: 65px;
        right 0px
        width 65px
        color #fff
        text-align center
        font-size 26px
      .info
        width 100%
        height 100px
        background $mainColor
        font-size 0
        .avatar
          display inline-block
          vertical-align top
          width 61px
          height 61px 
          border-radius 50%
          margin 20px 0 0 15px
          overflow hidden
        .text
          display inline-block
          margin 30px 12px
          font-size 42px
          color #fff
          font-weight 200
          .balance
            font-size 13px
          .money
            margin-top 10px
      .count-wrap
        display flex
        width 100%
        height 54px
        background $mainColor
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .line
          display inline-block
          width:1px
          height 24px;
          margin-top:15px 
          background #f05c62
        .item
          flex 1
          text-align center
          padding 10px 0
          color #fff
          font-weight 300
          .count
            font-size 18px
          .text
            font-size 13px
            line-height 2
    .main
        width 100%
        height 190px
        padding-top 22px
        border-1px #eee
        background #fff
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .row
          display flex
          height 85px
          .item
            flex 1
            text-align center
            font-size 14px
            .icon
              display inline-block
              width 45px
              height 45px
            .text
              display block
              margin-top 5px
              font-size 13px
              color: rgb(102, 102, 102)
              font-weight 500
        .row1
          .icon-1
            background-image url('./col1-1.png')
            background-size  45px 45px 
            background-repeat no-repeat
          .icon-2
            background-image url('./col1-2.png')
            background-size  45px 45px 
            background-repeat no-repeat
          .icon-3
            background-image url('./col1-3.png')
            background-size  45px 45px 
            background-repeat no-repeat        
        .row2
          .icon-1
            background-image url('./col2-1.png')
            background-size  45px 45px 
            background-repeat no-repeat
          .icon-2
            background-image url('./col2-2.png')
            background-size  45px 45px 
            background-repeat no-repeat
          .icon-3
            background-image url('./col2-3.png')
            background-size  45px 45px 
            background-repeat no-repeat
    .bottom
      width 100%
      height 60px

</style>
