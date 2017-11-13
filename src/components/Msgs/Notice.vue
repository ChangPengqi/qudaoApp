<template>
  <div class="notice">
    <div class="title">
      <router-link to="/msgs" class="fa icon-left back" tag="i"></router-link>
      <span>消息通知</span>
    </div>
    <div class="main" id="msgWrapper">
      <div class="item"  v-for="list of content">
        <div class="icon">
          <img src="./tips.png" width="40px" height="40px">
        </div>
        <div class="content">
          <div class="type">{{list.title}}</div>
          <div class="detail">
            {{list.content}}
          </div>
          <div class="time">{{list.addtime | formdata}}</div>
        </div>
      </div>
      <div class="msg" v-if='content.length==0'>暂无数据......</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'notice',
  data () {
    return {
     
    }
  },
  created:function(){
    this.getData();
  },
  mounted:function(){
      this.checkSystem($('.notice'))
     // let msgscroll = new BScroll(document.getElementById('msgWrapper'), {
     //    click:true
     //  })
  },
  computed:{
    content:function(){
      return this.$store.state.jqnotice;
    }
  },
  methods:{
    getData(){
      $.ajax({
        url:this.BaseURL+'Information/info_list',
        type:'get',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          // console.log(res)
          this.$store.dispatch('getJqNoticeInfo',res);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.notice
  position:absolute;
  top 0
  left 0
  width 100%
  bottom 0
  background #fff
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
    position: absolute
    top $barHeight
    bottom 0
    left 0
    overflow: auto
    -webkit-overflow-scrolling:touch
    .msg
      margin 10px 0
      text-align center 
      color $mainColor
    .item
      display flex
      // height 60px
      // line-height: 60px;
      font-size: 15px
      font-weight 500
      border-1px(#eee)
      .icon        
        width 60px
        margin-top 15px
        text-align center
      .content
        flex 1
        vertical-align top
        margin-right 15px
        .type
          font-weight 500
          line-height 20px
          margin-top 10px
        .detail
          line-height: 1.5;
          margin-top: 10px          
          padding 10px
          background #eee
        .time
          line-height 40px
          font-size 13px
</style>
