<template>
  <div class="cashdetail">
    <div class="title">
      <router-link to="/home/cash/withdrawal" class="fa icon-left back"></router-link tag="i"> 
      <!-- <a href="javascript:void(0)" class="fa icon-left back" @click='back()'></a> -->
      <span>明细</span>
    </div>
    <div class="main" id="cashdetail">
      <ul v-if='!cashList.length==0'>
        <li class="list" v-for="list of cashList" @click="openDetail(list)">
          <div class="item left" >
           
            <div class="name" v-if='list.bank_name.length==1'>{{qualification.qualification.open_bank}}（{{list.bank_card_four}}）</div>
            <div class="name" v-if='list.bank_name.length>1'>{{list.bank_name}}（{{list.bank_card_four}}）</div>
            <div class="time">{{list.ctime}}</div>
          </div>
          <div class="item right">￥ {{list.money}} <span :style="{'color':activeColor}">{{list.wd_status}}</span></div>
        </li>
      </ul>
      <div class="msg" v-if='cashList.length==0'>暂无数据......</div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'cashdetail',
    data() {
      return {
         message:''
      }
    },
    mounted:function(){
      this.checkSystem($('.cashdetail'))
    },
    computed:{
     
      cashList:function(){
        return this.$store.state.cashInfo;
      },
      qualification:function(){
        return this.$store.state.qualification;
      },
    },
    created:function(){
      this.getData();
      /*document.addEventListener("backbutton", this.eventBackButton, false);*/
    },
    methods:{
      /*eventBackButton(){
        if(location.hash.indexOf('cashdetail')){
          var len=location.hash.length
          var query=location.hash.substring(len-1,len)
          if(query==1){
          this.$router.push({path:'/home/cash/withdrawal'})
          }else if(query==2){
            this.$router.push({path:'/home/cash/withdrawalprocess'})
          }

        }
      },
      back(){
        var len=location.hash.length
        var query=location.hash.substring(len-1,len)
        if(query==1){
          this.$router.push({path:'/home/cash/withdrawal'})
        }else if(query==2){
          this.$router.push({path:'/home/cash/withdrawalprocess'})
        }
      },*/
      openDetail(data) {
        this.$store.dispatch('getCashDetailInfo',data);
        this.$router.push({path:'/home/cash/expendetail'})
      },
     /* getCashStatus(arr){
        var that=this;
        for (var i = 0; i < arr.length; i++) {
          $.ajax({
              url:that.BaseURL+ '/Cash/getWdcashStatus',
              type: 'POST',
              dataType: 'JSON',
              data: {
                token: localStorage.getItem('token'),
                order_sn:arr[i].order_sn
              },
              success:function(res){
                arr[i].wd_status=res.info.wd_status
                console.log(res)
                  if(res.status==1){
                    if(res.info.wd_status==1 || res.info.wd_status==5){
                        that.message='正在提现中'
                        that.activeColor='#f90'
                    }else if(res.info.wd_status==3){
                        that.message='提现成功'
                        that.activeColor='#19be6b'
                    }else if(res.info.wd_status==2 || res.info.wd_status==4){
                        that.message='提现失败'
                        that.activeColor='#ed3f14'
                    }else{
                        that.message='提现失败'
                        that.activeColor='#ed3f14'
                    }
                  }else{

                  }

              }
            })
        }
          
      },*/
      getData(){
       $.ajax({
          url:this.BaseURL+'Cash/cashList',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
            console.log(res)
            if(res.status==-1){
              this.$router.push({path:'/login'})  
            }else{
              this.$store.dispatch('getCashInfo',res);

            }
            

            setTimeout(function(){ 
              new BScroll(document.getElementById('cashdetail'), {
                click:true,
                bounceTime:300,
                swipeBounceTime: 800 
              })
            },200)
            

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
.cashdetail
  position: absolute
  top 0
  left 0
  width 100%
  bottom 0
  background #eee
  .msg
    text-align center
    height 50px 
    line-height 50px
    color #c81623
  .title
    position: relative
    with 100%
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
  .main
    position: absolute
    top $barHeight
    left 0
    bottom 0
    right 0 
    with 100%
    overflow hidden
    background #fff
    .list
      display flex
      border-1px(#eee)
      height 70px
      line-height 70px
      font-size 14px
      font-weight 400
      &:active
        background rgba(0, 0, 0, .2)
      .item 
        flex 1
        &.left
          text-align left
          line-height 18px
          margin-left 20px
          margin-top 14px
          font-size 14px
          font-weight 500
          .time
            color #09c
            margin-top 8px
            font-size 14px
        &.right
          text-align right
          margin-right 30px
          font-size 18px
          color #09c
</style>
