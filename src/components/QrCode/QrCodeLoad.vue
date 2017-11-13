<template>
  <div class="qrcode">
     <div class="mark" v-show="markKey"></div>
     <div class="title">
       <router-link to="/home/qrcode" class="fa icon-left back" ></router-link tag="i">
      下载二维码
     </div>
     <div class="loadBox">
       <ul>
          <li class="list_head">
            <div class="item">二维码边长</div>
            <div class="item">建议扫描距离</div>
            <div class="item">下载链接</div>
          </li>
          <li v-for='list of loadList' class="list" @click="openLoad">
            <div class="item">{{list.side}} cm</div>
            <div class="item">{{list.distance}} m</div>
            <div class="item"><span class="loadicon"></span></div>
          </li>
       </ul>
     </div> 
     <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
       <div class="fileLoad" v-show="loadKey">
         <div class="head">文件下载</div>
         <div class="text">
           <div class="filename">名称：推广二维码</div>
           <div class="filesize">大小：12K <span class="path">更改路径</span></div>
         </div>
         <div class="btnGroup">
           <button class="btn canel" @click="cancelLoad">取消</button>
           <button class="btn confirm">确认</button>
         </div>
       </div>
      </transition>
  </div>
</template>
<script>

export default {
	name:'qrcode',
    data() {
      return {
        markKey:false,
        loadKey:false,
        loadList:[
          {side:8,distance:0.5},
          {side:12,distance:0.8},
          {side:15,distance:1},
          {side:30,distance:1.5},
          {side:50,distance:2.5},         
        ]
      }
    },
    methods:{
      openLoad(){
        this.loadKey=true;
        this.markKey=true
      },
      cancelLoad() {
        this.loadKey=false;
        this.markKey=false
      }
    },
    mounted:function(){
      this.checkSystem($('.qrcode'))
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.qrcode
  position: fixed
  left 0px
  top 0
  width 100%
  bottom 0px
  background #eee
  .mark
    position: absolute
    z-index 10
    top 0
    left 0
    right 0px
    bottom 0
    background rgba(0, 0, 0, .6)
  .title
    position: relative
    width 100%
    height  $barHeight
    line-height $barHeight
    font-size 16px
    font-weight 300
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
  .loadBox
    width 100%
    margin-top 10px
    background #fff
    .list_head
      display flex
      border-1px(#eee) 
      .item
        flex 1
        text-align center
        height 60px
        line-height: 60px
        font-size 16px
        font-weight 500
    .list
      display flex
      height 50px
      line-height 50px
      font-size 15px
      font-weight 400
      border-1px(#eee)
      &:active
        background rgba(0, 0, 0, .2)
      .item
        flex 1
        text-align center
        .loadicon
          vertical-align middle
          display inline-block
          width 50px   
          height 23px
          background url(./codeload.png) no-repeat center center
          background-size 20px 22px
  .fileLoad
    position: relative
    z-index 10
    width 280px
    margin 0 auto
    height 160px
    top -200px
    border-radius 6px
    background #fff
    overflow hidden
    .head
      font-size 16px
      font-weight 500
      line-height 40px
      text-align center
      border-1px(#eee)
    .text
      margin 15px 0 0 20px
      font-size 14px
      font-weight 500
      .filename
        margin-bottom 15px
      .filesize
        .path
          margin-left 110px
          color #00a0e9
          font-size 13px
          font-weight 500
    .btnGroup
      display flex 
      margin 18px
      .btn
        flex 1
        height 36px
        line-height 36px
        border 0
        background $mainColor
        outline none
        color #fff
        border-radius 6px
        &.canel
          margin-right 10px
</style>
