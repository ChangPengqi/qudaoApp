<template>
  <div class="addcard">
    <div class="title">
    <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a>
      <!-- <a to="/home/cash/mycard" class="fa icon-left back" tag="i"></a > -->
      <span>添加银行卡</span>
    </div>
    <div class="main">
      <div class="tips">请绑定持卡人本人的银行卡</div>
      <form>
      
        <p class="list"><label for="user">持卡人</label><input  type="text"  v-model='cardName' id="user" placeholder="请输入持卡人姓名"></p>
        <div class="msg " v-if="msgKey1">{{msg1}}</div>
        <p class="list"><label for="id_number">身份证号</label><input type="text"  v-model='idNumber' id="id_number"  placeholder="请输入正确的身份证号"></p>
        <div class="msg" v-if="msgKey2">{{msg2}}</div>
        <p class="list"><label for="cardId">银行卡号</label><input type="text"  v-model='cardNum' id="cardId" placeholder="请输入正确的银行卡号"></p>
        <div class="msg" v-if="msgKey3">{{msg3}}</div>
      </form>

    </div>
    
    <button class="next" @click="next">下一步</button>
  </div>
</template>
<script>
import Vue from 'vue'
// import { RegionPicker } from 'vue-region-picker'
// import REGION_DATA from 'china-area-data'
import BScroll from 'better-scroll'
// RegionPicker.region = REGION_DATA
// RegionPicker.vueVersion = 2 // or 2, default 1
export default {
  	name:'addcard',
    components:{

    },
    data() {
      return {
        cardName:localStorage.getItem('cardName'),
        cardNum:localStorage.getItem('cardNum'),
        idNumber:localStorage.getItem('idNumber'),
        msg1:'',
        msg2:'',
        msg3:'',
        msgKey1:false,
        msgKey2:false,
        msgKey3:false

      }
    },
    mounted:function(){
     this.checkSystem($('.addcard'))
    },
    computed:{
      card:function(){
        return this.$store.state.card
      }
    },
    created:function(){
       
     
       
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      //身份证号合法性验证 
      //支持15位和18位身份证号
      //支持地址编码、出生日期、校验位验证
      IdentityCodeValid(code) { 
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
            
            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
           else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
            if(!pass) {
              return false
            }else{

              return pass;
            }
            
      },
      //银行卡号Luhn校验算法
      //luhn校验规则：16位银行卡号（19位通用）: 
      //1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
      //2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
      //3.将加法和加上校验位能被 10 整除。

      //bankno为银行卡号
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
      next() {
        var validIdNum=this.IdentityCodeValid(this.idNumber);
        var validBankNum=this.CheckBankNo(this.cardNum);
        if(this.cardName.length==0){
          this.msgKey1=true;
          this.msg1='持卡人姓名不能为空';
          setTimeout(() => {
            this.msgKey1=false;
            this.msg1='';
          },2000)
        }else if(!validIdNum){
          this.msgKey2=true;
          this.msg2='身份证号格式错误';
          setTimeout(() => {
            this.msgKey2=false;
            this.msg2='';
          },2000)
        }else if(!validBankNum){
          this.msgKey3= true; 
          this.msg3='银行卡号格式错误';
          setTimeout(() => {
            this.msgKey3=false;
            this.msg3='';
          },2000)

        }else{
            var len=location.hash.length
            var query=location.hash.substring(len-1,len) 
            var data={
              cardName:this.cardName,
              idNumber:this.idNumber,
              cardNum:this.cardNum,
              query:query
            }

            this.$store.dispatch('getFirstStepCardInfo',data);
            this.$router.push({path:'/home/cash/addcard/addcardinfo'})
        } 
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.addcard
  position: fixed
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
  .title
    position: relative
    height $barHeight
    line-height $barHeight
    text-align center
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 400
    .back
      position: absolute
      left 0
      width $barHeight
      line-height: $barHeight;
      color #fff
    .addcard
      position: absolute
      right 15px
      line-height $barHeight
      color #fff
  .main
    width 100%
    text-align center
    .tips
      width 100%
      height 30px
      line-height 30px
      font-size 12px
      font-weight 500
    .msg
      color red
      margin-top 20px
      margin-bottom 20px
    .list
      display flex
      height 60px
      line-height 60px
      border-1px(#eee)
      background #fff
      label
        width 80px
        font-size 14px
        font-weight 500
        height 28px
        line-height 28px
        padding 16px 0
      input 
        flex 1
        margin-right 15px
        border none
        outline none
        font-size 14px
        line-height 28px
        height 28px
        padding 16px 0
      &:last-child
        border none
  .next
    display block
    width 90%
    margin 30px auto
    border none
    border-radius 6px
    outline none
    height $buttonHeight
    line-height $buttonHeight
    color #fff
    font-size 16px
    background $mainColor
    &:active
      background #841d21
</style>
