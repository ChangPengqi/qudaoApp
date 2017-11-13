<template>
  <div class="loginpass">
    <div class="title">
      <router-link to="/set/shild" class="fa icon-left back" tag="i"></router-link>
      修改登录密码
    </div>
    <form name="pay" class="payform">
      <p class="list"><input class="ipt" type="password" minlength="6" maxlength="16" name="" placeholder="输入原登录密码" v-model="oldPass"></p>
      <p class="list"><input class="ipt" type="password" name="" placeholder="输入新登录密码，6-16位数字字母字符" minlength="6" maxlength="16" v-model="firstPass"></p>
      <div class="msg" v-show="msgKey2"><el-alert :title="msg" type="error" :closable='closeIcon' show-icon style='width:80%;margin:0 10%'></el-alert></div>
      <p class="list"><input class="ipt" type="password" name="" minlength="6" maxlength="16" placeholder="再输一次" v-model="secondPass"></p>
    </form>
    <div class="msg" v-show="msgKey"><el-alert :title="msg" :type="showType" :closable='closeIcon' show-icon style='width:80%;margin:0 10%'></el-alert></div>
    <button class="btn" @click="passSet" :disabled="disabled">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
  </div>
</template>

<script>


export default {
  name: 'loginpass',
  data () {
    return {
      oldPass:'',
      firstPass:'',
      secondPass:'',
      msg:'',
      msgKey:false,
      msgKey2:false,
      showType:'error',
      closeIcon:false,
      disabled:false
    }
  },
  methods:{
    passSet(){
      if(this.firstPass.length<6 || this.firstPass.length>16){
              this.msg="登录密码为6-16位!"
              this.msgKey2=true;
              setTimeout(() => {
                this.msgKey2=false;
              },2000)
      }
      else if(this.firstPass!= this.secondPass){
              this.msg="两次密码不一样，请重新输入!"
              this.msgKey=true;  
              setTimeout(() => {
                this.msgKey=false;
              },2000)   
       /* this.oldPass='';
        this.firstPass='';
        this.secondPass='';*/
      }else{
        
            var that=this;
            this.postData(this.oldPass,this.secondPass,(status) =>{
              that.msgKey=true;
              if(status==1){
                that.msg="密码修改成功！"
                that.showType='success'
                this.disabled=true
                setTimeout(() => {
                  this.msgKey=false;
                  this.disabled=false
                  that.$router.push({path:'/set/shild'})
                },2000)
              }else{
                that.msg="原始密码不正确！"
                setTimeout(() => {
                  this.msgKey=false;
                },2000)
              }  
            });
            
          

        //向服务器提交数据
        
      }
      // 2s后信息消失
      
    },
    postData(oldpassword,newpassword,callback){
       $.ajax({
        url:this.BaseURL+'Personal/loginPwd',
        type:'post',
        data:{
          token:localStorage.getItem('token'),
          oldpassword:oldpassword,
          newpassword:newpassword
        },
        success:(res) => {
          // console.log(res.status);
          // this.msg="chengong"
          callback(res.status);
        },
        error:(res) => {
          console.log('Ajax error!')
        } 
      })
    }
  },
  mounted:function(){
    this.checkSystem($('.loginpass'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.loginpass
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
  .payform
    width 100%
    margin 10px auto
    background #fff
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box; 
    .list
      width 100%
      height 60px
      line-height 60px
      border-1px(#eee)
      .ipt
        width 100%
        font-size 15px
        font-weight 500
        text-indent 20px
        border none 
        outline none
        height 28px
        padding 16px 0
  .msg
    width 90%
    margin 0 auto
    color #f00
    font-size 14px
    font-weight 500
  .btn
    display block
    width 90%
    margin 40px auto
    height $buttonHeight
    border none
    border-radius 4px 
    color #fff
    font-size 16px
    background $mainColor 
    &:active
      background #942024
</style>
