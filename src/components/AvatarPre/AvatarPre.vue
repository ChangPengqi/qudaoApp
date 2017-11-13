<template>
  <div class="avatarpre">
    <div class="title">
      <router-link to="/set/person" class="fa icon-left back" tag="i"></router-link>
      设置个人头像
    </div>
    <div class="main">
      <div class="imgBox">
        <img v-if='avatar' :src="avatar" width="260" height="260">
        <img v-if='!avatar' src="./default.png" width="260" height="260">
      </div>
      <div class="btn">
        <!-- <up-avatar class="up-avatar" text="上传头像" v-bind:class="['pure-button','pure-button-primary','js-btn-crop']" v-bind:crop="false" url="" extensions="png,gif,jpeg,jpg" v-on:imageuploaded="imageUploaded"></up-avatar> -->
        <form ref='upimg' enctype="multipart/form-data">
          <label class="upImg" for="file">更改头像</label>
          <input type="file" name="avatar" id="file" v-on:change.prevent="preImg($event)">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import UpAvatar from '../UpAvatar/UpAvatar'
// import BScroll from 'better-scroll'
export default {
  name: 'avatarpre',
  components:{
  },
  data () {
    return {
      avatar:''
    }
  },
  created:function(){
    //获取头像url
    this.avatar = this.$store.state.myinfo.touxiang;
  },
  methods:{
    imageUploaded() {
      var form = this.$refs.upimg;
      var input = document.querySelector('input[type="file"]')
      var formdata=new FormData(form);
      formdata.append('token',localStorage.getItem('token'));
      var that=this;
      $.ajax({
        url:that.BaseURL+'Personal/headphoto_upload',
        type:'post',
        processData:false,
        contentType:false,
        data:formdata,
        success:(res) => {
          // console.log(res)
        }
      })
    },
    preImg:function($event){
      this.$emit('change', $event.target.value)
      var that=this;
      this.fileToUrl((url) => {
        this.avatar=url
      });
      this.imageUploaded();
    },
    fileToUrl(callback) {
      let reader=new FileReader();
      let files=event.target.files;
      reader.readAsDataURL(files[0]);
      reader.onload=function(e){
        let url=e.target.result;
        callback(url);
      }
    },
  },
  mounted:function(){
    this.checkSystem($('.avatarpre'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"

.avatarpre
  position: fixed
  top 0
  left 0
  right 0px
  bottom 0
  background #fff
  .title
    position: relative
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight 300
    .back
      position: absolute
      left 0px
      width $barHeight
      line-height: $barHeight;
  .main
    width 100%
    margin-top 30px
    text-align center
    // .imgBox
    //   border 1px solid #eee
    .btn
      width 90%
      margin 30px auto
      background  $mainColor
      height 40px
      line-height 40px
      border-radius 6px
      color #fff
      overflow hidden
      &:active
        background #9c1721
      .upImg
        z-index 10
        display block
        height 40px
      input
        visibility hidden
       
</style>
