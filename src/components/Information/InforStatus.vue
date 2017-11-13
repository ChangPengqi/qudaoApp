<template>  
  <div class="information" id="inforStatus">
   <div class="title">
 	<!--  <a class="back" @click='closeApp' v-show='false' >关闭</a> -->
 	 <i class="back refresh" v-show='showload1' @click='refrash'><img src="./refresh.png" alt="" width="30px"></i>
   <i class="back refresh active" v-show='showload2' ><img src="./refresh.png" alt="" width="30px"></i>

   
 	 
 	<!--  <Icon :class="{back:true, active:isactive}" type="load-d" style='font-size:26px' @click='refrash'>
 		
 	</Icon>  -->
 	 <!-- <Icon class="back active" type="ios-reload" style='font-size:20px'></Icon>  -->
     <!-- <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a> -->
     <span>审查结果</span>
     <a class="close" @click='logOutBox'>退出</a>
   </div>
   <div class="infobox">
       <div class="main" id='information'> 

       	 <el-alert
		    title="消息提示"
		    :type="msgType"
		    :description="message"
		    show-icon :closable='bool'  
		    close-text='返回'
		    @close='back'
		    >

		  </el-alert> 
      </div>   
   </div>
   <!-- //关闭app的提示 -->
   <div class="dialog-wrap" v-show="dialog">
          <div class="mark"></div>
          <div class="dialog">
            <div class="dtitle">确定退出APP吗？</div>
            <div class="btnGrounp">
              <button class="no" @click='removeNo'>取消</button>
              <button class="yes" @click='exitApp'>确定</button>
            </div>
          </div>
      </div> 
    <!-- //退出账号的提示 -->
     <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <div class="confirmOut" v-show="logOutKey">
        
        <div class="buttonGroup">
          <button class="btn yes_btn" @click="logOut">确定</button>
          <button class="btn" @click="cancel">取消</button>
        </div>
      </div>
    </transition>
    <div class="mark" v-show="logOutKey"></div>
   </div>
   
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'information',
    data() {
      return {
      	showload1:true,
      	showload2:false,
      	deviceType:false,
      	logOutKey:false,
      	bool:false,
      	dialog:false,
      	message:'',
      	msgType:'',
      	showMsg:false
        
      }
    },
    computed:{

    },
    mounted:function(){
      this.checkSystem($('.information'))       
    },
    created:function(){
       this.getdData(localStorage.getItem('token')) 
       
    },
    methods:{
    refrash(){	
    	var that=this
    	that.showload1=false
    	that.showload2=true 
    	setTimeout(()=>{
       that.$message({
              message: '刷新成功',
              type: 'success',
              duration:1000,
              iconClass:'el-icon-circle-check'
        });
       if(localStorage.getItem('token')){
        that.getdData(localStorage.getItem('token'))
       }else{
          that.$router.push({path:'/home'})
       }
    			
    	},1000)    
    },
    back(){
    	this.$router.push({path:'/information'})
    	
    },	
    logOut(){
      this.$router.push({path:'/home'})
      /*if(localStorage.getItem('token')){
        $.ajax({
          url:this.BaseURL+'Login/loginout',
          type:'post',
          data:{
            token:localStorage.getItem('token')
          },
          success:(res) => {
            //清除storage 跳转登录页
              console.log(res)
              localStorage.removeItem('token');
              this.$router.push({path:"/login"})
              
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        });
      }else{
        this.$router.push({path:'/login'})
      }*/
        
    },
    logOutBox() {
      this.logOutKey=true;      
    },
    cancel(){
      this.logOutKey=false;
    },
      removeNo(){
      	this.dialog=false
      },
      exitApp(){
        navigator.app.exitApp()
      },
      closeApp(){
      	this.dialog=true;
      },
   	  getdData(token){
      var  that=this;
        $.ajax({
          url: that.BaseURL+'/Qualification/qualificationStatus',
          type: 'post',
          dataType: 'json',
          data: {token: token},
          success:function(res){
            if(res.qualificationstatus==1){
            	that.showload1=true
    			    that.showload2=false
            	that.msgType='info';
            	that.message='您提交的资料正在审核中,请耐心等待...'                  
            }else if(res.qualificationstatus==2){
            	that.showload1=true
        			that.showload2=false
        			that.$router.push({path:'/home'})
            }else if(res.qualificationstatus==3){
            	that.showload1=true
    			    that.showload2=false
            	that.bool=true;
            	that.msgType='error';
            	that.message="您提交的资料审核失败,请返回修改...";
            	that.showMsg=true            
            }/*else if(res.qualificationstatus==4){
            	that.showload1=true
    			    that.showload2=false
              that.bool=true;
            	that.msgType='warning';
            	that.message='您提交的资料曾经代理,请返回修改...'
            }else if(res.qualificationstatus==5){
            	that.showload1=true
    			that.showload2=false
            	that.bool=true;
              that.bool=true;
            	that.msgType='warning';
            	that.message='您还没有提交任何资料待,请返回填写...'
            	that.showMsg=true
            }*//*else{
                that.$router.push({path:'/home'})
            }*/
          },
          error:function(){}
        })     
      },
    }       
}
</script>
<style>
@keyframes refresh {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

.refresh.active img{
	animation: refresh 1s linear infinite;
}
.el-alert__icon.is-big{
  width:40px;
  font-size: 40px
}
.el-alert__title.is-bold{
  font-size: 16px
}
.el-alert__content{
  line-height: 24px
}
#inforStatus .el-alert{
    margin-top:80%; 
    padding:30px 20px
}
.ion-refresh:before {
    content: "\f21c";
}
.el-message{
  min-width: 100px
}
.el-message__group p{
  font-size: 12px
}
.el-alert .el-alert__description{
  font-size: 14px
}

	
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.information
  position: absolute
  top 0
  left 0
  width 100%
  bottom 0
  background #fff
  .el-alert__icon.is-big
  	font-size 28px
  	width 100px
  .back 
    position: absolute
    top 10px
    left 0
    font-size 14px
    width $barHeight
    line-height $barHeight
    color #fff
  .infobox
    width 80%
    padding 0 10%
  
  .title
    position fixed
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 400
    z-index 100
    .close
    	color #fff
    	position absolute
    	right 10px
    	font-size 18px
  .confirmOut
    position: fixed
    bottom 0
    width 100%
    z-index 10
    height 100px
    text-align center
    font-size 16px
    font-weight 500
    background #fff

    .tit
      margin-top 15px
      // margin-bottom 10px
      padding-bottom 15px
      border-1px(#eee)
    .buttonGroup
      background #eee
      .btn
        display block
        width 100%
        border none
        outline none
        height 50px
        font-size 15px
        background #fff
        &.yes_btn
          color #f00
          border-1px(#eee)
  .mark
    position: fixed
    top 0 
    right 0
    left 0
    bottom 0
    background rgba(0, 0, 0, .3)
  .dialog-wrap
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    .mark
      position:absolute;
      width: 100%
      top 0
      bottom 0
      background rgba(0, 0, 0, .4)
    .dialog
      position: absolute
      width 80%
      height 110px
      top: 40%;
      margin-left 10%
      border-radius 4px
      background #fff
      overflow hidden
      .dtitle
        width 100%
        height 60px
        font-size 18px
        font-weight 400
        line-height 60px
        background #fff
        color #333
        text-align center
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

</style>
