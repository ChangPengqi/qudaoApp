<template>
<transition 
        leave-active-class="animated fadeOut"      
      >
  <div class="withdrawal">
    <div class="title">
      <router-link to="/home" class="fa icon-left back"></router-link tag="i"> 
      <!-- <span class="fa icon-left back" @click='goback()'></span> -->
      <span>提现</span>
      <router-link class="detail" to="/home/cashdetail">明细</router-link>
    </div>
    <div class="main">
      <div class="head" >
        <div class="item avatar">

          <img v-if='avatar' :src="avatar"  width="30" height="30">
          <img v-if='!avatar' src="./avatar.png"  width="30" height="30">
        </div>
        <div class="item bankName">{{qualification.qualification.bank_name}}</div>
        <div class="item cardId">尾号{{qualification.qualification.card_num | subCard}}</div>
        
        <router-link to="/home/cash/mycard/2" class="item more">
          <span v-if='qualification.status!=1'><abbr style='color:#c81623; padding-right:10px'>添加银行卡</abbr><i  class="fa icon-right back" ></i></span>
          <span v-if='qualification.status==1'><i  class="fa icon-right back" ></i></span>
         
        </router-link>
      </div>
      <div class="form">
        <div class="text">
          提现金额
        </div>
        <div class="num">
          ￥<input id="money" type="text" name="num" v-model="num"  placeholder="">
        </div>       
      </div>
      <div class="msg" v-if="msgKey">
        <el-alert style='width:80%;margin:10px 10%' :title="message" type="error" show-icon :closable='closeIcon'></el-alert>
      </div>
    </div>
    <button class="btn" @click="submitCash">提交</button>
    <div class="mark" v-show="passKey" @click="closePass"></div>
    <div class="pssword animated slideInUp " v-show="passKey" >
      <div class="title">
        <i class="fa icon-left back" @click="closePass" style='color:#000'></i>请输入密码
      </div>
      <div class="inputpass">
        <input type="password" name="pass" maxlength="6" v-model="pwd">
      </div>
      <div class="msg" v-if='msgError'>
        <el-alert style='width:80%;margin:10px 10%' :title="errorMsg" :type="showType" show-icon :closable='closeIcon'></el-alert>
      </div>
      <div class="setPass">
        <router-link to="/set/shild/paypassfor/2">忘记密码</router-link>
      </div>
      <div class="button">
        <button class="btn" @click="confirmpass">确定</button>
      </div>
    </div>
    <div class="dialog-wrap" v-show="dialog">
        <div class="mark"></div>
        <div class="dialog">
          <div class="dtitle">您还没有设置支付密码</div>
          <div class="btnGrounp">
            <button class="no" @click='removeNo()'>取消</button>
            <button class="yes" @click='setPaypass()'>去设置</button>
          </div>  
        </div>
    </div> 
     <div class="dialog-wrap" v-show="dialog2">
        <div class="mark"></div>
        <div class="dialog">
          <div class="dtitle">{{erroInfo}}</div>
          <div class="btnGrounp">
            <button class="no" @click='unensure()'>取消</button>
            <button class="yes" @click='ensure()'>{{operateInfo}}</button>
          </div>
        </div>
    </div>
  </div>
