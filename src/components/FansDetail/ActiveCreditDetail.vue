<template>
<transition
name="custom-classes-transition"
         enter-active-class="animated fadeInRight"
    mode="in-out">
  <div class="fansrebatedetail">
    <div class="title">
      <router-link to="/home/fans/fansinstallmentdetail" class="fa icon-left back"></router-link>
      <span>详情</span>
    </div>
    <div class="main" >
      <div class="content">
        <div id="rebateDetail" class="data">
           <ul>
            <li  class="list" v-for="list in consumeDetail">
              <div class="date">
                <div class="day">{{list.add_time | formDate}}</div>
                <div class="time">12:30:52</div>
              </div>
              <div class="goods">{{list.goods_name}}</div>
              <div class="price">￥<span class="money">{{list.total_amount}}</span></div>
              <div class="stages">￥<span class="money">{{list.first_amount}}</span>x <span class="sta_num">{{list.stage_number}}</span>期</div>
            </li>
            
          </ul>


        </div>
      </div>
     
    </div>
  </div>
  </transition>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
    name:'fansrebatedetail',
    data() {
      return {
         
         
      }
    },
    methods:{
      getData(){
        $.ajax({
          url:this.BaseURL+'fen/consume_info',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            userid:this.consumeDetailOne.userid
          },
          success:(res) => {
            console.log(res);
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getConsumeDetail',res);
            }

          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      }
      /*openInstallment(user_id,index) {
        // if(index===0){
        //   this.$router.push({path:'/home/fans/activecreditdetail'})
        // }else{
          this.getDetailData(user_id);
          this.$router.push({path:'/home/fans/fansinstallmentdetail'})
        // }  
      },
      getDetailData(id){
         $.ajax({
          url:this.BaseURL+'Fen/stages',
          type:'get',
          data:{
            token:localStorage.getItem('token'),
            rec_id:id
          },
          success:(res) => {
            // console.log(res);
            this.$store.dispatch('getFansStageInfo',res);
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      }*/
    },
    created:function(){
      this.getData()
    },
    computed:{
      consumeDetailOne:function(){
        return this.$store.state.consumeDetailOne
      },
      consumeDetail:function(){
        return this.$store.state.consumeDetail
      },
     

    },
    mounted:function(){
      this.checkSystem($('.fansrebatedetail'))        
       setTimeout(function(){ 
          let rebateDetailscroll = new BScroll(document.getElementById('rebateDetail'), {
          click:true,
          bounceTime:300,
          swipeBounceTime: 800
        })

       },200)
      
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.fansrebatedetail
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
    width 100%
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
      .date
        width 25%
        float left
        line-height 20px

      .goods
        width 20%
        float left
        line-height 35px
        font-size 16px
        text-align center
      .price
        width 20%
        float left
        line-height 35px
        font-size 12px
        color #05c1ff
        text-align center
      .stages
        width 35%
        float left
        line-height 35px
        font-size 12px
        color #259b24
        text-align center
</style>
