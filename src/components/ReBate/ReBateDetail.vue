<template>
<transition
name="custom-classes-transition"
         enter-active-class="animated fadeInRight"
    mode="in-out"

>
  <div class="rebatedetail">
    <div class="title">
      <router-link to="/home/rebate/encouragegold" class="fa icon-left back"></router-link>
      <span>补贴-明细</span>
    </div>
    <div class="main">
      <div class="main_top">
        <div class="tit">{{subsidyInfo.date | changDate}}月补贴总金额</div>
        <div class="money">￥<span>{{subsidydetail.subsidy_mouthnum}}</span></div>
        <div class="active">
          <p>激活信用钱包人数：<span>{{subsidydetail.subsidy_actnum}}</span>人</p>
        </div>
      </div>
      <div class="content">
        <div class="data" id='rebatedetail'>
          <ul>
            <li class="list" v-for='list in subsidydetail.subsidy_list'>
              <div class="date">{{list.ctime | formdata | subStr}}</div>
              <div class="avatar">
                <p class="userImg" v-if='list.vatar'>
                  <img :src="list.vatar" alt="">
                </p>
                <p class="userImg" v-if='! list.vatar'>
                  <img src="./default.png" alt="">
                </p>
              </div>
              <div class="user"> 
                <div class="num">
                  <p><span>{{list.money}}</span></p>
                </div>
                <div class="nickName"><span>{{list.nickname}}</span>-
                <span v-if='list.type==1'>激活信用钱包</span>
                <span v-if='list.type==2'>尚未激活信用钱包</span>
                <span v-if='list.type==3'>尚未申请信用钱包</span>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
      
    </div>
    <!-- <div class="tips">
      <div class="content" v-show="activeKey">
        您尚未激活信用钱包！
      </div>
    </div> -->
  </div>
</transition>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
    name:'rebatedetail',
    data() {
      return {
         activeKey:false,  //判断信用钱包是否激活         
      }
    },
    created:function(){
      this.getData()

    },
     filters:{
      changDate(value){
        return value.split('-')[1]
      },
      subStr(value){
        return value.split(' ')[0].substring(5).replace('/','-')
      }

    },
    methods:{
      getData(){
        $.ajax({
          url:this.BaseURL+'income/subsidy_detail',
          method:'post',
          data:{
            token:localStorage.getItem('token'),
            date:this.subsidyInfo.date
          },
          success:(res) => {
            console.log(res)
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getSubsidydetail',res);
            }
            setTimeout(function(){
             let directfanscroll = new BScroll(document.getElementById('rebatedetail'), { 
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
      }
     
    },
    computed:{
      subsidyInfo:function(){
        return this.$store.state.subsidyInfo;
      },
      subsidydetail:function(){
        return this.$store.state.subsidydetail;
      }
    },
    mounted:function(){
      this.checkSystem($('.rebatedetail'))
       
       
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.rebatedetail
  position: fixed
  top 0
  left 0
  right 0px
  bottom 0
  background #eee
  overflow-x hidden
  overflow-y auto 
  -webkit-overflow-scrolling:touch
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
      height 130px
      background #fff
      text-align center
      border-bottom 1px solid #eee
      .tit
        height 40px
        line-height 40px
      .money
        font-size 20px
        height 50px
        line-height 50px
      .active
        height 40px 
        line-height 40px
        color #706f70
    .content
      position: absolute;
      z-index: 100;
      width: 100%;
      left: 0px;
      top: 181px;
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
      display flex
      width 100%
      height 60px
      line-height 60px
      background #fff
      border-1px(#eee)
      padding 0 15px
      font-size 15px
      font-weight 500
      .date 
        color #ccc
        width 15%
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
          img
            width 40px
            height 40px
            border-radius 100%
            
            


      .user
        width 60%
        float left
        margin-top 10px
        margin-left 5%
        .nickName,.num
          height 20px
          line-height 20px
          font-size 14px
          color #706f70
        .num
          font-size 18px
          color #000
  .tips
    width 100%
    margin-top 30px
    text-align center
    color $mainColor
    font-weight bolder
</style>
