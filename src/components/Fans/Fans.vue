<template>
<transition
        name="custom-classes-transition"
         enter-active-class="animated fadeInRight"
    mode="in-out"

      >
  <div class="fans">
  <!-- <Spin fix v-if='spinshow'></Spin> -->  
    <div class="title">
      <router-link to="/home" class="fa icon-left back" tag="i"></router-link>
      <span>粉丝</span>
    </div>
    <div class="head">
      <div class="text">
        <div class="fanstext">粉丝总人数</div>
        <div class="count">{{fansList.fen_count}}</div>
      </div>
    </div>
    <div class="main">
      <div class="head">
        <div class="item">

              <div class="item_left">
                <div class="fanstext">直属粉丝（人）</div>
                <div class="count">{{fansList.myzsfen_count ? fansList.myzsfen_count : 0}}</div>
              </div>
              <div class="item_right">               
                <router-link to="/home/fans/directfan" tag="div"><p class="btn">查看明细</p></router-link>
              </div>
              <div class="item_bot">
                <div class="item_bot_l">已激活：<span>{{fansList.myzsfen_isactnum ? fansList.myzsfen_isactnum : 0}}</span></div>
                <div class="item_bot_l">未激活：<span>{{fansList.myzsfen_noactnum ? fansList.myzsfen_noactnum : 0}}</span></div>
              </div>
        </div>


        <div  class="item"  v-if='showAreaMana'>

              <div class="item_left">
                <div class="fanstext">县区粉丝（人）</div>
                <div class="count">{{fansList.countyfen_count ? fansList.countyfen_count : 0}}</div>
              </div>
              <div class="item_right">               
                 <router-link to="/home/fans/channelfan"  tag="div"><p class="btn">查看明细</p></router-link>
              </div>
              <div class="item_bot">
                <div class="item_bot_l">已激活：<span>{{fansList.ctfen_isactnum ? fansList.ctfen_isactnum : 0}}</span></div>
                <div class="item_bot_l">未激活：<span>{{fansList.ctfen_noactnum ? fansList.ctfen_noactnum : 0}}</span></div>
              </div>
       </div>
        <!-- <div class="item">详情</div> -->
      </div>

      
    </div>
    
 
  </div>
</transition>
</template>
<script>
// import BScroll from 'better-scroll'
export default {
  	name:'fans',
    data() {
      return {
         flag:true,
         spinshow:true
      }
    },
    methods:{
      
    },
    computed:{
      fansList:function(){
        return this.$store.state.fansList;
      },
      showAreaMana:function(){
        if(this.homeInfo.proxy_level==1){
          return true

        }else{
          return false
        }
      },
      homeInfo:function(){
      return this.$store.state.homeinfo;
      },
    },
    created:function(){
      $.ajax({
        url:this.BaseURL+'fen/fen_index',
        type:'post',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          console.log(res);
          /*this.spinshow=false*/
          this.flag=false;
          if(res.status==-1){
            this.$router.push({path:'/login'})
          }else{
            this.$store.dispatch('getFansInfo',res);
          }
        },
        error:(res) => {
          console.log('Ajax error!')
        } 
      })
    },
    mounted:function(){
      this.checkSystem($('.fans'))          
      
    },
    updated:function(){
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.fans
  position: fixed
  top 0
  left 0
  right 0
  bottom 0
  background #eee
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
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
  .head
    position: relative
    width 100%
    height 150px
    background $mainColor
    color #fff
    .text
      position: absolute
      left 15px
      top 45px
      font-size 12px
      font-weight 500
      .fanstext
        vertical-align bottom
        opacity: 1
        font-size 16px
        margin-bottom 6px
      .count 
        display inline-block
        margin-top 2px
        margin-left 6px
        font-size 50px
  .main
    width 100%
    .head
      display block
      margin 0
      width 100%
      height auto
      line-height 60px
      background #eee
      color #000
      border-1px(#eee)
      .item 
        flex 1
        padding 10px 20px
        height 130px
        margin-top 10px
        text-align center
        font-size 16px
        font-weight 500
        background #fff
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
        .item_bot
          clear both
          width 100%
          height 50px
          font-size 14px 
          .item_bot_l
            line-height 25px
            text-align left
            width 50%
            float left
          .item_bot_r
            line-height 25px
            text-align left
            width 50%
            float right

           
  .detail
    position: absolute
    width 100%
    left 0px
    top 180px
    bottom 0
    overflow auto
  .msg
    text-align center
    line-height 100px
    color $mainColor
</style>
