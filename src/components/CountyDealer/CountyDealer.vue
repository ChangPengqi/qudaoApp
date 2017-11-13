<template>
<transition
        
         enter-active-class="animated fadeInRight"
    mode="in-out"
      >
  <div class="countyDealer">
    <div class="title">
      <router-link to="/home" class="fa icon-left back" ></router-link tag="i">
      <span>区县服务中心</span>
      <router-link to="countyDealer/dealerapply"><i class="fa  apply">申请</i></router-link>
    </div>
    <div class="main">
      <div class="head">
        <div class="item">区域</div>
        <div class="item">粉丝数</div>
        <div class="item rebate">状态</div>
      </div>
      <div class="lists" id="countyDealer">
        <ul>
          <li class="list" v-for="(list,index) of countyList" @click="openCountyDetail(list)" >
            <div class="item name">{{list.county_name}}</div>
            <div class="item count">{{list.countyfen_count}}</div>
            <div class="item" :class="[ Number(list.is_proxy)>0 ? successClass : failClass]">{{list.daili_status}}</div>
          </li>
        </ul>
      </div>
      <div class="msg" v-show="flag">数据加载中...</div>
    </div>
  </div>
</transition>
</template>
<script>
import _ from 'lodash/core'
import BScroll from 'better-scroll'
// import axios from "axios"
export default {
  	name:'countyDealer',
    data() {
      return {
         successClass :'success',
         failClass:'fail',
         flag:true
      }
    },
    methods:{
      openCountyDetail(data) {
        if(data.daili_status=='已开通'){
          //this.$router.push({path:'/home/countydetail'});
          this.$router.push({path:'/home/countydetail/credit'});
          this.$store.dispatch('getCountydealer',data)
        }
        

        
       /* state = Number(state);
        if(state===1){
          //已开通
          
          this.getCountyName(county_name);
          //初始化county_id县级服务中心数据
          this.getDetailData(county_id,0,'getCountyDetailInfo');
          this.getDetailData(county_id,1,'getCountyDetailInfoOne');
        }else if (state === -2) {
          this.$router.push({path:'/home/countystate/countyfreeze'});
          this.getCountyName(county_name);
        }else if(state === -1){
          this.$router.push({path:'/home/countystate/countyaudit'});
          this.getCountyName(county_name);
        }*/
      },
      //getDetailData(id,type,store){
        /* $.ajax({
          url:this.BaseURL+'Countydeal/county_detail',
          type:'get',
          data:{
            token:localStorage.getItem('token'),
            county_id:id,
            rebate_type:type
          },
          success:(res) => {
            // console.log(res);
            this.$store.dispatch(store,res);
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })*/
      //},
     /* getCountyName(county_name){
        this.$store.dispatch('getCountyName',county_name);
      }*/
    },
    computed:{
      countyList:function() {
        return this.$store.state.countyinfo;
      },
    },
    created:function(){
      //初始化数据
      $.ajax({
        url:this.BaseURL+'Countydeal/county_list',
        type:'get',
        data:{
          token:localStorage.getItem('token')
        },
        success:(res) => {
          // console.log(res);
          this.flag=false;
          if(res.status==-1){
            this.$router.push({path:'/login'})
          }else{
          this.$store.dispatch('getCountyInfo',res);
          }
          setTimeout(function(){
          new BScroll(document.getElementById('countyDealer'), {
            click:true,
           });
          },200)
        },
        error:(res) => {
          console.log('Ajax error!')
        } 
      })
    },
    mounted:function(){
      this.checkSystem($('.countyDealer'))
      
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.countyDealer
  position: fixed
  top 0
  left 0
  right 0px
  bottom 0
  background #eee
  .title
    position relative
    width 100%
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
      line-height $barHeight
      color #fff
    .apply
      position: absolute
      right 0
      width $barHeight
      line-height $barHeight
      font-weight 200
      font-size 14px
      color #fff
  .main
    width 100%
    .head
      display flex
      width 100%
      height 60px
      border-1px(#eee)
      line-height 60px
      .item
        flex 1
        font-size 16px
        font-weight 500
        text-align center
        background #fff
        border-right 1px solid #eee
        &:last-child
          border none           
    .lists
      position: absolute
      top 60px + $barHeight
      left 0
      right: 0;
      bottom 0
      overflow auto
      // -webkit-overflow-scrolling:touch
      .list
        display flex
        width 100%
        height 60px
        line-height 60px
        border-1px(#eee)
        background #fff
        &:active
          background rgba(0, 0, 0, .2)
        .item
          flex 1
          text-align center
          font-size 14px
          font-weight 500
          &.success
            color green
          &.fail
            color $mainColor
    .msg
      position: relative
      text-align center
      line-height 100px
      color $mainColor     
</style>
