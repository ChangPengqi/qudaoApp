<template>
  <div class="expendetail">
    <div class="title">
      
     <!--  <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a> -->
     <router-link to="/home/cashdetail" class="fa icon-left back"></router-link tag="i"> 
      <span>收支详情</span>
    </div>
    <div class="main" >
      <ul>
        <li class="list">
          <div class="item left">
            流水号
          </div>
          <div class="item right"> 
            {{cash_detail.order_sn}}
          </div>
        </li>
        <li class="list">
          <div class="item left">
            类型
          </div>
          <div class="item right">
            提现
          </div>
        </li>
        <li class="list">
          <div class="item left">
            金额
          </div>
          <div class="item right">
            ￥ {{cash_detail.money}}
          </div>
        </li>
        <li class="list">
          <div class="item left">
            银行
          </div>
          <div class="item right">
            {{qualification.qualification.open_bank}}（{{cash_detail.bank_card_four}}）
          </div>
        </li>
        <li class="list">
          <div class="item left">
            时间
          </div>
          <div class="item right">
            {{cash_detail.ctime}}
          </div>
        </li>
        <li class="list">
          <div class="item left">
            状态
          </div>
          <div class="item right">
            <span :style="{'color':activeColor}">{{message}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'expendetail',
    data() {
      return {
        message:'',
        activeColor:''
         
      }
        
    },
    mounted:function(){
      // let scroll = new BScroll(document.getElementById('cashdetail'), {
      //   startX: 0,
      //   startY: 0
      // })
       this.checkSystem($('.expendetail'))
    },
    created:function(){
       this.getData();
      
      //document.addEventListener("backbutton", this.eventBackButton, false);
    },
    computed:{
      cash_detail:function(){
        return this.$store.state.cashDetail;
      },
      qualification:function(){
        return this.$store.state.qualification;
      },
      
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      getData(){
        var that=this
        $.ajax({
          url:that.BaseURL+ '/Cash/getWdcashStatus',
          type: 'POST',
          dataType: 'JSON',
          data: {
            token: localStorage.getItem('token'),
            order_sn:that.cash_detail.order_sn
          },
          success:function(res){
            console.log(res)
              if(res.status==1){
                
                if(res.info.wd_status==1 || res.info.wd_status==5){
                    that.message='正在提现中'
                    that.activeColor='#f90'
                }else if(res.info.wd_status==3){
                    that.message='提现成功'
                    that.activeColor='#19be6b'
                }else if(res.info.wd_status==2 || res.info.wd_status==4){
                    that.message='提现失败'
                    that.activeColor='#ed3f14'
                }else{
                    that.message='提现失败'
                    that.activeColor='#ed3f14'
                }
              }else{

              }

          }
        })
        
        
      }
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.expendetail
  position: absolute
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
  .title
    position: relative
    with 100%
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 300
    .back
      position: absolute
      left 0
      width $barHeight
      line-height: $barHeight;
      color #fff
  .main
    width 100%
    background #fff
    .list
      display flex 
      border-1px(#eee)
      font-size 15px
      font-weight 500
      height 60px
      line-height 60px
      .item
        flex 1
        text-align center
        &.left
          text-align left
          margin-left 20px
        &.right
          text-align right
          margin-right 20px
</style>
