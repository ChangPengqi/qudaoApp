<template>
  <div class="chartWrap">
      <div class="img">
        <img src="./news.png" width="42" height="45">
      </div>
      <div class="content">
          <swiper :options="swiperOption">
            <swiper-slide> 
              <p class="list" v-for="list of jqnews"><span class="hot">最热</span>{{list.title}}</p>
             <!--  <p class="list"><span class="new">最新</span>{{list.title}}</p> -->
            </swiper-slide>
            <!-- <swiper-slide>
              <p class="list"><span class="hot">最热</span>好消息！就趣挂牌上市啦！</p>
              <p class="list"><span class="new">最新</span>恭喜北京服务商，本月突破粉丝50万！恭喜北京服务商</p>
            </swiper-slide> -->
          </swiper>
      </div>
      <router-link to="/msgs/headlines" class="hot" tag="div">更多</router-link >
  </div>
</template>
<script>
import Vue from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name:'chartWrap',
  data() {
    return {
        swiperOption:{
          // notNextTick: true,
          autoplay: 3500,
          direction : 'vertical',
          speed:700,
          loop:true
        },
        // swiperSlides:[1,2,3,4,5] 
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  created:function(){
    this.getData();
  },
  computed:{
    jqnews:function(){
      return this.$store.state.jqnews
    }
  },
  methods:{
    getData(){
      $.ajax({
        url:this.BaseURL+'Topline/top_list',
        type:'post',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          // console.log(res)
          this.$store.dispatch('getJqNewsInfo',res);
        }
      })
    }
  },
  mounted:function(){
     this.checkSystem($('.chartWrap'))
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.chartWrap
  display flex
  width 100%
  height 65px
  padding 10px 6px 
  background #fff
  overflow hidden
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; 
  .img
    // flex 1
    width 42px
    height 45px
    padding-right 6px
    border-right 1px solid #eee
  .content
    flex 1
    width 0%
    padding-right 15px
    margin-left 6px
    font-size 14px
    line-height: 1.8;
    color #333
    font-weight 500
    margin-top -4px
    border-right 1px solid #eee
    overflow hidden
    .list
      width 100%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .hot,.new
        color #f00
        padding 1px 3px
        border 1px solid #f00
        border-radius 4px
        margin-right 5px
        font-size 12px
  .hot
    width 30px
    padding-top 15px
    font-size 13px
    font-weight 500
    padding-left 6px
</style>
