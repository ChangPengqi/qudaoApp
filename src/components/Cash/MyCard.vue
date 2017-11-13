<template>
  <div class="mycard">
    <div class="title">
      <!-- <router-link to="/home/cash/withdrawal" class="fa icon-left back"></router-link tag="i"> -->
      <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a>
      <span>我的银行卡</span>
      <!-- <a href="javascript:void(0)" class="fa  addcard" @click='addcard()'>添加</a> -->
    </div>
    <div class="cardBox">
      <ul v-if='cardInfoList!=null'>
        <li class="list"   >
          <div class="item avatar">
          <img v-if='avatar' :src="avatar"  width="30" height="30">
          <img v-if='!avatar' src="./avatar.png"  width="30" height="30">
            
          </div>
          <div class="item bankName">{{qualification.open_bank}}</div>
          <div class="item classes">
              <span v-if="qualification.card_type==3">借记卡  </span>
              <span v-if="qualification.card_type==2">储蓄卡  </span>
              
          </div>
          <div class="item text">{{qualification.card_num | subCard}}</div>
        </li>

      </ul>
      <div v-if='cardInfoList==null' style=' height:50px;line-height:50px; color:#c81623; text-align:center'>暂无银行卡信息</div>
    </div>
    
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'mycard',
    data() {
      return {
        avatar:false
       /* cardInfo:[]

         // msgKey:false,  //若无银行卡则渲染
         cardInfo:[
            {
            avatar:"http://img.dongqiudi.com/uploads/avatar/2014/10/20/8MCTb0WBFG_thumb_1413805282863.jpg",
            bankName:'中国工商银行',
            text:"3638",
            type:'借记卡'
           },
           {
            avatar:"http://img.dongqiudi.com/uploads/avatar/2014/10/20/8MCTb0WBFG_thumb_1413805282863.jpg",
            bankName:'中国工商银行',
            text:"8888",
            type:'储蓄卡'
           }
         ]*/
      }
    },
    filters:{
      subCard(value){
        if(value){
          var len=value.length-4;
          var str='';
          for(var i=1;i<=len;i++){
            if(i%4==0){
                str+='*   '
            }else{
              str+='*'
            }
            
          }
           return str+' '+value.substring(len)
          }
        }
      
    },
    computed:{
      qualification:function(){
      return this.$store.state.qualification.qualification;
      },
      msgKey:function(){
        return this.cardInfoList ? false : true  //如果有银行卡，则不显示msg
      },
      cardInfoList:function(){
        return this.$store.state.cardInfo.info ? this.$store.state.cardInfo.info : null;
      },
     
      
    },
    mounted:function(){
      this.checkSystem($('.mycard'))
      // let scroll = new BScroll(document.getElementById('cash'), {
      //   startX: 0,
      //   startY: 0
      // })
    },
    created:function(){
      this.getData();
      localStorage.setItem('cardName','')
      localStorage.setItem('cardNum','')
      localStorage.setItem('idNumber','')

    },
    methods:{
      back(){
        var len=location.hash.length
        var query=location.hash.substring(len-1,len)
        if(query==1){
          this.$router.push({path:'/set/shild'})
        }else if(query==2){
          this.$router.push({path:'/home/cash/withdrawal'})
        }
      },
      addcard(){
        var len=location.hash.length
        var query=location.hash.substring(len-1,len)
        this.$router.push({path:'/home/cash/addcard/'+query})
      

      },
      withdrawal(data) {
        this.$store.dispatch('getMyCardInfo',data)
        this.$router.push({path:'/home/cash/withdrawal'})
      },
      getData(){
        $.ajax({
          url:this.BaseURL+'Personal/myBankCard',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
          console.log(res)
          if(res.status==-1){
            this.$router.push({path:'/login'})
          }else{
            this.$store.dispatch('getCardInfo',res);
          }
          
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
        
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.mycard
  position: absolute
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
      right 0px
      width $barHeight
      line-height $barHeight
      color #fff
      font-size 14px
  .cardBox
    width 95%
    margin 0 auto
    .list
      position: relative
      width 100%
      height 80px
      border-radius 8px
      margin 8px 0
      font-size 14px
      font-weight 500
      color #fff
      &:nth-child(odd)
        background #ea5348
      &:nth-child(even)
        background #18b187
      .item
        display inline-block
        position: absolute
        &.avatar
          top 10px
          left 10px
          width 30px
          height 30px
          overflow hidden
          border-radius 50%
        &.bankName
          top 15px
          left 50px
        &.classes
          top 15px 
          right 20px
          font-size 14px
        &.text
          bottom 10px
          left 30px
          font-size 14px
  .msg
    text-align center
    height 40px
    line-height 40px
    margin-top 20px
</style>
