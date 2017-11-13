<template>
  <div class="paypassreset">
    <div class="title">
      <router-link to="/set/shild/paypassselect" class="fa icon-left back" tag="i"></router-link>
      修改支付密码
    </div>
    <form name="pay" class="payform">
      <p class="list"><el-input class="ipt" type="password" name="" :maxlength="maxlength" placeholder="输入原6位支付密码" v-model="oriPass"  @change='checkNum1'></el-input></p>

      <el-alert v-show='msgKey1' :title="msg1" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert>

      <p class="list"><el-input class="ipt" type="password" name="" :maxlength="maxlength" placeholder="输入新的6位支付密码" v-model='newPass'  @change='checkNum2'></el-input></p>

      <el-alert v-show='msgKey2' :title="msg2" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert>

      <p class="list"><el-input class="ipt" type="password" name="" :maxlength="maxlength" placeholder="再次输入新的6位支付密码" v-model="againPass"  @change='checkNum3'></el-input></p>

      <el-alert v-show='msgKey3' :title="msg3" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert>
    </form>
    <div class="msg" v-if="msgKey"><el-alert :title="msg" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert></div>
    <button class="btn" @click="passSet" :disabled="disabled">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
    <div class="model" v-show="success">
      密码修改成功！
    </div>
    <div class="mode2" v-show="error">
      密码修改失败!
    </div>
  </div>
</template>

<script>


export default {
  name: 'paypassreset',
  data () {
    return {
      oriPass:'',//原支付密码
      newPass:'',//新支付密码
      againPass:'', //再次输入新支付密码
      msg:'',//提示信息
      msgKey:false,
      mag1:'',
      mag2:'',
      mag3:'',
      success:false,
      error:false,
      closeIcon:false,
      disabled:false,
      msgKey1:false,
      maxlength:6
    }
  },
  methods:{
    checkNum1(){
      var reg=/^[0-9]\d*$/;
        if(this.oriPass.length!=0 && !reg.test(this.oriPass)){
          console.log(this.oriPass)
          this.msgKey1=true
          this.msg1='请输入数字'
          this.disabled=true
        }else{
          this.msgKey1=false
          this.msg1=''
          this.disabled=false
        }
    },
    checkNum2(){
      var reg=/^[0-9]\d*$/;
      if(this.newPass.length!=0 && !reg.test(this.newPass)){
          console.log(this.newPass)
          this.msgKey2=true
          this.msg2='请输入数字'
           this.disabled=true
        }else{
          this.msgKey2=false
          this.msg2=''
          this.disabled=false
        }
    },
    checkNum3(){
      var reg=/^[0-9]\d*$/;
      if(this.againPass.length!=0 && !reg.test(this.againPass)){
          console.log(this.againPass)
          this.msgKey3=true
          this.msg3='请输入数字'
           this.disabled=true
        }else{
          this.msgKey3=false
          this.msg3=''
          this.disabled=false
        }
    },
    passSet() {
      if(this.oriPass.length!=6){
        this.msg="请输入原6位支付密码！";
        this.msgKey=true;
        this.oriPass='';
      }
      else if(this.newPass.length!=6){
        this.msg="新的支付密码必须是6位！";
        this.msgKey=true;
        this.newPass='';
      }else if(this.againPass.length==0){
        this.msg="请再次输入新密码";
        this.msgKey=true;
       
      }
      else if(this.newPass!== this.againPass){
        this.msg="两次密码不一样，请重新输入!"
        this.msgKey=true;
        this.newPass='';
        this.againPass='';
      }else if(this.oriPass===this.newPass){
        this.msg="新密码与原密码不能一样，请重新输入!"
        this.msgKey=true;
        this.newPass='';
        this.againPass='';

      }else{
        //向服务器提交数据
         $.ajax({
          url:this.BaseURL+'personal/PayPwd_remember',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            oldpassword:this.oriPass,
            newpassword:this.againPass
          },
          success:(res) => {
            console.log(res.status);
            if(res.status==1){
              this.success=true;
              this.disabled=true;
              setTimeout(()=>{
                this.$router.push({path:'/set/shild'})
                this.disabled=false;
              },2000)
              
            }else{
               this.error=true;
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        });
      }
      // 2s后信息消失
      setTimeout(() => {
        this.msgKey=false;
        this.success=false;
        this.error=false;
      },2000)
    }
  },

  mounted:function(){
    this.checkSystem($('.paypassreset'))
  }
}
</script>
<style>
  .ipt input{ border:0; padding-left: 20px }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.paypassreset
  position: absolute
  top 0
  left 0
  right 0px
  bottom 0
  background #eee
  .model
    position: relative
    margin 0 auto
    width 200px
    border-radius 6px
    height 60px
    line-height 60px
    background rgba(9,187,7,1)
    text-align center
    color #fff
  .mode2
    position: relative
    margin 0 auto
    width 200px
    border-radius 6px
    height 60px
    line-height 60px
    background rgba(0, 0, 0, .6)
    text-align center
    color #fff
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
        font-size 16px
        font-weight 500
        border 0 
        outline none
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
