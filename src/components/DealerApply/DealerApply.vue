<template>
  <div class="dealerApply">
    <div class="title">
      <router-link to="/home/countyDealer" class="fa icon-left back"></router-link>
      <span>申请</span>
    </div>
    <div class="main">
      <form ref="form">
        <div class="upImg">
          <div class="item">
            <div class="img">
              <img :src="src1" width="100%" height="100%">
            </div>
            <label for="upImg1" class="upImgBtn">
              <div class="plus">+</div>
              <div class="text">上传身份证正面</div>
            </label>
            <input type="file"  name="photo1" id='upImg1' v-on:change="preImg1($event)">
          </div>
          <div class="item">
            <div class="img">
              <img :src="src2" width="100%" height="100%">
            </div>
            <label for="upImg2" class="upImgBtn">
              <div class="plus">+</div>
              <div class="text">上传身份证反面</div>
            </label>
            <input type="file"  name="photo2" id='upImg2' v-on:change="preImg2($event)">
          </div>
          <div class="item">
            <div class="img">
              <img :src="src3" width="100%" height="100%">
            </div>
            <label for="upImg3" class="upImgBtn">
              <div class="plus">+</div>
              <div class="text">上传营业执照</div>
            </label>
            <input type="file"  name="photo3" id='upImg3' v-on:change="preImg3($event)">
          </div>  
        </div>
        <div class="msg" v-if="msgKey1">{{message1}}</div>
        <div class="inputBox">
          <p class="list"><span class="label">联系人</span><input id="username" class="ipt" type="text" name="username" v-model="user"></p>
          <div class="msg" v-if="msgKey2">{{message2}}</div>
          <p class="list"><span class="label">联系电话</span><input id='tel' class="ipt" type="tel" name="tel" v-model="tel"></p>
          <div class="msg" v-if="msgKey3">{{message3}}</div>
          <p class="list"><span class="label">代理区域</span>
            <select class="ipt select" name="area" id='area' v-model="areaid" >
               <option v-for="list of areaList" :value='list.id'>{{list.name}}</option>
            </select>
          </p>
          <div class="msg" v-if="msgKey4" style='padding-bottom:20px'>{{message4}}</div>
        </div>
          
      </form>
    </div>
    <div class="btn" >
      <button class="submitBtn" @click="submit(event)">提交</button>
    </div>
    <div class="dialog" v-show="tipsKey">
      {{msg}}
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import imgPreview from "./imgPreview.js"
export default {
  	name:'dealerApply',
    data() {
      return {
        src1:'',
        src2:'',
        src3:'',
        areaList:[],
        user:'',
        tel:'',
        areaid:'',
        msg:'',
        msgKey1:false,
        msgKey2:false,
        msgKey3:false,
        msgKey4:false,
        message1:'',
        message2:'',
        message3:'',
        message4:'',
        tipsKey:false
       }
    },
    components:{
      
    },
    methods:{
      preImg1:function($event){
        this.$emit('change', $event.target.value)
        var that=this;
        this.fileToUrl(function(url){
          that.src1=url;
        })
        
      },
      preImg2:function($event){
        this.$emit('change', $event.target.value)
        var that=this;
        this.fileToUrl(function(url){
          that.src2=url;
        })
      },
      preImg3:function($event){
        // this.$emit('change', $event.target.value)
        var that=this;
        this.fileToUrl(function(url){
          that.src3=url;
        })
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
      checkPhoneNum(num){
        var reg =/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;  
        if(!reg.test($.trim(num))){  
          return false  
        }else{  
           return true  
        }

      },
      submit(event) {
    
        var form = this.$refs.form;
        var formdata=new FormData(form);
        formdata.append('token',localStorage.getItem('token'));
        var that=this;
        //所有字段必须填写
        if(!this.src1 || !this.src2 || !this.src3 ){
          this.msgKey1=true;
          this.message1="请上传完整的身份信息";
        }else if(!this.user){
          this.msgKey2=true;
          this.message2='联系人不能为空'
        }else if(!this.checkPhoneNum(this.tel)){
          this.msgKey3=true;
          this.message3='手机号码格式不正确'
        }else if(!this.areaid){
          this.msgKey4=true;
          this.message4='区县选择不能为空'
        }else{
            this.sendData(formdata);
        }
        setTimeout(function(){
          that.msgKey1=false;
          that.msgKey2=false;
          that.msgKey3=false;
          that.msgKey4=false;
          that.message1='';
          that.message2='';
          that.message3='';
          that.message4='';
        },2000)       
      },
      sendData(data) {
        /*$.ajax({
          url:that.BaseURL+'Countydeal/apply_county',
          type:'post',
          data:{
            token:localStorage.getItem('token')
          },
          success:(res) => {}
        })*/
            console.log(data)
            var that=this;
            $.ajax({
              url:this.BaseURL+'Countydeal/apply_county',
              type:'post',
              processData:false,
              contentType:false,
              data:data,
              success:(res) => {
                // console.log(res)
                if(res.status== 1){
                  this.tipsKey=true;
                  this.msg=res.info;
                  $('.submitBtn').attr('disabled','true')
                  setTimeout(function(){
                    that.$router.push({path:'/home/countyDealer'})
                    that.init();
                    $('.submitBtn').removeAttr('disabled')
                  },1500)
                }
              }
            }) 
          
        
      },
      //清空字段值
      init() {
        this.src1='';
        this.src2='';
        this.src3='';
        this.user='';
        this.tel='';
        this.areaid='';
      }
    },
    created:function(){
      $.ajax({
          url:this.BaseURL+'Countydeal/getRegionArea',
          method:'get',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
            console.log(res);
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
                this.areaList=res;
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
    },
    mounted:function(){
      this.checkSystem($('.dealerApply'))
     
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.dealerApply
  position: absolute
  top 0
  left 0
  right 0px
  bottom 0
  background #eee
  
  .msg
    color:red
    margin-top:20px; 
    text-align:center;
    margin-bottom 20px 
  .title
    position: absolute
    width 100%
    height $barHeight
    top: 0
    left: 0
    line-height $barHeight
    text-align center
    border-1px(#a9676c)
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
  .main
    width 100%
  
    .upImg
      display flex
      width 100%
      height 150px
      background $mainColor
      .item
        position: relative
        flex 1
        margin 10px 5px
        text-align center
        color #fff
        font-size 10px
        border-radius 6px
        background #c16669
        .img
          width 80%
          // background #f0f
          border 1px dashed #eee
          height 85px
          margin 10px auto 
          outline none
          overflow hidden
        .upImgBtn
          position: absolute
          z-index 10
          display block
          top 0
          padding-top 100px
          left 0
          right 0
          bottom 0
          .plus
            font-size 14px
        #upImg1,#upImg2,#upImg3
          visibility hidden
          width 100%
    .inputBox
      width 100%
      margin-top 5px
      background #fff
      .list
        display flex
        height 60px
        line-height 60px
        padding-left 20px
        border-1px(#eee)
        .label
          display inline-block
          width 90px
          font-size 15px
          font-weight 500
        .ipt
          width 100%
          height 30px
          padding 14px 0
          line-height 58px
          border none
          margin-right 15px
          outline none
          font-size 18px
          &.select
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;
            -ms-appearance:none;
            option
              padding: 10px 0 0 0
  .btn
    width 90%
    margin 0 auto
    margin-top 30px
    height $buttonHeight
    line-height $buttonHeight
    .submitBtn
      width 100%
      height $buttonHeight
      line-height $buttonHeight
      border none
      outline none
      background $mainColor
      color #fff
      font-size 16px
      border-radius 6px
      &:active
        background #942024
    .submitBtn[disabled]
      cursor: not-allowed;
      -webkit-box-shadow: none;
      box-shadow: none;
      opacity: .65;
  .dialog
    position: absolute
    width 260px
    height 80px
    top 50%
    left 50%
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin 0 auto
    line-height 80px
    border-radius 6px
    text-align center
    color #fff
    font-size 18px
    font-weight 400
    background rgba(0, 0, 0, .75)
</style>
