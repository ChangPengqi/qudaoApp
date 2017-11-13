<template>
  <div class="loginWrap">
    <!-- <img src="./bg.jpg" width="100%" height="100%" class="bg"> -->
    <div class="login" id="login">
      <div class="logo">
        <img src="./logo.png" width="102" height="102">
      </div>
      <div class="text">
        <img src="./text1.png" height="30"><img src="./text2.png" height="30">
      </div>
      <form class="loginForm">
        <div class="item">
          <label class="list"><img class="icon" src="./user.png" height="28">


          <el-input class="ipt" type="text" placeholder="请输入账号" v-model="user" required></el-input>
          <!-- <input class="ipt" type="text" placeholder="请输入账号" v-model="user" required> -->

          </label>
        </div>
        <div class="item">
          <label class="list"><img class="icon" src="./pass.png" height="28">
            <el-input class="ipt" type="password" placeholder="请输入密码" v-model="pass" required></el-input>
          </label>
        </div>
        <div class="msg" v-show="msgKey">
          {{msg}}
        </div>
      </form>
      <button class="btn" @click.prevent="conFirmlogin">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
      <!-- <div class="setPass">找回密码</div> -->
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'loginWrap',
  data() {
    return {
      user:'',
      pass:'',
      msg:'',
      msgKey:false
    }
  },
  created:function(){
    //document.addEventListener("backbutton",this.onBackKeyDown, false); 
    //document.addEventListener('deviceready',this.onDeviceReady, false);
    
  },
  methods:{
   /* onDeviceReady(){
      document.addEventListener("backbutton",this.onBackKeyDown, false);
    },
    onBackKeyDown(){
        e.preventDefault();
        if(document.getElementById('login')){
            navigator.app.exitApp() 
        }  
    },*/
    conFirmlogin(){
       this.login()
    },
    login() {
      if(this.user.length!=0 && this.pass.length!=0){
        //帐号密码不为空
          $.ajax({
            url:this.BaseURL+'Login/index',
            type:'post',
            data:{
              channel_account:this.user,
              channel_password:this.pass
            },
            success: (res) => {
              if(res.status===1){
                console.log(res.token)
                localStorage.setItem('token',res.token);
                //登录成功，0.5s跳转首页
                this.$store.dispatch('getLoginInfo',{
              channel_account:this.user,
              channel_password:this.pass
            })
                var that=this;
                setTimeout(() => {                
                  $.ajax({
                    url: that.BaseURL+'/Qualification/qualificationStatus',
                    type: 'post',
                    dataType: 'json',
                    data: {token: localStorage.getItem('token')},
                    success:function(res){
                     // if(res.qualificationstatus==2){
                        that.$router.push({path:'/home'})
                      // }else if(res.qualificationstatus==5){
                      //   that.$router.push({path:'/Information'})
                      // }else{
                      //   that.$router.push({path:'/Information/inforStatus'})
                      // }
                    },
                    
                  })    
                  /*this.$router.push({path:'/Information'});*/
                },500)
              }else if(res.status===-2){
                this.msg=res.info
                this.msgKey=true;
              }
              // console.log(res)
            },
            error:(xhr, type) => {
              this.msg="网络请求错误！";
              this.msgKey=true;              
              console.log('Ajax error!')
            }
          })
      }else{
        this.msg="帐号密码错误，请重新输入！";
        this.msgKey=true
      }
      //2秒后提示消失
      setTimeout(() => {
        this.msgKey=false;
        this.user='';
        this.pass='';
      },1500)
      //this.$router.push({path:'/home'});  //屏蔽登录
    },

  },
  mounted:function(){
   
  }
}


</script>
<style> 
.el-input  input{
  border:0;
  background: none
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.loginWrap
  position:fixed;
  z-index: 11
  left 0
  top 0
  bottom 0
  right 0
  background url('./bg.jpg')
  background-size cover
  .el-input
    input
      border 0
      background none
  .login
    position: absolute
    left 0
    top -50px
    bottom 0
    right 0
    text-align center
    // overflow auto
    // -webkit-overflow-scrolling:touch
    .logo
      display inline-block
      width 102px
      height 102px
      border-radius 50%
      overflow hidden 
      margin 74px auto 0
    .text
      margin-top 40px
      img:first-child
        margin-right 35px
  	.loginForm
      width 100%
      margin-top 40px
      .item
       height 45px
       line-height 45px
       margin-bottom 19px
       .list
         display block
         width 290px
         margin 0 auto
         height 45px
         line-height 45px
         background rgba(255, 255, 255, .5) 
         border-radius 22px 
         .icon
           vertical-align -17px
           margin-left 10px 
           margin-bottom 10px    
         .ipt 
           // vertical-align middle
           height 45px
           line-height 45px
           width 220px
           border 0
           text-indent 15px
           font-size 16px
           font-weight 500
           outline none   
           background none           
          ::-webkit-input-placeholder  
            color: rgba(255, 255, 255,.9);   
      .msg
        margin 20px 0 0 30px
        color #fff
        height 20px
        font-size 15px
        font-weight bolder
        text-align left
    .btn
      width 290px
      margin-top 40px
      margin-bottom 100px
      border none
      border-radius 23px
      height 45px
      color #fff
      font-size 18px
      font-weight 500
      outline none
      background #e0444f
      box-shadow 0px 1px 1px #942024
      &:active
        background #942024
    .setPass
      text-align right
      margin-right 30px
      margin-top 15px
      color #fff
      // margin-bottom 200px
</style>
