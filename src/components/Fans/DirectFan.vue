<template>
  <transition
        name="custom-classes-transition"
         enter-active-class="animated fadeInRight"
    mode="in-out"
        >
    
    <div class="directfan" >
      
        <div class="title">
          <router-link to="/home/fans" class="fa icon-left back" tag="i"></router-link>
          <span>粉丝-直属</span>
        </div>
        <div class="content" >
            <div id="directfan" class="data" >
              <ul>
                <li  class="list" v-for="list in myfenlist.myfen_list"  @click='getDetailData(list)' >
                  <div class="left">
                    <div class="name"><span>{{list.date | changDate}}</span>月新增粉丝 </div>
                    
                  </div>
                  <div class="right">
                    <div class="fens_num">{{list.usercount}} <span class="fa icon-right"></span></div>
                    
                  </div>
                </li>
              </ul>
            </div>
            <div class="msg" v-if='myfenlist.myfen_list==false'>暂无数据</div>
          
        </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  	name:'directfan',
    data() {
      return {
         
      }
    },
    methods:{
      getData(){
         $.ajax({
          url:this.BaseURL+'fen/my_fen',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
            console.log(res); 
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getMyFenInfo',res);
            }
            setTimeout(function(){
                 let directfanscroll = new BScroll(document.getElementById('directfan'), { 
                    click:true,
                    bounceTime:300,
                    swipeBounceTime: 800  
                })
            },20)
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      },
      getDetailData(list){
        this.$store.dispatch('getFansDetailInfo',list);
        this.$router.push({path:'/home/fans/fansdetail'})
      }
    },
    filters:{
      changDate(value){
        return value.split('-')[1]
      }
    },
    created:function(){
      this.getData()

    },
    computed:{
      myfenlist:function(){
        return this.$store.state.myFenInfo;
      }
    },
    mounted:function(){
      this.checkSystem($('.directfan'))      
     
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"  
.directfan
  position: absolute
  width 100%
  left 0px
  top 0
  bottom 0
  overflow auto
  -webkit-overflow-scrolling:touch
  .msg
    color #c81623
    text-align center
    margin 10px 0
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
    z-index 200
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
  .content
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0px;
    top: 50px;
    bottom: 0;
    overflow auto

    
  .list
    display flex
    width 100%
    height 50px
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
      margin-top 5px
      text-align right
      .creditline
        font-size 14px
        font-weight 500
      .installment
        font-size 13px
        font-weight 300
        margin-top 10px
        color #00a0e9
</style>