</transition>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'withdrawal',
    components:{
      
    },
    data() {
      return {
        num:'',
        pwd:'',
        passKey:false,
        msgKey:false,
        msgError:false,
        message:'',
        errorMsg:'',
        dialog:false,
        dialog2:false,
        erroInfo:'',
        operateInfo:'',
        closeIcon:false,
        showType:'error'
      }
    },
    filters:{
      subCard(value){
        if(value){
          var len=value.length-4
          return value.substring(len)
        }else{
          return value
        }    
        
      }
    },
    computed:{
      cardInfoList:function(){
          return this.$store.state.cardInfo;            
      },
      qualification:function(){
      return this.$store.state.qualification;
      },
      avatar:function(){
          return this.$store.state.cardInfo.logo
      },
      paypassinfo:function(){
      return this.$store.state.homeinfo.pay_password;
      },
      homeInfo:function(){
      return this.$store.state.homeinfo;
      },
     
     
    },
    mounted:function(){
      this.checkSystem($('.withdrawal')) 
    },
    created:function(){ 
      this.getBankInfo();
      this.getBankData();
      this.getHomeData();  
      $(document.getElementById('money')).focus()
    },

    methods:{
      getHomeData(){
        var token=localStorage.getItem('token')
          if(token){
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
          }else{
            this.$router.push({path:'/login'})
          }
        
    },
      removeNo(){
        this.dialog=false
     
      },
      setPaypass(){
        this.$router.push({path:'/set/paypass/2'})
      },
      ensure(){
          if(this.operateInfo=='去完善' || this.operateInfo=='去提交'){
            this.$router.push({path:'/Information'})
          }else{
            this.$router.push({path:'/home'})
          }
      },
      unensure(){
        this.dialog=false
        this.$router.push({path:'/home'})
      },
      //格式化日期
      formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
            }
        }
        return fmt;
    },

      padLeftZero(str) {
        return ('00' + str).substr(str.length);
      },
      //验证是否为空对象
      isEmptyObject( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
      },
      getBankData(){
        $.ajax({
          url:this.BaseURL+'Personal/myBankCard',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
            if(res.info){
              this.$store.dispatch('getCardInfo',res.info);
            }else{
              return false
            }
          
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
        
      },
      getBankInfo(){
        $.ajax({
          url:this.BaseURL+'Cash/isCheckBank',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
           if(res.info.is_check_bank==0){
                this.erroInfo=res.info.reject_reason
                this.operateInfo='去完善'
                this.dialog2=true
           }else if(res.info.is_check_bank==1){
                this.erroInfo=res.info.reject_reason
                this.operateInfo='确定'
                this.dialog2=true
           }else if(res.info.is_check_bank==3){
                this.erroInfo=res.info.reject_reason
                this.operateInfo='去提交'
                this.dialog2=true
           }else{
              this.dialog=false
           }
          
          },
          error:(res) => {
            console.log('Ajax error!')
          }   
        })
      },
     //提交提现金额
      submitCash() {
        if(this.num.length!=0){
          if(isNaN(this.num)){
            this.msgKey=true;
            this.message='提现金额只能是数字';
            setTimeout(() => {
              this.num='';
              this.msgKey=false;
              this.message='';
            },2000)

          }else{
            this.msgKey=false;
            this.message='';
            if(!this.paypassinfo){
              
                this.dialog=true
            }else{
              this.passKey=true
            }
            
          }
        }else{
          this.msgKey=true;
          this.message='提现金额不能为空'
           setTimeout(() => {
              this.msgKey=false;
              this.message='';
          },2000)
        }
        
      },
      closePass() {
        this.passKey=false
        this.pwd=''

      },
      //输入密码，确定提交
      confirmpass() {
        //提交密码，然后关闭弹窗
        $.ajax({
          url:this.BaseURL+'Cash/doCash',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            money:this.num,
            pay_password:this.pwd,
            card_id:this.cardInfoList.card_id
          },
          success:(res) => {
            if(res.status==0){
              this.msgError=true;
              this.errorMsg=res.info;
              setTimeout(() => {
              this.msgError=false;
              this.errorMsg='';
              this.passKey=false;
              this.pwd=''
              },2000)
            }
            else if(res.status==1){
              this.msgError=true;
              this.showType='success';
              this.errorMsg=res.info;
              setTimeout(() => {
              this.msgError=false;
              this.errorMsg='';
              this.showType='error';
              this.$router.push({path:'/home/cash/withdrawalresult'});
              var cardNum=this.qualification.qualification.card_num;
              var len=cardNum.length;
              var fourNum=cardNum.substring(len-4);
              this.$store.dispatch('getWithDrawInfo',
                {
                  bankName:this.qualification.qualification.bank_name,
                  bankFourNum:fourNum,
                  money:this.num,
                  ctime:this.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
                  order_sn:res.order_sn
                }
                ); 
              },2000)

              
            }
            
          },
          error:(res) => {

            
          },

        })
        
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.withdrawal
  position: fixed
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
  .dialog
      position: absolute
      width 90%
      height 110px
      top: 40%;
      margin-left 5%
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
  .title
    position: relative
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
      line-height: $barHeight;
      color #fff
    .detail
      position: absolute
      width 60px
      right 0
      font-size 14px
      color #fff
  .main
    width 100%
    .head
      position: relative
      width 100%
      height 70px
      background #fff
      border-1px(#eee)
      .item
        position: absolute
        &.avatar
          top 20px
          left 20px
          width 30px
          height 30px
          border-radius 50%
          overflow hidden
        &.bankName
          top 15px
          left 60px
          font-weight 500
          font-size 14px
        &.cardId
          bottom 10px
          left 60px
          font-size 12px
          font-weight 500
          opacity: 0.5
        &.more
          right 15px
          line-height 70px
          width 150px
          text-align right
    .form
      width 100%
      height 100px
      overflow hidden
      background #fff
      .text
        width 100%
        margin 15px 15px
        font-size 14px
        font-weight 500
      .num
        width 100%
        margin 0px 15px
        font-size 20px
        font-weight 500
        input
          width 85%
          height 40px
          line-height 40px
          border none
          outline none
          font-size 36px
          text-indent 5px
  .msg
    width 80%
    margin 0 10%
    .el-alert
      padding 4px 16px 
     
  .btn
    display block
    width 90%    
    height $buttonHeight
    line-height $buttonHeight
    border none
    font-size 16px
    margin 20px auto
    background $mainColor
    border-radius 6px
    color #fff 
    &:active
      background #841d21
  .mark
    position: absolute
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0, 0, 0, .5)
  .pssword
    position: absolute
    bottom 0
    left: 0;
    width 100%
    height 240px
    overflow hidden
    background #fff
    .title
      background #fff
      color #000
    .inputpass
      // position absolute
      width 100%
      margin 20px 0
      input 
        display block
        width 80%
        height 35px
        padding-left 6px
        line-height 35px
        font-size 18px
        margin 0 auto
        border 1px solid #cac3c3
        border-radius 4px
        outline none
    .setPass
      width 100%
      font-size 10px
      text-align right
      padding-right 60px
      text-decoration underline
      color #f00
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      a
        color #09c
    .button
      // position absolute
      width 100%
      bottom 6px
      margin 0 auto 20px
      .btn
        width 90%
</style>
