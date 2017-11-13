<template>
  <div class="addcardinfo">
    <div class="title">
    <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a>
    <!-- <router-link to="/home/cash/addcard" class="fa icon-left back" tag="i"></router-link > -->
      <span>填写银行卡信息</span>
    </div>
    <div class="main">
      <div class="tips">请绑定持卡人本人的银行卡</div>
      <form>
        <p class="list"><label for="user">银行卡类型</label><input type="text" v-model='cardType' id="user" placeholder="请输入储蓄卡或者借记卡" disabled="disabled" style='background:#fff; color:#ccc'></p>
        <div  class="msg" v-if="msgKey1">{{msg1}}</div>
        <p class="list"><label for="cardId">银行预留手机</label><input type="text" v-model='cardPhone' id="cardId" placeholder="请输入正确的手机号"></p>
        <div  class="msg" v-if="msgKey2">{{msg2}}</div>
      </form>
      
      <div class="agree">
        同意<a href="#">《服务协议》</a>
      </div>
    </div>
    <button class="next" @click="next">确定</button>
    <div class="model" v-show="success">
      绑定成功！
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// import { RegionPicker } from 'vue-region-picker'
// import REGION_DATA from 'china-area-data'
import BScroll from 'better-scroll'
// RegionPicker.region = REGION_DATA
// RegionPicker.vueVersion = 2 // or 2, default 1
export default {
  	name:'addcardinfo',
    components:{

    },
    data() {
      return {
        cardType:'借记卡',
        cardPhone:'',
        msg1:'',
        msg2:'',
        msgKey1:false,
        msgKey2:false,
        success:false,
      }
    },
    computed:{
      firstStepCard:function(){
        return this.$store.state.card
      }
    },
    created:function(){
      localStorage.setItem('cardName',this.firstStepCard.cardName)
      localStorage.setItem('cardNum',this.firstStepCard.cardNum)
      localStorage.setItem('idNumber',this.firstStepCard.idNumber)
    },

    mounted:function(){
        this.checkSystem($('.addcardinfo'))
    },
    methods:{
      back(){
        this.$router.go(-1)
      /* this.$router.push({path:'/home/cash/addcard/3'})*/
      },

      checkPhoneNum(num){
        var reg =/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;  
        if(!reg.test($.trim(num))){  
          return false  
        }else{  
           return true  
        }

      },


      next() {
        //如果绑定成功
        var card_type;

        if(this.cardType.length==0){
            this.msgKey1=true;
            this.msg1='银行卡类型不能为空'
            setTimeout(() => {
                this.msgKey1=false;
                this.msg1='';
            },2000)
        }else{
          if(this.cardType!='借记卡' && this.cardType!='储蓄卡'){
            this.msgKey1=true;
            this.msg1='银行卡类型错误'
            setTimeout(() => {
                this.msgKey1=false;
                this.msg1='';
            },2000)
          }
        }
        if(this.cardPhone==0){
            this.msgKey2=true;
            this.msg2='手机号码不能为空'
            setTimeout(() => {
                this.msgKey2=false;
                this.msg2='';
            },2000)
        }else{
            if(!this.checkPhoneNum(this.cardPhone)){
              this.msgKey2=true;
              this.msg2='手机号码格式不正确'
              setTimeout(() => {
                this.msgKey2=false;
                this.msg2='';
            },2000)
            }

        }

        if((this.cardType=='借记卡' || this.cardType=='储蓄卡') && this.checkPhoneNum(this.cardPhone)){
           if(this.cardType=='借记卡'){
              card_type=1
            }else if(this.cardType=='储蓄卡'){
              card_type=2
            }
            var query= this.firstStepCard.query
            $.ajax({
                    url:this.BaseURL+'Personal/addEditBankCard',
                    type:'post',
                    data:{
                      token:localStorage.getItem('token'),
                      card_num:this.firstStepCard.cardNum,
                      card_name:this.firstStepCard.cardName,
                      card_type:card_type,
                      card_phone:this.cardPhone,
                      id_card:this.firstStepCard.idNumber

                    },
                    success:(res) => {
                      if(res.status==0){
                        this.msgKey2=true;
                        this.msg2=res.info;
                        this.success=false;
                        setTimeout(() => {
                            this.msgKey2=false;
                            this.msg2='';
                        },2000)

                      }else{
                       
                        this.success=true;
                        var that = this;
                        setTimeout(function(){
                           that.success=false;
                           //路由跳转到银行卡
                           that.$router.push({path:'/home/cash/mycard/'+query})
                        },1500)
                      }
                    
                   
                    },
                    error:(res) => {
                      console.log(res)
                      console.log('Ajax error!')
                    } 
                  })
        } 
      },
    

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.addcardinfo
  position: fixed
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
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
      width 50px
      line-height: $barHeight;
      color #fff
    .addcard
      position: absolute
      right 15px
      line-height $barHeight
      color #fff
  .main
    width 100%
    text-align center
    .tips
      width 100%
      height 30px
      line-height 30px
      font-size 12px
      font-weight 500
    .msg
      margin-top 20px
      margin-bottom 20px
      color red
    .list
      display flex
      height 60px
      line-height 60px
      border-1px(#eee)
      background #fff
      label
        width 150px
        font-size 14px
        font-weight 500
        height 28px
        line-height 28px
        padding 16px 0
      input 
        flex 1
        margin-right 15px
        border none
        outline none
        font-size 14px
        line-height 28px
        height 28px
        padding 16px 0
      &:last-child
        border none
    .agree
      width 100%
      text-align left
      text-indent 20px
      margin-top 20px
      font-size 12px
      a
        color #f00
  .next
    display block
    width 90%
    margin 30px auto
    border none
    border-radius 6px
    outline none
    height $buttonHeight
    line-height $buttonHeight
    color #fff
    font-size 16px
    background $mainColor
    &:active
      background #841d21
  .model
    position: relative
    margin 0 auto
    width 200px
    border-radius 6px
    height 60px
    line-height 60px
    background rgba(0, 0, 0, .6)
    text-align center
    color #fff
</style>
