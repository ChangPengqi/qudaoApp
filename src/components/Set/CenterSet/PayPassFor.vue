<template>
  <div class="paypassfor">
    <div class="title">
    <!-- <router-link  to="/set/shild/paypassselect" class="fa icon-left back" tag="i"></router-link> -->
      <!-- <router-link v-if='query==1' to="/set/shild/paypassselect" class="fa icon-left back" tag="i"></router-link>
      <router-link v-if='query==2' to="/home/cash/withdrawal" class="fa icon-left back" tag="i"></router-link> -->
      <!-- --><span class="fa icon-left back" @click='goback()'></span> 
      修改支付密码
    </div>
    <div class="main">
      <div class="item">
        <div class="list left">姓名</div>
        <div class="list right">{{this.myInfo.username | replace}}</div>
      </div>
      <div class="item">
        <div class="list left">证件号</div>
        <div class="list right">
          <input type="number" name="" v-model="idNum">
        </div>
      </div>
    </div>
    <div class="msg" v-if="msgKey"><el-alert :title="msg" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert></div>
    <button class="btn" @click="next">下&nbsp;&nbsp;一&nbsp;&nbsp;步</button>
  </div>
</template>

<script>


export default {
  name: 'paypassfor',
  data () {
    return {
      idNum:'',
      msg:'',
      msgKey:false,
      closeIcon:false
    }
  },
  filters:{
    replace(str){
      return str.substr(0,1)+new Array(str.length).join('*')
    }
  },
  created:function(){
    
  },
  computed:{
    myInfo:function(){
      return this.$store.state.myinfo;
    },
    query:function(){
      var len=location.hash.length
      return location.hash.substring(len-1,len)
    }
  },
  methods:{
    goback(){
      var len=location.hash.length
      var query=location.hash.substring(len-1,len)
      if(query==1){
        this.$router.push({path:'/set/shild/paypassselect'})
      }else if(query==2){
        this.$router.push({path:'/home/cash/withdrawal'})
      }
    },
    next(){
      if(this.idNum.length===0){
        this.msg="请输入您的证件号码！";
        this.msgKey=true;
      }else{
        $.ajax({
          url:this.BaseURL+'Personal/payPwd_cardid',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            cardID:this.idNum
          },
          success:(res) => {
            // console.log(res.status);
            if(res.status==1){
              this.$router.push({path:'/set/shild/paypassforset'})
            }else{
              this.msgKey=true;
              this.msg="身份证号不正确!"
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
      },2000)
    },

  },
  mounted:function(){
    this.checkSystem($('.paypassfor'))

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.paypassfor
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
    margin 20px 0
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .item
      display flex
      height 60px
      line-height: 60px
      background #fff
      border-1px(#eee)
      padding 0 20px
      .left
        width 60px
      .right
        flex 1
      &:last-child
        border none
        input
          width 100%
          border none 
          outline none
          height 28px
          font-size 16px
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
