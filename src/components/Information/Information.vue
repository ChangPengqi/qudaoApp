<template>
    
  <div class="information" id="information">
  
   <div class="title">
     <!-- <router-link to="/home/cash/withdrawal" class="fa icon-left back"></router-link tag="i"> -->
     <a class="back" @click='closeApp' v-show='false'>取消</a>
     <span>完善信息</span>
     <a class="close" @click='logOutBox'>关闭</a>
   </div>
   <div class="infobox" id='inforbox' >
       <div class="main" >  
           <form ref="form" >
              <!-- <div v-show='false'>
                <div class="tit"> 
                     上传资质（营业执照、法人身份证信息）
                </div>
                <div class="upImg">
                  <div class="item">
                    <div class="img">
                      <img :src="src1" width="100%" height="100%">
                    </div>
                    <label for="upImg1" class="upImgBtn">
                      <div class="plus">+</div>
                      <div class="text">上传身份证正面</div>
                    </label>
                    <input type="file"  name="id_positive" id='upImg1' v-on:change="preImg1($event)">
                  </div>
                  <div class="item">
                    <div class="img">
                      <img :src="src2" width="100%" height="100%">
                    </div>
                    <label for="upImg2" class="upImgBtn">
                      <div class="plus">+</div>
                      <div class="text">上传身份证反面</div>
                    </label>
                    <input type="file"  name="id_opposite" id='upImg2' v-on:change="preImg2($event)">
                  </div>
                  <div class="item">
                    <div class="img">
                      <img :src="src3" width="100%" height="100%">
                    </div>
                    <label for="upImg3" class="upImgBtn">
                      <div class="plus">+</div>
                      <div class="text">上传营业执照</div>
                    </label>
                    <input type="file"  name="bus_image" id='upImg3' v-on:change="preImg3($event)">
                  </div>               
                </div>
                <div class="tip">  
                     <p>请保证上传图片足够清晰、真实，图片格式jpg、png等，图片尺寸不要超过1M</p>
                     <div class="msg" v-if="msgKey1">
                         <el-alert :title="message" type="error" show-icon></el-alert>
                     </div>
                </div>
              </div> -->
              <div class="tit"> 结算信息</div>
              <div class="inputBox"> 
                <div class="list">
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for="">结算账户:</span></p>
                   <p class="right">
                    <!--  <el-radio-group v-model="radio" @change='radChange'>
                     <el-radio :label="3" name='card_type'>企业</el-radio>
                     <el-radio :label="1" name='card_type'>个人</el-radio>                      
                                        </el-radio-group> -->


                    <Radio-group v-model="radio" @on-change='radChange'>
                        <Radio label="3" name='card_type'  ><span>企业</span></Radio>
                        <Radio label="1" name='card_type' ><span>个人</span></Radio>
                    </Radio-group>
                   </p>
                </div>
                <div class="msg" v-if="msgKey2"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                <div class="list">
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for="">银行开户名:</span></p>
                   <p class="right">  

                    <el-input v-show='!show' class="inp" name='card_name' disabled v-model='countName' placeholder="请输入开户名"></el-input>
                     <el-input v-show='show' class="inp" name='card_name'  v-model='countName' placeholder="请输入开户名"></el-input>
                   <!-- <input class="inp" type="text" name='card_name' v-model='countName' placeholder="请输入开户名"> -->
                   </p>
                </div>
                <div class="msg" v-if="msgKey3"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                <div class="list">
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for=""><span v-show='!show'>企业</span><span v-show='show'>个人</span>银行账号:</span></p>
                   <p class="right">  

                    <el-input class="inp" type="num" name='card_num'   v-model='countNum' placeholder="请输入银行账号" @change='checkNum'></el-input>
                   <!-- <input class="inp" type="num" name='card_num' v-model='countNum' placeholder="请输入银行账号"> -->
                   </p>
                </div>
                <div class="msg" v-if="msgKey4"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                <div class="list">
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for="">开户银行:</span></p>
                   <p class="right">  

                   <el-input class="inp" type="text"  name='bank_name' v-model='bankName' placeholder="请输入银行名称"></el-input>
                   <!-- <input class="inp" type="text" name='open_bank' v-model='bankName' placeholder="请输入银行名称"> -->
                   </p>
                </div>
                <div class="msg" v-if="msgKey5"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                 <div class="list" >
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for="">省份:</span></p>
                   <p class="right" style='float:left; width:50%' > 

                        <el-select v-model="provinceData"  @change='selectCity()' placeholder="请选择省份" >
                          <el-option
                            v-for="item in province"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                           >
                          </el-option>
                        </el-select>                  
                   </p>
                </div>
                <div class="msg" v-if="msgKey6"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                <div class="list" >
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for="">城市:</span></p>
                   <p class="right" style='float:left; width:50%'> 

                      <el-select v-model="cityData" placeholder="请选择城市">
                        <el-option
                          v-for="item in city"
                          :key="item.name"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>                  
                   </p>
                </div>
                <div class="msg" v-if="msgKey7"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                <div class="list" v-show='!show'>
                   <p class="left">  <i class="el-icon-star-on" style='color:#fff'>  </i><span class="label" for="">开户银行支行:</span></p>
                   <p class="right">  
                    <el-input class="inp" type="text" name='branch' v-model='branchName' placeholder="请输入支行名称"></el-input>
                   <!-- <input class="inp" type="text" name='branch' v-model='branchName' placeholder="请输入支行名称"> -->
                   </p>
                </div>
                <div class="list" v-show='!show'>
                   <p class="left">  <i class="el-icon-star-on" style='color:#fff'>  </i><span class="label" for="">开户银行分行:</span></p>
                   <p class="right">  
                    <el-input class="inp" type="text" name='subbranch' v-model='subBankName' placeholder="请输入分行名称"></el-input>
                   <!-- <input class="inp" type="text" name='subbranch' v-model='subBankName' placeholder="请输入分行名称"> -->
                   </p>
                </div>
                <div class="list" style='height:100px' v-show='show'>
                   <p class="left">  <i class="el-icon-star-on">  </i><span class="label" for="">授权书:</span></p>
                   <p class="right" >  
                      <div style='position:relative'>                         
                          <el-button size="small" type="primary">点击上传</el-button>
                          <input name='power_of_attorney' type="file" v-on:change='myfile($event)' style='position:absolute; top:0; left:45%; top:22px; opacity:0'>
                          <img :src="src4  " alt=""  width="0" style="opacity:0">
                          <div class="msg" v-if="msgKey8"><el-alert :title="message" type="error" show-icon :closable='closeIcon'></el-alert></div>
                          <div slot="tip" class="el-upload__tip">请在PC端下载授权书，按要求填写表格后，上传加盖公章的扫描件，支持jpg、jpeg、png、gif格式照片，大小不超过3M</div>
                          <i :class='objStyle' v-show='showfile'>{{filename}}</i>
                        </div>                                             
                   </p>            
                </div>
                                           
                <div class="list" style='margin-top:20px'>
                   <el-button class="btn" type="primary" :loading="loadbool"  @click="submitInfo" >{{submitmsg}}</el-button>
                  <!--  <a  class="btn" @click="submitInfo" :disabled="disabled">提交</a> -->
                </div>
                <div class="list" style='margin:20px 0'>
                </div>
               

          </div> 
        </form> 
      </div>   
   </div>
   <!-- //提交成功后的提示 -->
   <div class="dialogmodel" v-show="tipsKey">
      <i class="el-icon-circle-check" style='font-size:40px; line-height:80px'></i>
      <span style='padding-left:10px; position:relative; top:-8px'>{{msg}}</span>
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
   <!--  //关闭app的提示 -->
     <div class="dialog-wrap" v-show="dialog">
          <div class="mark"></div>
          <div class="dialog">
            <div class="dtitle">确定关闭APP吗？</div>
            <div class="btnGrounp">
              <button class="no" @click='removeNo'>取消</button>
              <button class="yes" @click='exitApp'>确定</button>
            </div>
          </div>
      </div>
  </div>
   
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'information',
    data() {
      return {
        radio:'',
        loadbool:false,
        submitmsg:'提交',
        deviceType:false,
        logOutKey:false,
        bool:false,
        tipsKey:false,
        msg:'',
        disabled:false,
        dialog:false,
        src1:'',
        src2:'',
        src3:'',
        src4:'',
        msgKey1:false,
        msgKey2:false,
        msgKey3:false,
        msgKey4:false,
        msgKey5:false,
        msgKey6:false,
        msgKey7:false,
        msgKey8:false,
        message:'',
        picked:'',
        countName:'',
        countNum:'',
        bankName:'',
        branchName:'',
        subBankName:'',
        showfile:false,
        objStyle:{},
      	show:false,
        provinceData:'',
        cityData:'',
        filename:'',
        closeIcon:false
      }
    },
    computed:{
      city:function(){
        return this.$store.state.city
      },
      province:function(){
        return this.$store.state.province
      },
      qualification:function(){
        return this.$store.state.qualification;
      },
    },
    mounted:function(){
      this.checkSystem($('.information'))
      new BScroll(document.getElementById('inforbox'), {
        click:true,
      }) 
    },
    created:function(){
      /*this.getdData(localStorage.getItem('token'))*/   
      this.getProvince()
      this.countName=this.qualification.qualification.company
      

      
    },
    methods:{
      demo(){
        console.log(this.animal)
      },
      checkNum(){
        var reg=/^[0-9]\d*$/;
        if(this.countNum.length!=0 && !reg.test(this.countNum)){
          this.msgKey4=true
          this.message='请输入数字'
        }else{
          this.msgKey4=false
          this.message=''
        }
      },
      radChange(){
        console.log(this.radio)
        if(this.radio==1){
          this.show=true
          this.countName=''
        }else{
          this.show=false
          this.countName=this.qualification.qualification.company

        }
      },
      selecType(){
        console.log(this.type)
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
      logOut(){
       this.$router.push({path:'/home'}) 
    },
    logOutBox() {
      this.logOutKey=true;      
    },
    cancel(){
      this.logOutKey=false;
    },
      selectCity(){
       var that=this
          $.ajax({
            url:that.BaseURL+'Qualification/getProvinceCity ',
            type: 'post',
            dataType: 'json',
            data: {
              token: localStorage.getItem('token'),
              province:that.provinceData
            },
            success:function(res){
              console.log(res)
              if(res.status==-1){
                that.$router.push({path:'/login'})
              }else{
                that.$store.dispatch('getCity',res.provinceCity)
              }

            }
          })
      },
      getProvince(){
        var that=this
          $.ajax({
            url:that.BaseURL+'Qualification/getProvinceCity ',
            type: 'post',
            dataType: 'json',
            data: {
              token: localStorage.getItem('token'),
              province:''
            },
            success:function(res){
              console.log(res.provinceCity)
              that.$store.dispatch('getProvince',res.provinceCity)
            }
          })
      },
     exitApp(){
       navigator.app.exitApp()
     },  
     myfile($event){ 
      var file=$event.target.files[0]
      var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      var supportedSize=3*1024*1024
      console.log(file.name)
      if(file){
        if(supportedTypes.indexOf(file.type)<=-1){
            this.showfile=true;
            this.filename='请选择正确的图片格式'
            this.objStyle={
              'el-icon-document':true,
              'redColor':true
            }
        }else if(supportedSize<file.size){
            this.showfile=true;
            this.filename='图片大小不能超过3M'
            this.objStyle={
              'el-icon-document':true,
              'redColor':true
            }
        }else{
            var that=this;
            that.$emit('change', $event.target.value)
            that.fileToUrl(function(url){
                that.src4=url;
            }) 
            that.showfile=true;
            that.filename=file.name.substring(0,10)+'...'
            that.objStyle={
              'el-icon-document':true,
              'redColor':false
            }
            that.$message({
              message: '图片上传成功',
              type: 'success',
              duration:1000,
              iconClass:'el-icon-circle-check'
            });
            
        }

      }else{
        this.showfile=true;
        this.filename='您还为选择任何图片'
        this.objStyle={
              'el-icon-document':true,
              'redColor':true
            }
      }
     },
     /* preImg1($event){
        this.$emit('change', $event.target.value)
        var file=$event.target.files[0]
        var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        var supportedSize=1*1024*1024
        var that=this;
        if(supportedTypes.indexOf(file.type)<=-1){
            this.src='';
            this.msgKey1=true;
            this.message='请选择正确的图片格式'
            setTimeout(()=>{
              this.msgKey1=false;
              this.message=''
            },2000)
        }else if(supportedSize<file.size){
            this.src='';
            this.msgKey1=true;
            this.message='图片大小不能超过1M';
            setTimeout(()=>{
              this.msgKey1=false;
              this.message=''
            },2000)
        }else{
          this.fileToUrl(function(url){
          that.src1=url;
          }) 
        }
              
      },
      preImg2($event){
        this.$emit('change', $event.target.value)
        var that=this;
        this.fileToUrl(function(url){
          that.src2=url;
        })
         
      },
      preImg3($event){
        this.$emit('change', $event.target.value)
        var that=this;
        this.fileToUrl(function(url){
          that.src3=url;
        })

      },*/
     preImg4($event){
      this.$emit('change', $event.target.value)
      var that=this;
      this.fileToUrl(function(url){
        that.src4=url;
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
      luhnCheck(bankno){
         var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhn进行比较）
     
         var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
         var newArr=new Array();
         for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
             newArr.push(first15Num.substr(i,1));
         }
         var arrJiShu=new Array();  //奇数位*2的积 <9
         var arrJiShu2=new Array(); //奇数位*2的积 >9
         
         var arrOuShu=new Array();  //偶数位数组
         for(var j=0;j<newArr.length;j++){
             if((j+1)%2==1){//奇数位
                 if(parseInt(newArr[j])*2<9)
                 arrJiShu.push(parseInt(newArr[j])*2);
                 else
                 arrJiShu2.push(parseInt(newArr[j])*2);
             }
             else //偶数位
             arrOuShu.push(newArr[j]);
         }
         
         var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
         var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
         for(var h=0;h<arrJiShu2.length;h++){
             jishu_child1.push(parseInt(arrJiShu2[h])%10);
             jishu_child2.push(parseInt(arrJiShu2[h])/10);
         }        
         
         var sumJiShu=0; //奇数位*2 < 9 的数组之和
         var sumOuShu=0; //偶数位数组之和
         var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
         var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
         var sumTotal=0;
         for(var m=0;m<arrJiShu.length;m++){
             sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
         }
         
         for(var n=0;n<arrOuShu.length;n++){
             sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
         }
         
         for(var p=0;p<jishu_child1.length;p++){
             sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
             sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
         }      
         //计算总和
         sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
         
         //计算luhn值
         var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
         var luhn= 10-k;
         
         if(lastNum==luhn){
             return true;
         }else{
            
             return false;
         }        
      },
      //检查银行卡号
      CheckBankNo(bankno) {
         var tip;
         var bankno = bankno.replace(/\s/g,'');
         if(bankno == "") {
             tip="请填写银行卡号";
             return false;
         }
         if(bankno.length < 16 || bankno.length > 19) {
             tip="银行卡号长度必须在16到19之间";
             return false;
         }
         var num = /^\d*$/;//全数字
         if(!num.exec(bankno)) {
             tip="银行卡号必须全为数字";
             return false;
         }
         //开头6位
         var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
         if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
             tip="银行卡号开头6位不符合规范";
             return false;
         }
         //Luhn校验
         if(!this.luhnCheck(bankno)){
             return false;
         }else{
          return true;
         }
     
      },
      subData(data,type){
          var that=this;
          that.loadbool=true;
          that.submitmsg='正在提交';
            $.ajax({
            url:that.BaseURL+'Qualification/qualificationUpload',
            type:'post',
            processData:false,
            contentType:false,
            data:data,
            success:function(res){
              if(res.status==1){
                if(type==1){
                  that.tipsKey=true
                  that.msg='资料已提交审核'
                }
                that.disabled=true;
                setTimeout(()=>{
                  that.loadbool=false;
                  that.submitmsg='提交';
                  that.tipsKey=false;
                  that.msg='';
                  that.$router.push({path:'/Information/inforStatus'})
                },1500)
                  
              }else{
                that.msgKey8=true;
                that.message=res.info;
                that.loadbool=false;
                setTimeout(()=>{
                  that.msgKey8=false;
                  that.message=' ';
                },2000)

              }
              

            },
            error:function(res){


            }
          })
        },
      submitInfo(){
        var form = this.$refs.form;
        var formdata=new FormData(form);
        formdata.append('token',localStorage.getItem('token'));
        formdata.append('province',this.provinceData);
        formdata.append('city',this.cityData);
        formdata.append('card_type',this.radio);
        console.log();
        if(!this.radio){
            this.msgKey2=true;
            this.message='请选择账户类型';
            setTimeout(()=>{
            this.msgKey2=false;
            this.message="";
            },2000)
        }else if(!this.countName){
            this.msgKey3=true;
            this.message='账户名不能为空';
            setTimeout(()=>{
            this.msgKey3=false;
            this.message3="";
            },2000)
        }else if(!this.countNum){
            this.msgKey4=true;
            this.message='银行账号不能为空';
            setTimeout(()=>{
            this.msgKey4=false;
            this.message="";
            },2000)
        }else if(!this.bankName){
            this.msgKey5=true;
            this.message='银行名称不能为空';
            setTimeout(()=>{
            this.msgKey5=false;
            this.message="";
            },2000)
        }else if(!this.provinceData){
            this.msgKey6=true;
            this.message='省份不能为空';
            setTimeout(()=>{
            this.msgKey6=false;
            this.message="";
            },2000)
        }else if(!this.cityData){
            this.msgKey7=true;
            this.message='城市不能为空';
            setTimeout(()=>{
            this.msgKey7=false;
            this.message="";
            },2000)
        }/*else if(!this.src4){
            this.msgKey8=true;
            this.message='授权书资料上传有误，请重新上传！';
            setTimeout(()=>{
            this.msgKey8=false;
            this.message="";
            },2000)
        }*/
        else{

          if(this.radio==3){
            formdata.append('card_name',this.qualification.qualification.company)
            this.subData(formdata,3);
          }else{
            if(!this.src4){
              this.msgKey8=true;
              this.message='授权书资料上传有误，请重新上传！';
              setTimeout(()=>{
              this.msgKey8=false;
              this.message="";
              },2000)
            }else{
              this.subData(formdata,1);
            }
          }
          
        }



        
        
        
      }

        
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>	

.el-icon-document{
  position: absolute;
  left: 65%;
  top: 18px
}
.redColor{
  color:red
}
.ivu-icon-arrow-down-b:before {
    content: "\F104";
}
.information .main .inputBox .list .left .label{
    padding:0 10px;
  }
@media screen and (max-width: 320px) {
  .information .main .inputBox .list .left .label{
    padding:0;
  }
}
.ivu-select-item{
  padding:7px;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
  padding-right:0;
}
.el-select .el-input .el-input__icon{
  left: 0;
  width: 180%;
}
.list .el-input{
  width:100%;
 } 
.list .inp input{
  border:0;

}
.msg .el-alert{
  padding: 4px 16px;
  
}
.el-select .el-input input{
  border:1px solid #bfcbd9;
}
.ivu-radio-inner{
  width:16px;
  height: 16px
}
.ivu-radio-inner:after{
  left:4px;
  top:4px;
}
.ivu-radio-group-item{
  font-size: 14px
}


</style>
<style scoped lang="stylus">
@import "../../common/index.styl"
.information
  position: absolute
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
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
      z-index 20
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
  .close
    color #fff
    position absolute
    right 10px
    font-size 14px
  .back 
    position: absolute
    left 0
    font-size 14px
    width $barHeight
    line-height $barHeight
    color #fff
  .el-input__inner
    border-radius 4px
  .confirmOut
    position: fixed
    bottom 0
    width 100%
    z-index 88
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
  .dialogmodel
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
    z-index 10
  .infobox
    position: absolute
    z-index: 10
    width 100%
    left 0px
    top 0
    bottom 0
    overflow auto
  .el-upload__tip
    line-height 24px
    color #ff9800
    background #fff
    width 100%
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
  .tit
  	height 50px
  	line-height 50px
  	text-align center
  	background #eee
  .main
  	position absolute
  	top 50px
  	left 0
  	right 0
  	overflow auto
  	.tip
  	  width 96%
  	  color #ff9800
  	  font-size 12px 	 
  	  line-height 24px
  	  background #fff
  	  padding 0  2%  
   	.upImg
      display flex
      width 100%
      height 120px
      background #fff
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
          height 55px
          margin 10px auto 
          outline none
          overflow hidden
        .upImgBtn
          position: absolute
          z-index 10
          display block
          top 0
          padding-top 70px
          left 0
          right 0
          bottom 0
          .plus
            font-size 14px
        #upImg1,#upImg2,#upImg3
          visibility hidden
          width 100%
    .inputBox
      background #fff
      .list
        height 60px 
        line-height 60px
        padding 0 10px
        .btn
          margin-top 20px
          width 80%
          margin 0 10%
          display block
          height 40px
          background $mainColor
          color #fff
          border none
          border-radius 6px
          display block
          text-align center
          &:active
            background #841d21
        .left
          float left
          width 45%
          i
            color #ff9800
        .right
          float left
          width 55% 
		.right
		  .el-select
		  	
		  	float left
		  .inp
		    height 40px
		    border 0
		    line-height 40px
        
		  span 
		    padding 0 10px  
  .msg
    width 80%
    margin 0 10%
  .mark
    position: fixed
    top 0 
    right 0
    left 0
    bottom 0
    background rgba(0, 0, 0, .3)
    z-index 11
</style>
