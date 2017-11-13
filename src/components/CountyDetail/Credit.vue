<template>
  <transition 
   name="custom-classes-transition"
         enter-active-class="animated fadeInRight"
    mode="in-out"
  >
    <div class="channelfan" >
      <div class="title">
        <router-link to="/home/countydealer" class="fa icon-left back" tag="i"></router-link>
        <span>{{countyDealer.county_name}}</span>
      </div>
      <div class="content">
        <div class="data" id="directfan">
          <ul>
            <li class="list" v-for="list in chaFansDetailistInfo.fen_date_list" :key='list'  @click="openDetail(list)">
              
              <div class=" box" >
                <div class="left">
                  <div class="name">{{list.date | changDate }} 月新增粉丝</div>     
                </div>
                <div class="right">
                  <div class="fens_num">{{list.usercount}}<span class="fa icon-right"></span></div>  
                </div>
              </div>
            </li>
            
          </ul>

        </div>
      </div>

      
    </div>
  </transition>
</template>
<script> 
import BScroll from 'better-scroll'
export default {
    name:'fansdetail',
    data() {
      return {
         activeKey:false,  //判断信用钱包是否激活         
      }
    },
    methods:{
      getData(){
        $.ajax({
          url:this.BaseURL+'fen/county_fen',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            county_id:this.countyDealer.county_id
          },
          success:(res) => {
            console.log(res);
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
            this.$store.dispatch('getChanFansDetailistInfo',res);
            }
             setTimeout(function(){ 
              let directfanscroll = new BScroll(document.getElementById('directfan'), { 
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

      

      },
      openDetail(list){
        this.$store.dispatch('getCountylistDate',list)
        this.$router.push({path:'/home/countydetail'});
      },
    },
    filters:{
      changDate(value){
        var len=value.length;
        return value.substring(len-1)
      },
      substr(value){
        return value.split(' ')[0].substring(5).replace('/','-')
      }
    },
    computed:{
      chaFansDetailistInfo:function(){
        return this.$store.state.chaFansDetailistInfo
      },
      chaFansDetail:function(){
        return this.$store.state.chaFansDetail;
      },
      countyDealer:function(){
        return this.$store.state.countyDealer
      }

    },
    created:function(){
      this.getData()
    },
    mounted:function(){
      this.checkSystem($('.channelfan')) 
      


      
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.channelfan
  position: fixed
  top 0
  left 0
  right 0
  bottom 0
  background #eee

  .date
    height 50px 
    line-height 50px 
    background #eee
    width 100%
    padding 0 10px
    
  .content
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0px;
    top: 50px;
    bottom: 0;
    overflow auto
    .data
      position: absolute
      width 100%
      left 0px
      top 0
      bottom 0
      overflow auto
      box-sizing border-box
  .title
    position: relative
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    // border-1px(#af4040)
    background $mainColor
    color #fff
    font-size 18px
    font-weight: 400
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
.channelfan
  position: absolute
  width 100%
  left 0px
  top 0px
  bottom 0
  overflow auto
  .list
    width 100%
   
    
    border-1px(#eee)
    background #fff
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    &:active
      background rgba(0, 0, 0, .2)
    .box
    
      display flex
      height 50px
      line-height 50px
      padding 0 10px 

      .left
        flex 1
        margin-top 5px
        text-align left
        .name
          font-size 16px
          font-weight 500
        .money
          margin-top 10px
          font-size 13px
          font-weight 300
          opacity 0.7
          .num
            font-size 14px
            color #00a0e9
    .right
      flex 1
      margin-top 3px
      text-align right
      .creditline
        font-size 14px
        font-weight 500
      .installment
        font-size 13px
        font-weight 300
        margin-top 12px
        color #00a0e9
</style>
