<template>
<transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
  <div class="my">
    <div class="title">
    <router-link to="/home" class="fa icon-left back" tag="i"></router-link>
      我的
    </div>
    <div id="mainWrapper">
      <div class="main" id="main">
        <div class="infos">
          <div class="head">个人信息</div>
          <div class="infosWrap">
            <div class="avatarBox">
              <div class="text"><span class="text">头像</span></div>
              <div class="avatar">
                <img v-if='avatar' :src='avatar' width="45" height="45">
                <img v-if='!avatar' src='./default.png' width="45" height="45">
              </div>             
            </div>
            <div class="area">
              <span class="text">服务区域</span> &nbsp;&nbsp;{{area}}
            </div>
            <div class="name">
              <span class="text">公司名称</span> &nbsp;&nbsp;{{company}}
            </div>
            <div class="registration">
              <span class="text">注册地</span> &nbsp;&nbsp;{{rege_address}}
            </div>
            <div class="person">
              <span class="text">法人</span> &nbsp;&nbsp;{{compy_user}}
            </div>
          </div>
        </div>
        <div class="contact">
          <div class="head"><span class="text">联系方式</span></div>
          <div class="contactBox">
            <div class="mail"><span class="text">邮箱</span> &nbsp;&nbsp;{{email}}</div>
            <div class="tel"><span class="text">固定电话</span> &nbsp;&nbsp;{{mobile}}</div>
            <div class="phone"><span class="text">手机</span> &nbsp;&nbsp;{{tel}}
                  <div style='position:absolute; width:100%; height:100%; background:#fff; opacity:0; left:0; top:0'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <w-footer></w-footer>
  </div>
</transition>
</template>
<script>
// import UpAvatar from '../UpAvatar/UpAvatar'
import BScroll from 'better-scroll'
import Footer from '../Footer/Footer'

export default {
  name: 'my',
  components: {
    'w-footer':Footer
  },
  data () {
    return {
     
    }
  },
  mounted:function(){
    this.checkSystem($('.my'))
    let myscroll = new BScroll(document.getElementById('mainWrapper'), {
        // click:true
      });
  },
  methods: {
    imageUploaded(res) {
      
    },
   
  },
  computed:{
    avatar:function(){
      return this.$store.state.myinfo.touxiang;
    },
    area:function(){
      return this.$store.state.homeinfo.channel_name;
    },
    company:function(){
      return this.$store.state.myinfo.company;
    },
    rege_address:function(){
      return this.$store.state.myinfo.rege_address;
    },
    compy_user:function(){
      return this.$store.state.myinfo.compy_user;
    },
    email:function(){
      return this.$store.state.myinfo.email;
    },
    mobile:function(){
      return this.$store.state.myinfo.mobile;
    },
    tel:function(){
      return this.$store.state.myinfo.tel;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"

.my
  position: fixed
  top 0
  left 0
  right 0px
  // bottom 60px
  background #eee
  .title
    position: relative
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    font-size 18px
    font-weight 400
    color #fff
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
  #mainWrapper
    width 100%
    position: fixed
    z-index: 30
    top 70px
    left 0
    width 100%
    bottom 60px
    overflow auto
    .main
      width 100%
      .infos,.contact
        width 100%
        .head
          width 100%
          height 40px
          line-height 40px
          text-indent 15px
          font-size 16px
          font-weight 500
        .infosWrap,.contactBox
          width 100%
          .avatarBox
            position: relative
            width 100%
            height 60px
            padding-left 15px
            line-height 60px
            font-size 14px
            font-weight 500
            border-1px(#eee)
            background #fff
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            .text
              vertical-align top
              opacity 0.8
              font-size 15px
              display inline-block
            .avatar
              position: absolute
              right 20px
              margin-top 8px
              display inline-block
              width 45px
              height 45px
              border-radius 50%
              overflow hidden
            .up-avatar
              display inline-block
              font-size 10px
              position: absolute
              z-index 50
              width 100%
              height 100%
              right: 0px;
              bottom: 0px
              color rgba(0,0,0,0)
              // background #f00
          .name,.introduction,.registration,.person,.mail,.tel,.phone,.area
            width 100%
            line-height 60px
            height 60px
            background #fff
            border-1px(#eee)
            font-size 14px
            font-weight 500
            padding-left 15px
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            .text
              opacity 0.7
              font-size 15px
          .introduction
            height auto
            line-height 1.8
            padding 10px 15px
          .mail,.tel,.phone
            position: relative
            .write
              position: absolute
              line-height: 40px;
              right 30px
</style>
