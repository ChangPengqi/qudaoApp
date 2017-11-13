<template>
  <div id='person' class="person">
    <div class="title">
      <router-link to="/set" class="icon-left back" tag="i"></router-link>
      个人资料
    </div>
    <div class="main" id="main">
      <div>
        <div class="infos">
        <div class="head">个人信息</div>
        <div class="infosWrap">
          <router-link to="/set/person/avatarpre" class="avatarBox" tag="div">
            <div class="text">头像</div>
            <div class="avatar">
              <img v-if='avatar' :src="avatar" width="45" height="45">
               <img v-if='!avatar' src="./default.png" width="45" height="45">
            </div>
            <i class="fa icon-right "></i>
          </router-link>
          <div class="name">
            公司名称&nbsp;&nbsp; {{company}}
          </div>
         <!--  <div class="introduction">
            公司简介&nbsp;&nbsp; 河南九七实业集团成立于2014年，是一家集互联网电商、房地产、金融、餐饮、影视、文化传媒、高档娱乐等于一体的多元化综合性集团公司。

集团公司于2016年成立北京分公司——北京就趣互联网有限公司，注册资金10000万。就趣购是一家专注于年轻人分期购物的B2B2C在线商城，主营商品为国内外一，二线品牌，平台定位于手机数码，智能家具，服装配饰，洗护美妆，鞋靴箱包，运动户外，钟表奢品，潮品玩物，同城服务等。

我们的使命就是让年轻人梦想触手可及，享受品质生活!
          </div> -->
          <div class="registration">
            注册地&nbsp;&nbsp; {{rege_address}}
          </div>
          <div class="person">
            法人&nbsp;&nbsp; {{compy_user}}
          </div>
        </div>
      </div>
      <div class="contact">
        <div class="head">联系方式</div>
        <div class="contactBox">
          <div class="mail">邮箱&nbsp;&nbsp; {{email}} <!-- <router-link to="/set/person/mail" class="fa fa-pencil-square-o write" aria-hidden="true" tag="i"></router-link> --></div>
          <div class="tel">固定电话&nbsp;&nbsp; {{mobile}} <!-- <router-link to="/set/person/tel" class="fa fa-pencil-square-o write" aria-hidden="true" tag="i"></router-link> --></div>
          <div class="phone">手机&nbsp;&nbsp; {{tel}} <!-- <router-link to="/set/person/phone" class="fa fa-pencil-square-o write" aria-hidden="true" tag="i"></router-link> --></div>
        </div>
      </div>
      </div>
    </div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'person',
  components:{
    
  },
  data () {
    return {
     
    }
  },
  computed:{
    avatar:function(){
      return this.$store.state.myinfo.touxiang;
    },
    company:function(){
      return this.$store.state.myinfo.company;
    },
    company_info:function(){
      return this.$store.state.myinfo.company_info;
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
  },
  created:function(){
    this.getPersonData();
  },
  mounted:function(){
    this.checkSystem($('#person'))
    let Perscroll = new BScroll(document.getElementById('main'), {
        click:true
      })
  },
  methods: {
    getPersonData(){
      $.ajax({
        url:this.BaseURL+'Personal/index',
        type:'get',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          console.log(res);
          if(res.status==-1){
            this.$router.push({path:'/login'})
          }else{
            this.$store.dispatch('getMyInfo',res);
          }
        },
        error:(res) => {
          console.log('Ajax error!')
        } 
      })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.person
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
      left 0px
      width $barHeight
      line-height: $barHeight;
  .main
    width 100%
    position: absolute
    top $barHeight
    left 0
    right 0
    bottom 0
    padding-bottom 60px
    overflow auto
    .infos,.contact
      width 100%
      .head
        width 100%
        height 40px
        line-height 40px
        text-indent 15px
        font-size 14px
        font-weight 500
      .infosWrap,.contactBox
        width 100%
        font-size 12px
        .avatarBox
          position: relative
          z-index 10
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
            display inline-block
          .avatar
            position: absolute
            z-index: 1
            right 60px
            margin-top 8px
            display inline-block
            width 45px
            height 45px
            border-radius 50%
            overflow hidden
          .fa
            position: absolute
            right 20px
            line-height 60px
            &:active
              background rgba(0, 0, 0, .8)
        .name,.introduction,.registration,.person,.mail,.tel,.phone
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
        .introduction
          height auto
          line-height 30px
        .mail,.tel,.phone
          position: relative
          .write
            position: absolute
            right 20px
            text-align right
            line-height 40px
            width 100%
</style>
