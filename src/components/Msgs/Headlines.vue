<template>
  <div class="headlines">
    <div class="title">
      <!-- <router-link to="/home" class="fa icon-left back" tag="i"></router-link> -->
      <span class="fa icon-left back" @click='goback()'></span>
      <span>就趣头条</span>
    </div>
    <div class="main" id="headWrapper">
      <div class="item" v-for="(list,index) of jqnews">
        <div class="time">{{list.ctime | formdata}}</div>
        <div class="content" @click="goHeadDeatil(list)">
          <div class="text">{{list.title}}</div>
          <div class="pic">
            <img src="./tuwen.png" width="50px" height="50px">
          </div>
        </div>
      </div>
      <div class="msg" v-if='jqnews.length==0'>暂无数据......</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import Vue from 'vue'
// var formdata=Vue.filter('formdata')
export default {
  name: 'headlines',
  
  data () {
    return {
     
    }
  },
  created:function(){
    this.getData()
  },
  // mounted:function(){
  //    let msgscroll = new BScroll(document.getElementById('headWrapper'), {
  //       click:true
  //     })
  // },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    goHeadDeatil(data){
      this.$store.dispatch('getJqContentInfo',data);
      this.$router.push({path:'/msgs/haadlines/headdetail'})
    },
    getData(){
      $.ajax({
        url:this.BaseURL+'Topline/top_list',
        type:'get',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          console.log(res)
          this.$store.dispatch('getJqNewsInfo',res);
        }
      })
    }
  },
  computed:{
    jqnews:function(){
      return this.$store.state.jqnews
    }
  },
  mounted:function(){
    this.checkSystem($('.headlines'))
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.headlines
  position:fixed;
  top 0
  left 0
  width 100%
  bottom 0
  background #EEE
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
    position: absolute
    top $barHeight 
    left 0
    bottom 0
    right 0
    overflow auto
    -webkit-overflow-scrolling:touch
    .msg
      text-align center
      color $mainColor
      margin 10px 0
    .item
      text-align center
      margin-top 15px
      .time
        margin 8px 0  
      .content
        display flex
        width 90%
        height 50px
        line-height  50px
        margin 8px auto
        background #fff
        padding 8px
        border-radius 4px
        border-1px(#eee)
        &:active
          background rgba(0, 0, 0, .2)
        .text
          flex 1
          text-align left
          line-height value
          font-size 15px
          font-weight 500
          padding-left 10px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .pic
          width 60px
</style>
