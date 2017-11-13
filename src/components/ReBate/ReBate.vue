<template>
  <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInRight"
     
        mode="in-out"
      >
    <div class="rebate">  
      <div class="head">
        <div class="title">
          <router-link to="/home" class="fa icon-left back" tag="i"></router-link>
          <span>收益</span>
        </div>
        <div class="rebate_top">
          <div class="tit">累计收益（元）</div>
          <div class="money">{{incomeInfo.income_count ? incomeInfo.income_count : 0}}</div>
        </div>
        <div class="main">
          <div class="item">
            <div class="item_left">
                <div class="rebatetext">返利（元）</div>
                <div class="count">{{incomeInfo.total_rebate ? incomeInfo.total_rebate : 0}} </div>
            </div>
            <div class="item_right">
              <router-link to="/home/rebate/rebatemain" tag="div"><p class="btn">查看明细</p></router-link>
            </div>


          </div>
          <div class="item">
            <div class="item_left">
                <div class="rebatetext">补贴（元）</div>
                <div class="count">{{incomeInfo.total_subsidy ? incomeInfo.total_subsidy  : 0}} </div>
            </div>
            <div class="item_right">
              <router-link to="/home/rebate/encouragegold" tag="div"><p class="btn">查看明细</p></router-link>
            </div>

            
          </div>
         <!--  <router-link to="/home/rebate/rebatemain" class="item rebategold" tag="div">
           返利（{{rebate.fanliincome_count ? rebate.fanliincome_count : 0}}）
         </router-link>
         <router-link to="/home/rebate/encouragegold" class="item encouragegold">
           鼓励金（{{rebate.guliincome_count ? rebate.guliincome_count : 0}}）
         </router-link> -->
        </div>
      </div>
      
      
     
    </div>
  </transition>
</template>
<script>
// import BScroll from 'better-scroll'
// import { Radio } from 'mint-ui'
export default {
  	name:'rebate',
    data() {
      return {
           
      }
    },
    methods:{
      getData(){
        $.ajax({
          url:this.BaseURL+'income/income_info',
          method:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
            console.log(res)
            if(res.status==-1){
                this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getIncomeInfo',res);
            }
            
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      }
    },
    computed:{
      incomeInfo:function(){
        return this.$store.state.incomeInfo;
      }
    },
    created:function(){
      this.getData();
    },
    mounted:function(){
      this.checkSystem($('.rebate'))
      /*let that=this;
      setTimeout(function(){
        that.$router.push({path:"/home/rebate/rebatemain"});
      },0)*/
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.rebate
  width 100%
  background #eee
  position fixed
  .head
    width 100%
    border-1px(#eee)
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
    .rebate_top
      position: relative
      padding 20px
      height 100px
      background $mainColor
      color #fff
      .tit
        font-size 16px
      .money
        font-size 40px
        padding 32px 0
    .main

      .item
        height 70px
        padding 20px 
        background #fff
        margin-top 20px

        .item_left
          width 50%
          line-height 40px
          float left
          text-align left
          .count
            font-size 30px
            color #f7a914
        .item_right
          width 50%
          float left
          line-height 40px
          text-align right
          .btn 
            width 60%
            float right
            color #fff
            margin-top 30px
            line-height 30px
            background #f7a914
            border-radius 8px
            text-align center
            cursor pointer
         
  .detail
    position: absolute
    width 100%
    left 0px
    top 60px + $barHeight
    bottom 0
    overflow auto 
    -webkit-overflow-scrolling:touch
    background #fff
  .msg
    position: relative
    text-align center
    line-height 100px
    color $mainColor
</style>        
