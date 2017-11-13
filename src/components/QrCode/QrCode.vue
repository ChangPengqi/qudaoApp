<template>
<transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
  <div class="qrcode">
     <div class="mark" v-show="markKey"></div>
     <div class="title">
       <router-link to="/home" class="fa icon-left back" ></router-link tag="i">
      扫码返利趣不停
      <span class="icon share" @click="openShare"></span>
      <!-- --><span class="icon load" @click="downloadFile"></span> 
      <!-- <span class="icon load" @click="openLoad()"></span> -->
     </div> 
     <div class="qrcodeWrap">
        <img :src="qrcodeUrl"  class="img" width="200" > 
        <p>扫一扫</p>
        <p>快来加入我们吧~</p>      
     </div>
     <div class="dialog-wrap" v-show="dialog">
          <div class="mark"></div>
          <div class="dialog">
            <div class="title">文件下载成功,文件保存位置{{fileUrl}}</div>
            
            <div class="btnGrounp">
              <button class="yes" @click='confirm()'>确定</button>
            </div>
          </div>
      </div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
       <div class="shareBox animated" v-show="shareKey">
         <div class="row">
           <div class="item">
             <div class="icon icon_1"></div>
             <div class="text">就趣</div>
           </div>
           <div class="item">
             <div class="icon icon_2"></div>
             <div class="text">微信好友</div>
           </div>
           <div class="item">
             <div class="icon icon_3"></div>
             <div class="text">QQ</div>
           </div>
           <div class="item">
             <div class="icon icon_4"></div>
             <div class="text">空间</div>
           </div>
         </div>
         <div class="row">
           <div class="item">
             <div class="icon icon_5"></div>
             <div class="text">新浪</div>
           </div>
           <div class="item">
             <div class="icon icon_6"></div>
             <div class="text">朋友圈</div>
           </div>
           <div class="item">
             <div class="icon icon_7"></div>
             <div class="text">信息</div>
           </div>
           <div class="item">
             <div class="icon icon_8"></div>
             <div class="text">复制</div>
           </div>
         </div>
         
         <div class="closeShare">
           <span class="close" @click="closeShare"></span>
         </div>
       </div>
    </transition>
  </div>
  </transition>
</template>
<script>

export default {
	name:'qrcode',
    data() {
      return {
        dialog:false,
        fileUrl:'',
        shareKey:false,
        markKey:false
      }
    },
    created:function(){
      this.getData();
    },
    computed:{
      qrcodeUrl:function(){
        return this.$store.state.qrcode;
      }
    },
    methods:{
      downloadFile() {
        var _this=this;
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(this.qrcodeUrl);
        var fileURL =  "///storage/emulated/0/DCIM/qrcode.jpg";
        var u = navigator.userAgent;
            if(u.indexOf('iPhone') > -1){
              fileURL=cordova.file.documentsDirectory + "qrcode.jpg";
            /*  fileURL="cdvfile://localhost/persistent/"*/
            }
            fileTransfer.download(
            uri, fileURL, function(entry) {
            var src=entry.toURL();
            _this.dialog=true;
            if(u.indexOf('iPhone') > -1){
              _this.fileUrl=src.substring(src.indexOf('Documents'))
              
            }else{
              _this.fileUrl=src.substring(src.indexOf('DCIM'))
            }
              
            
            //console.log("download complete: " + entry.toURL());
          },
        
          function(error) {
             console.log("download error source " + error.source);
             console.log("download error target " + error.target);
             console.log("download error code" + error.code);
          },
        
          false, {
             headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
             }
          }
       );
      },
      confirm(){
        this.dialog=false
      },
      openShare(){
        window.plugins.socialsharing.share(null, null, 'http://tp.jqugo.com/default/ticket_b_188.jpg', null)
       /* this.shareKey=true;
        this.markKey=true*/
      },
      closeShare(){
       /* this.shareKey=false;
        this.markKey=false*/
      },

      shareQQ(){

      },
      /*openLoad() {
        this.$router.push({path:'/home/qrcode/qrcodeload'})
      },*/
      getData(id){
         $.ajax({
          url:this.BaseURL+'/Qrcode/get_qrcode',
          type:'get',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
            console.log(res);
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getQrcodeInfo',res.info);
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
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
  height 100vh
  .mark
    position: absolute
    z-index 10
    top 0
    left 0
    right 0px
    bottom 0
    background rgba(0, 0, 0, .6)
  .dialog-wrap
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    .mark
      position:absolute;
      width: 100%
      top 0
      bottom 0
      background rgba(0, 0, 0, .4)
      z-index 1
    .dialog
      position: absolute
      width 80%
      height 130px
      top: 40%;
      margin-left 10%
      border-radius 4px
      background #fff
      overflow hidden
      z-index 10
      .title
        width 100%
        height 60px
        line-height 30px
        background #fff
        color #333
        padding 10px 0
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
    .icon
      position: absolute
      margin-top 13px
      display inline-block
      line-height $barHeight
      width 40px
      height 19px
      &.share
        right 40px
        background url('./share.png') center center no-repeat
        background-size 20px 19px
      &.load
        right 0
        background url('./load.png') center center no-repeat
        background-size 20px 19px
  .qrcodeWrap
    width 300px
    height 400px
    position relative
    top 50%
    margin 0 auto 
    margin-top -250px
    background #fff
    border-radius 20px
    box-shadow 0 0 10px #dedede
    p
      height 40px 
      line-height 40px
      font-size 16px
      text-align center
      font-weight bold
      color #6E6E6E
    .img
      position relative
      top 50px
      left 50px
      margin-bottom 50px
      

     

      // -webkit-transform: translateX(-50%);
      // -moz-transform: translateX(-50%);
      // -ms-transform: translateX(-50%);
      // -o-transform: translateX(-50%);
      // transform: translateX(-50%);
      // max-height 38%
      // max-width 38%
      // min-width 80px
      // min-height 80px
  .shareBox
    position: absolute
    z-index 20
    bottom 0
    width 100%    
    margin 0 auto
    height 260px
    background #fff
    .row 
      display flex
      .item
        flex 1
        text-align center
        margin-top 18px
        .icon
          display inline-block
          width 50px 
          height 50px
          &.icon_1
            background url(./img01.png) no-repeat
            background-size 50px 50px
          &.icon_2
            background url(./img02.png) no-repeat
            background-size 50px 50px
          &.icon_3
            background url(./img03.png) no-repeat
            background-size 50px 50px
          &.icon_4
            background url(./img04.png) no-repeat
            background-size 50px 50px
          &.icon_5
            background url(./img05.png) no-repeat
            background-size 50px 50px
          &.icon_6
            background url(./img06.png) no-repeat
            background-size 50px 50px
          &.icon_7
            background url(./img07.png) no-repeat
            background-size 50px 50px
          &.icon_8
            background url(./img08.png) no-repeat
            background-size 50px 50px
        .text
          margin-top 6px
          font-size 13px
          font-weight 500
    .closeShare
      width 100%
      text-align center
      margin-top 30px
      .close
        display inline-block
        width 35px
        height 35px
        background url(./close.png) no-repeat
        background-size 35px 35px
</style>
