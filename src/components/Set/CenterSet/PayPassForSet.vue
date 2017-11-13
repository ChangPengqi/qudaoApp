<template>
  <div class="paypassforset">
    <div class="title">
    <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a>
      <!-- <router-link to="/set/shild/paypassfor" class="fa icon-left back" tag="i"></router-link> -->
      设置支付密码
    </div>
    <form name="pay" class="payform">
      <!-- <p class="list"><input class="ipt" type="text" name="" placeholder="输入原支付密码"></p> -->
      <p class="list"><el-input class="ipt" type="password" name="" :maxlength="maxlength" placeholder="输入新支付密码，6位数字" v-model='firstPass' @change='checkNum'></el-input></p>
      <el-alert v-show='msgKey2' :title="msg" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%' ></el-alert>
      <p class="list"><el-input class="ipt" type="password" name="" :maxlength="maxlength" placeholder="再输一次" v-model='secondPass'></el-input></p>
    </form>
    <div class="msg" v-if="msgKey"><el-alert :title="msg" :type="showType" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert></div>
    <button class="btn" @click="passSet" :disabled='disabled'>确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
  </div>
</template>

<script>


export default {
  name: 'paypassforset',
  data () {
    return {
      firstPass:'',
      secondPass:'',
      msg:'',
      msgKey:false,
      showType:'error',
      closeIcon:false,
      msgKey2:false,
      maxlength:6,
      disabled:false
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    checkNum(){
      
      var reg=/^[0-9]\d*$/;
        if(this.firstPass.length!=0 && !reg.test(this.firstPass)){
          this.msgKey2=true
          this.msg='请输入数字'
          this.disabled=true
        }else{
          this.msgKey2=false
          this.msg=''
          this.disabled=false
        }
    },
    passSet() {
      if(this.firstPass.length ==0 || this.secondPass.length==0){
        this.msg="请输入密码！";
        this.msgKey=true;
      }else if(this.firstPass !== this.secondPass){
        this.msg="两次密码不一样，请重新输入!";
        this.msgKey=true;
      }else{
        //向后台提交数据
        $.ajax({
          url:this.BaseURL+'Personal/editPayPwd',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            password:this.secondPass
          },
          success:(res) => {
            var _this=this;
            console.log(res.status);
              this.msgKey=true;
              this.showType='success'
              this.msg=res.info
              setTimeout(()=>{
                _this.$router.push({path:'/set/shild'})
              },1000)
            
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        });
      }
      // 2s后信息消失
      setTimeout(() => {
        this.msgKey=false;
        this.firstPass='';
        this.secondPass=''
      },2000)
    }
  },
  mounted:function(){
    this.checkSystem($('.paypassforset'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.paypassforset
  position: absolute
  top 0
  left 0
  right 0
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
      left 0px
      color #fff
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
        height 26px
        font-size 16px
        font-weight 500
        text-indent 20px
        border none 
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
