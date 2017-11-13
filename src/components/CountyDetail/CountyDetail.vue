<template>
<transition
        
         enter-active-class="animated fadeInRight"
    mode="in-out"
      >
  <div class="countydetail">
    <div class="title">
      <router-link to="/home/countydetail/credit" class="fa icon-left back" tag="i"></router-link>
      <span>{{countyDealer.county_name}} </span>
    </div>
    <div class="main">
      <div class="head">
        <div class="text left">
          <div class="fanstext">返利总金额</div>
          <div class="count">0</div>
        </div>
        <div class="text right">
          <div class="fanstext">粉丝总数</div>
          <div class="count">{{countylistDate.usercount ? countylistDate.usercount :0}}</div>
        </div>
      </div>
      <div class="content" >
        <div id="fansdetail" class="data" >
          <ul>
            <li class="list" v-for="list in chaFansDetailistInfo.fen_list"  @click='openDetail(list)'>
              <div class="date">{{list.ctime | formdata | substr}}</div>
              <div class="avatar">
                <p class="userImg">
                  <img v-if='list.avatar' :src="list.avatar" alt="" width="40px" height="40px">
                  <img v-if='!list.avatar' src="./noimage.png" alt="" width="40px" height="40px">
                </p>
              </div>
              <div class="user">
                <div class="nickName">{{list.nickname}}</div>
                <div class="num">
                 <p v-if='list.openact_status==1'>信用额度：<span>{{list.creditamount}}</span></p>
                  <p v-if='list.openact_status==2' style="color:red">{{list.openact_status_str}}</p>
                  <p v-if='list.openact_status==3' style="color:red">{{list.openact_status_str}}</p>
                </div>
              </div>
              <div class="buy">
                <div class="buy_num">
                 <p class="num1"><span>{{list.shop_total}}</span>笔分期消费</p>
                  <p class="num2">消费总金额：<span>{{list.ciqd_money}}</span></p>

                </div>
              </div>
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
  	name:'countydetail',
    data() {
      return {
         msg:"wo shi fensi xiangqing"
      }
    },
     created:function(){
        this.getData()
      },
    methods:{
      openDetail(list){
        if(list.openact_status==1){
          this.$store.dispatch('getConsumeDetailOne',list)
          this.$router.push({path:'/home/countydetail/countyinstallmentdetail'})
        }

        //
      },
      getData(){
        $.ajax({
          url:this.BaseURL+'fen/fen_detail',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            county_id:this.countyDealer.county_id,
            date:this.countylistDate.date,
            group:2
          },
          success:(res) => {
            console.log(res);
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getChanFansDetailistInfo',res);
            }
            
            setTimeout(function(){ 
              let directfanscroll = new BScroll(document.getElementById('fansdetail'), { 
                click:true,
                bounceTime:300,
                swipeBounceTime: 800
              })
            },200)
            
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })

      },
      
    },
    filters:{
      changDate(value){
        var len=value.length;
        return value.substring(len-1)
      },
      substr(value){
        return value.split(' ')[0].substring(5).replace('/','-')
      }
    },
    computed:{
      countylistDate:function(){
        return this.$store.state.countylistDate
      },
      chaFansDetailistInfo:function(){
        return this.$store.state.chaFansDetailistInfo;
      },
      county_name:function(){
        return this.$store.state.county_name;
      },
      countyDealer:function(){
        return this.$store.state.countyDealer;
      }
    },
    mounted:function(){
      this.checkSystem($('.countydetail'))
       
     
    },
    updated:function(){
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.countydetail
  position: fixed;
  top: 0;
  left: 0;
  right: 0px;
  bottom: 0;
  background: #eee;
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
  .head
    display flex
    position: relative
    width 100%
    height 100px
    background $mainColor
    color #fff
    .text
      flex 1
      left 15px
      top 0px
      font-size 10px
      font-weight 500
      text-align left
      .fanstext
        vertical-align bottom
        opacity: 0.5
        margin-top 15px
        margin-bottom 6px
      .count 
        margin-top 2px        
        font-size 36px
      &.right
        text-align right
        margin-right 15px
      &.left
        margin-left 15px
  .content
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0px;
    top: 150px;
    bottom: 0;
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
    width 100%;
    .main_top
      width 100%
      height 170px
      background #fff
      border-bottom 1px solid #eee
      .mtitle
        height 50px
        text-align center
        line-height 50px
        font-size 16px
      .num 
        height 70px
        line-height 70px
        font-size 30px
        text-align center
      .type
        height 50px
        line-height 50px
        font-size 16px
        .t_num
          width 50%
          float left
          text-align center
    .list
      display flex
      height 60px
      line-height 60px
      background #fff
      border-1px(#eee)
      padding 5px 15px
      font-size 15px
      font-weight 400
      &:last-child:active
        background rgba(0, 0, 0, .2)
      .date 
        color #ccc
        width 10%
        float left
      .avatar
        width 20%
        float left
        .userImg
          margin 10px auto
          width 40px
          height 40px
          border-radius 100%
          background #ccc
          img
           border-radius 100%

      .user
        width 30%
        float left
        margin-top 10px
        .nickName,.num
          height 20px
          line-height 20px
          font-size 14px
        .num
          font-size 12px
          color #259b24
      .buy 
        width 40%
        float left
        margin-top 10px
        .num1,.num2
          height 20px
          line-height 20px
          font-size 14px
        .num2
          font-size 12px
          color #259b24
  .tips
    width 100%
    margin-top 30px
    text-align center
    color $mainColor
    font-weight bolder
</style>
