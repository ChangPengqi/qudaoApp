<template>
  <div class="withdrawal">
    <div class="title">
      <router-link to="/home/cash/withdrawalresult" class="fa icon-left back"></router-link tag="i">
      <span>账单详情</span>
      <router-link class="detail" to="/home/cashdetail">明细</router-link>
    </div>
    <div class="main" id="process" >
      <div class="data">
        <div style='padding-bottom:200px'>
          <div class="head">
            <div class="bankname">
              {{withDrawInfo.bankName}}
            </div>
            <div class="money">{{withDrawInfo.money}} 元</div>
          </div>
          <div class="process">
            <el-steps :space="80" direction="vertical" :active="status" :finish-status="typeMark">
              <el-step title="付款成功" :description='ctime'></el-step>
              <el-step title="银行处理中" description=""></el-step>
              <el-step :title="message" description=""></el-step>
            </el-steps>
            
          </div>
          <div class="detail">
            <div class="item">
              <div class="text">转账到</div>
              <div class="des">{{withDrawInfo.bankName}}（{{withDrawInfo.bankFourNum}}）{{withDrawInfo.card_name}}</div>
            </div>
            <div class="item">
              <div class="text">创建时间</div>
              <div class="des">{{withDrawInfo.ctime}}</div>
            </div>
            <div class="item">
              <div class="text">账单号</div>
              <div class="des">{{withDrawInfo.order_sn}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
import {Step ,Steps} from 'element-ui'
export default {
    name:'withdrawal',
    data() {
      return {
        status:1,
        typeMark:'success',
        message:'到账成功'
        
      }
    },
     components:{
      'el-steps':Steps,
      'el-step':Step
    },
    created:function(){
      this.getData()
    },
    methods:{
      getData(){
        $.ajax({
          url:this.BaseURL+ '/Cash/getWdcashStatus',
          type: 'POST',
          dataType: 'JSON',
          data: {token: localStorage.getItem('token'),order_sn:this.withDrawInfo.order_sn},
          success:function(res){
              if(res.status==1){
                if(res.info.wd_status==0){
                    this.status=2
                }else if(res.info.wd_status==3){
                    this.status=3
                }else{
                  this.status=3
                  this.typeMark=false
                  this.message='提现失败'
                }
              }else{

              }

          }
        })
        
        
      }
     
    },
    computed:{
      ctime:function(){
       return this.$store.state.withdrawInfo.ctime
      },
      withDrawInfo:function(){
        return this.$store.state.withdrawInfo
      },
      
    },
    mounted:function(){
      this.checkSystem($('.withdrawal'))
      let scroll = new BScroll(document.querySelector('.data'), {
        startX: 0,
        startY: 0
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.withdrawal
  position: absolute
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
    position: absolute
    top $barHeight
    bottom 0
    left 0
    right 0
    overflow auto
    -webkit-overflow-scrolling:touch
    width 100%
    background #fff
    .data
      position: absolute;
      width: 100%;
      left: 0px;
      top: 0;
      bottom: 0;
      overflow: auto;
      margin: 20px auto;
      box-sizing: border-box;
      height 500px
    .head
      width 100%
      height 60px
      line-height 26px
      text-align center
      margin-top 15px
      font-size 15px
      font-weight 500
      border-1px(#eee)
    .process
      width 100%
      padding 20px 40px
      background #fff
      border-1px(#eee)
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    .detail
      width 100%
      .item
        display flex 
        height 50px
        line-height 50px
        font-size 14px
        font-weight 300
        border-1px(#eee)
        .text 
          width 80px
          text-align center
        .des
          flex 1
          text-align right
          margin-right 20px
</style>
