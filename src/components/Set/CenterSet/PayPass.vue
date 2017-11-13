<template>
  <div class="paypass">
    <div class="title">
      <router-link to="/set" class="fa icon-left back" tag="i"></router-link>
      设置支付密码
    </div>
    <div class="main">
      <form >
        <input class="paypassword" type="password" maxlength="6" name="password" placeholder="设置6位支付密码" v-model="password" @keyup='checkNum'>
      </form>
      <div class="tips">
        *在就趣购平台上支付时需要输入的密码
      </div>
    </div>
    <div :class="{msg:isActive1,msg2:isActive2}" v-show="msgKey"><el-alert :title="msg" :type="showType" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert></div>
    <div class="btn">
      <button class="submit" @click="passSet" :disabled="disabled">提交</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'paypass',
  data () {
    return {
      password:'',
      msg:'',
      msgKey2:false,
      msgKey:false,
      isActive1:true,
      isActive2:false,
      closeIcon:false,
      showType:'success',
      disabled:false

    }
  },
  created:function(){
    

  },
  mounted:function(){
   
  },
  methods:{
    checkNum(){
      var reg=/^[0-9]\d*$/;
        if(this.password.length!=0 && !reg.test(this.password)){
          this.msgKey=true
          this.showType='error'
          this.msg='请输入数字'
          this.disabled=true
        }else{
          this.msgKey=false
          this.msg=''
          this.showType='success'
          this.disabled=false
        }
    },
    passSet() {
      if(this.password.length==0){
        this.msgKey=true;
        this.msg="密码不能为空！";
      }else if(this.password.length!=6){
        this.msgKey=true;
        this.msg="支付密码必须是6位！";
      }else{
        $.ajax({
          url:this.BaseURL+'Personal/setPaypwd',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            pay_password:this.password
          },
          success:(res) => {
            console.log(res.status);
            var len=location.hash.length
            var query=location.hash.substring(len-1,len)
            if(res.status==1){
              this.msgKey=true;
              this.isActive1=false;
              this.isActive2=true;
              this.msg="密码设置成功！";
              setTimeout(() => {
                  this.msgKey=false;
                  this.isActive1=true;
                  this.isActive2=false;
                  this.password='';
                  if(query==1){
                    this.$router.push({path:'/set'})
                  }else if(query==2){
                    this.$router.push({path:'/home/cash/withdrawal'})
                  }
                  
                },1000)

             
            }else{
              this.msgKey=true;
              this.msg="密码设置失败！"
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        });
      }      
      setTimeout(() => {
        this.msgKey=false;
        this.password=''
      },2000)
    }
  },
  mounted:function(){
    this.checkSystem($('.paypass'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.paypass
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
    .paypassword
      width 100%
      height 40px
      line-height 40px
      border none
      margin-top 10px
      padding 10px 20px
      font-size 16px
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    .tips
      width 90%
      margin 10px auto
      font-size 12px
      font-weight 500
      color $mainColor
  .msg
    width 90%
    margin 0 auto
    color #c81623
    font-size 14px
    font-weight 500
    text-align center
    margin-top 20px
  .msg2
    width 90%
    margin 0 auto
    color #259b24
    font-size 14px
    font-weight 500
    text-align center
    margin-top 20px
  .btn
    width 90%
    margin 20px auto
    .submit
      width 100%
      height $buttonHeight
      border none
      border-radius 6px
      line-height $buttonHeight
      border none
      color #fff
      font-size 16px
      background $mainColor
      &:active
        background #942024
</style>
