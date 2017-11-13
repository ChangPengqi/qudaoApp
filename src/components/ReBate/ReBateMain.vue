<template>
 <transition 
    name="custom-classes-transition"
        enter-active-class="animated fadeInRight"
        
        mode="in-out"
    >
    <div class="rebatemain">
      <div class="title">
        <router-link to="/home/rebate" class="fa icon-left back" tag="i"></router-link>
        <span>收益-返利</span>
        <router-link to="/home/rebate/rebatecreditdetail" class="sm" tag="i">说明</router-link>
        
      </div>
      <div class="content">
        <div class="data" id="rebatemain" >
          <ul>
            <li  class="list" >
            <!--   <div class="list_tit">
              <p><span class="year">2016</span>（<span>2016-01-01</span>至<span>2017-01-01</span>）</p>
            </div> -->
              <div class="list_detail">
                <div class="totalNum">
                  <div class="name">交易总金额</div>
                  <div class="money">￥{{rebateDetailInfo.total_consume}}<!-- {{list.date_money}} --></div>
                </div>
                <div class="rebateNum">
                  <div class="name">返利</div>
                  <div class="money">￥{{rebateDetailInfo.total_rebate}}</div>
                </div>
              </div>
            </li>
            
          </ul>

        </div>
         <div class="msg" v-if='' >  暂无数据....</div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
// import { Radio } from 'mint-ui'
export default {
  	name:'rebatemain',
    data() {
      return {
          
      }
    },
    created:function(){
        this.getData()
    },
    methods:{
      getData(){
      $.ajax({
        url:this.BaseURL+'income/rebate_detail',
        method:'post',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          console.log(res)
          if(res.status){
            this.$router.push({path:'/login'})
          }else{
            this.$store.dispatch('getRebateDetailInfo',res)
          }
          /*this.spinshow=false*/
        },
        error: function(xhr, type){
          console.log('Ajax error!')
        }
      })
    },
    },

    computed:{
     rebateDetailInfo:function(){
        return this.$store.state.rebateDetailInfo;
      }
    },
    watch:{
      
    },
    mounted:function(){
      this.checkSystem($('.rebatemain'))
      setTimeout(function(){
         new BScroll(document.getElementById('rebatemain'), {
          click:true
        })
      },200)
       
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.rebatemain
  position: absolute
  width 100%
  left 0px
  top 0
  bottom 0
  overflow auto
  -webkit-overflow-scrolling:touch
  .msg
    color #c81623
    margin 10px 0
    text-align center
  .title
    position: relative
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    // border-1px(#af4040)
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 400
    z-index 200
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
    .sm
      position absolute; 
      right 20px 
      font-size 12px; 
      color #fff
  .content
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0px;
    top: 50px;
    bottom: 0;
    overflow auto
    .data
      position: absolute
      width 100%
      left 0px
      top 0
      bottom 0
      overflow auto
      box-sizing border-box
  .list
    width 100%
    height 100px
    border-1px(#eee)
    background #fff
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    &:active
      background rgba(0, 0, 0, .2)
    .list_tit
      background #eee
      padding 0 20px
      height 30px
      line-height 30px
    .list_detail
      width 100%
      .totalNum,.rebateNum
        height 50px
        line-height 50px
        padding 0 20px
        .name
          width 50%
          float left

        .money
          width 50%
          text-align right
          float left
          font-size 16px

    
        
</style>        
