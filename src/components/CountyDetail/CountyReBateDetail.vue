<template>
  <div class="countyrebatedetail">
    <div class="title">
      <router-link to="/home/countydetail" class="fa icon-left back"></router-link>
      <span>返利明细</span>
    </div>
    <div class="main" id="rebateDetail">
      <ul>
        <li v-for="(list,index) of countyrebatedetail" class="list" @click="openInstallment(index,list.rec_id)">
          <div class="left">
            <div class="name">{{list.goods_name}}</div>
            <div class="money">分 <span class="num">{{list.stages_number}}</span> 期</div>
          </div>
          <div class="right">
            <div class="creditline">分期总金额 {{list.total_amount}}</div>
            <div class="installment">{{list.add_time}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
  	name:'countyrebatedetail',
    data() {
      return {
         
         
      }
    },
    methods:{
      openInstallment(index,rec_id) {
          this.$router.push({path:'/home/countydetail/countyinstallmentdetail'});
          this.initData(rec_id);
      },
      initData(id) {
        $.ajax({
          url:this.BaseURL+'Countydeal/stages',
          type:'get',
          data:{
            token:localStorage.getItem('token'),
            rec_id:id
          },
          success:(res) => {
            // console.log(res);
            this.$store.dispatch('getCountyStageDetail',res);
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      },
    },
    computed:{
      countyrebatedetail:function(){
        return this.$store.state.countyrebatedetail;
      }
    },
    mounted:function(){
      this.checkSystem($('.countyrebatedetail'))
      let rebateDetailscroll = new BScroll(document.getElementById('rebateDetail'), {
        click:true,
        // bounceTime:300,
        // swipeBounceTime: 800
      })
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.countyrebatedetail
  position: fixed
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
      left 0
      width $barHeight
      line-height $barHeight
      color #fff
  .main
    position: absolute
    top 50px
    bottom 0px
    left 0px
    right 0px
    overflow auto
    .list
      display flex
      width 100%
      height 70px
      padding 14px 15px
      border-1px(#eee)
      background #fff
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      &:active
        background rgba(0, 0, 0, .2)
      .left
        flex 1
        margin-top 4px
        text-align left
        .name
          font-size 14px
          font-weight 500
        .money
          margin-top 10px
          font-size 13px
          font-weight 300
          .num
            font-size 15px
            color #00a0e9
      .right
        flex 1
        margin-top 4px
        text-align right
        // overflow hidden
        .creditline
          font-size 14px
          font-weight 400
          height 14px
        .installment
          font-size 14px
          font-weight 300
          margin-top 12px
          color #00a0e9
</style>
