<template>
  <transition 
     enter-active-class="animated fadeInRight"
    mode="in-out"
    >
    <div class="stage" id="directfan">
      <ul>
        <li v-for="(list,index) of countyDetailInfo.fenlist" class="list" @click="openDetail(index,list.id)">
          <div class="left">
            <div class="name">{{list.nickname}}</div>
            <div class="money">消费总额 <span class="num">{{list.shop_total}}</span></div>
          </div>
          <div class="right">
            <div class="creditline">返利共计 {{list.fanmoneycount}}</div>
            <div class="installment">{{list.cishu}} 次分期购物</div>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'stage',
    data() {
      return {
         
      }
    },
    methods:{
      openDetail(index,user_id) {
        this.$router.push({path:'/home/countydetail/countyrebatedetail'});
        this.initData(user_id);
      },
      initData(id) {
        $.ajax({
          url:this.BaseURL+'Countydeal/fan_list',
          type:'get',
          data:{
            token:localStorage.getItem('token'),
            userid:id
          },
          success:(res) => {
            // console.log(res);
            if(res.status===-1){
              this.$router.push({path:'/login'})
            }else{
                this.$store.dispatch('getCountyRebateDetail',res);
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      },
    },
    computed:{
      countyDetailInfo:function(){
        return this.$store.state.countydetailinfo;
      }
    },
    mounted:function(){
      this.checkSystem($('.stage'))
      let directfanscroll = new BScroll(document.getElementById('directfan'), {
        click:true,
        bounceTime:300,
        swipeBounceTime: 800,
        checkDOMChanges:true
      })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.stage
  position: absolute
  width 100%
  left 0px
  top 0
  bottom 0
  overflow auto
  .list
    display flex
    width 100%
    height 70px
    padding 14px 15px
    border-1px(#eee)
    background #fff
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    &:active
      background rgba(0, 0, 0, .2)
    .left
      flex 1
      margin-top 4px
      text-align left
      .name
        font-size 15px
        font-weight 500
      .money
        margin-top 10px
        font-size 13px
        font-weight 300
        .num
          font-size 14px
          color #00a0e9
    .right
      flex 1
      margin-top 4px
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
