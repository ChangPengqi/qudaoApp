<template>
<transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
  <div class="msgs">
    <div class="title">
      <router-link to="/home" class="fa icon-left back" tag="i"></router-link>
      消息
    </div>
    <div class="main" id="msgWrapper">
      <div class="item" @click="goNotice">
        <div class="img">
          <img src="./news.png" width="30" height="30">
        </div>
        <div class="text">
          消息通知
        </div>
        <div class="go">
          <i class="icon-right"></i>
        </div>
      </div>
      <div class="item" @click="goHeadlines">
        <div class="img">
          <img src="./titleNews.png" width="30" height="30">
        </div>
        <div class="text">
          就趣头条
        </div>
        <div class="go">
          <i class="icon-right"></i>
        </div>
      </div>
      <div class="item" @click="goCustomerService">
        <div class="img">
          <img src="./customer.png" width="30" height="30">
        </div>
        <div class="text">
          客服
        </div>
        <div class="go">
          <i class="icon-right"></i>
        </div>
      </div>
    </div>
    <div class="dialog-wrap" v-show="dialog">
          <div class="mark"></div>
          <div class="dialog">
            <div class="dtitle">是否拨打客服电话</br>400-000-1517</div>
            <div class="btnGrounp">
              <button class="no" @click='removeNo()'>取消</button>
              <button class="yes" @click='exitApp()'><a href="tel:400-000-1517">确定</a></button>
            </div>
          </div>
    </div> 
    
    <w-footer></w-footer>
  </div>
</transition>
</template>

<script>
import BScroll from 'better-scroll'
import Footer from '../Footer/Footer'
export default {
  name: 'msgs',
  components:{
    'w-footer':Footer
  },
  data () {
    return {
      dialog:false
     
    }
  },
  mounted:function(){
    this.checkSystem($('.msgs'))
     let msgscroll = new BScroll(document.getElementById('msgWrapper'), {
        click:true
      })
  },
  methods:{
    goNotice(){
      this.$router.push({path:'/msgs/notice'})
    },
    goHeadlines(){
      this.$router.push({path:'/msgs/headlines'})
    },
    goCustomerService(){
      this.dialog=true
      //this.$router.push({path:'/msgs/customerservice'})
    },
    removeNo(){
      this.dialog=false
    },
    exitApp(){
      var _this=this
      setTimeout(function(){
        _this.dialog=false
      },1000)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.msgs
  position:absolute;
  top 0
  left 0
  width 100%
  bottom 60px
  background #fff
  .dialog-wrap
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    .mark
      position:absolute;
      width: 100%
      top 0
      bottom 0
      background rgba(0, 0, 0, .4)
    .dialog
      position: absolute
      width 80%
      height 150px
      top: 40%;
      margin-left 10%
      border-radius 4px
      background #fff
      overflow hidden
      .dtitle
        width 100%
        height 80px
        font-size 18px
        font-weight 400
        line-height 30px
        background #fff
        color #333
        padding-top 20px
        text-align center
        border-bottom 1px solid #eee
      .btnGrounp
        display flex
        button
          flex 1
          height 50px
          border none
          font-size 15px
          background #fff
          &:first-child
            border-right 1px solid #eee
          &:active
            background #c81623
            color #fff
  .title
    position: relative;
    top 0
    left 0
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    color #fff
    background $mainColor
    font-size 18px
    font-weight 400
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
  .main
    width 100%
    background #fff
    .item
      display flex
      height 60px
      line-height: 60px;
      font-size: 15px
      font-weight 500
      border-1px(#eee)
      &:active
        background rgba(0, 0, 0, .2)
      .img
        margin-left 20px
        vertical-align top
        line-height 60px
        width 30px
        height 30px
        border-radius 50%
        margin-top 10px
        margin-right 10px
      .text 
        vertical-align top
        flex 1
      .go 
        flex 1
        text-align right
        margin-right 20px
        opacity 0.7
</style>
