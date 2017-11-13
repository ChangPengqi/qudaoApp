<template>
  <div class="guide">
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="img img_1">
          <img class="imgWrap" src="./1.jpg" width="100%">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img img_2">
          <img class="imgWrap" src="./2.jpg" width="100%">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img img_3">
          <img class="imgWrap" src="./3.jpg" width="100%">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img img_4">
          <img class="imgWrap" src="./4.jpg" width="100%">
          <button class="goLogin" @click="goLogin">跳过</button>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      swiperOption:{
        notNextTick: true,
        // autoplay: 3000,
        speed:300,
      } 
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  methods:{
    goLogin() {
      this.$router.push({path:'/login'})
    }
  }
}
</script>
<style scoped lang="stylus">
.guide
  position: fixed
  left 0
  right 0
  top 0
  bottom 0
  background #fff
  overflow hidden
  .imgWrap
    display block
    font-size 0
  .goLogin
    position: absolute 
    z-index 100
    top 4%
    right 5%
    background orange
    border none
    outline none
    color #fff
    width 60px
    height 40px
    border-radius 20px
</style>
