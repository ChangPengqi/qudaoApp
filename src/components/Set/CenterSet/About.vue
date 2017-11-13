<template>
  <div class="about">
  <!--   <div class="title">
    <router-link to="/set" class="fa icon-left back" tag="i"></router-link>
    就趣-肆意生活
  </div> -->
    <div class="main" id='about'>
      <p>河南九七实业集团成立于2014年，是一家集互联网电商、房地产、金融、餐饮、影视、文化传媒、高档娱乐等于一体的多元化综合性集团公司。</p>
      <p>集团公司于2016年成立北京分公司——北京就趣互联网有限公司，注册资金10000万。就趣购是一家专注于年轻人分期购物的B2B2C在线商城，主营商品为国内外一，二线品牌，平台定位于手机数码，智能家具，服装配饰，洗护美妆，鞋靴箱包，运动户外，钟表奢品，潮品玩物，同城服务等。</p>
      <p>我们的使命就是让年轻人梦想触手可及，享受品质生活!</p>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
  name: 'about',
  data () {
    return {
     
    }
  },
  methods:{
   /* initScroll(){
      new BScroll(document.getElementById('about'),{})
    }*/
  },
  mounted:function(){
   /* this.checkSystem($('.about'))
    this.initScroll()*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../../common/index.styl"

.about
  position: absolute
  top 0
  left 0
  right 0px
  bottom 0
  background #eee
  .title
    position: absolute
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
    position: absolute
    top 0
    left 0
    bottom 0
    overflow: auto
    -webkit-overflow-scrolling:touch
    padding 20px 15px 50px
    background #fff
    overflow auto
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    p
      text-indent: 2em
      margin-bottom 10px
      line-height 1.8
      font-size 14px
      letter-spacing:1px
      font-weight 400
</style>
