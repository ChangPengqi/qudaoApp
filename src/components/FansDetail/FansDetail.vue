<template >
  <transition  

  name="custom-classes-transition"
        enter-active-class="animated fadeInRight"
    mode="in-out"
        >
  <div class="fansdetail">
    <div class="title">
      <router-link to="/home/fans/directfan" class="fa icon-left back"></router-link>
      <span>详情</span>
    </div>
    <div class="main">

      <div class="main_top">
        <div class="mtitle">
          <span>{{fansDetail.date | changDate}}</span>月新增粉丝数
        </div>
        <div class="num">{{fansDetail.usercount}}</div>
        <div class="type">
          <p class="t_num">已激活：<span>{{fansDetailistInfo.isact_num}}</span>人</p>
          <p class="t_num">未激活：<span>{{fansDetailistInfo.noact_num}}</span>人</p>
        </div>
      </div>
      <div class="content" >
        <div id="fansdetail" class="data" >
          <ul>
            <li class="list" v-for="list in fansDetailistInfo.fen_list" @click='getDetail(list)'>
              <div class="date">{{list.addtime?list.addtime:01-01 | formdata | substr}}</div>
              <div class="avatar">
                <p class="userImg">
                  <img v-if='list.avatar' :src="list.avatar" alt="" width="40px" height="40px">
                  <img v-if='!list.avatar' src="./noimage.png" alt="" width="40px" height="40px">
                </p>
              </div>
              <div class="user">
                <div v-if='list.nickname' class="nickName">{{list.nickname}}</div>
                <div v-if='!list.nickname' class="nickName">{{list.username}}</div>
                <div class="num">
                  <p v-if='list.openact_status==1'>信用额度：<span>{{list.creditamount}}</span></p>
                  <p v-if='list.openact_status==2' style="color:red">{{list.openact_status_str}}</p>
                  <p v-if='list.openact_status==3' style="color:red">{{list.openact_status_str}}</p>
                </div>
              </div>
              <div class="buy">
                <div class="buy_num">
                  <p class="num1"><span>{{list.shop_total}}</span>笔分期消费</p>
                  <p class="num2">消费总金额：<span>{{list.fqshop_cishu}}</span></p>

                </div>
              </div>
            </li>   
          </ul>

        </div>
      </div>
      
    </div>
    <div class="tips">
      <div class="content" v-show="activeKey">
        您尚未激活信用钱包！
      </div>
    </div>
  </div>
  </transition>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
  	name:'fansdetail',
    data() {
      return {
         activeKey:false,  //判断信用钱包是否激活         
      }
    },
    methods:{
      getDate(){
        $.ajax({
          url:this.BaseURL+'fen/fen_detail',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            date:this.fansDetail.date
          },
          success:(res) => {
            console.log(res);
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getFansDetailistInfo',res);
            }
            setTimeout(function(){ 
                new BScroll(document.getElementById('fansdetail'), { 
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
      getDetail(list){
        if(list.openact_status==1){
          this.$store.dispatch('getConsumeDetailOne',list)
          this.$router.push({path:'/home/fans/fansrebatedetail'});
        }
        
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
      consumeDetailOne:function(){
        this.$store.state.consumeDetailOne
      },
      fansDetail:function(){
        return this.$store.state.fansDetailList;
      },
      fansDetailistInfo:function(){
        return this.$store.state.fansDetailistInfo
      }

    },
    created:function(){
      this.getDate()

    },
    mounted:function(){
      this.checkSystem($('.fansdetail')) 
      
      /*
      let directfanscroll = new BScroll(document.getElementById('fansdetail'), { 
          click:true,
          bounceTime:300,
          swipeBounceTime: 800
        
      })*/
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.fansdetail
  position: absolute
  width 100%
  left 0px
  top 0
  bottom 0
  overflow auto
  -webkit-overflow-scrolling:touch
  .content
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0px;
    top: 221px;
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
        font-size 16px
      .avatar
        width 20%
        float left
        .userImg
          margin 10px auto
          width 40px
          height 40px
          border-radius 100%
          background #ccc
          overflow hidden
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
