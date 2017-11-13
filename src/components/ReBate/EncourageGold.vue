<template>
 <transition 
    enter-active-class="animated fadeInRight"
    mode="in-out"
    >
    <div class="encouragegold">
      <div class="title">
          <router-link to="/home/rebate" class="fa icon-left back" tag="i"></router-link>
          <span>收益-补贴</span>
      </div>
      <div class="content">
        <div class="data" id="encouragegold" v-if='!incomeInfo.length==0'>
          <ul>
            <li v-for='list in incomeInfo'  class="list" @click="openDetail(list)">
              <div class="left">
                  <div class="name">{{list.date | changDate}}月补贴 </div>                
              </div>
              <div class="right">
                <div class="fens_num">{{list.date_money}} <span class="fa icon-right"></span></div>
              </div>
            </li>
            
          </ul>

        </div>
        <div class="msg" v-if='incomeInfo.length==0'>暂无数据......</div>
      </div>
      
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
// import { Radio } from 'mint-ui'
export default {
    name:'encouragegold',
    data() {
      return {
          
      }
    },
    methods:{
     openDetail(list) {
        this.$store.dispatch('getSubsidyInfo',list)
        this.$router.push({path:'/home/rebate/rebatedetail'})
      },
      /* getData(type,id,store){
        $.ajax({
          url:this.BaseURL+'Income/income_detail',
          method:'get',
          data:{
            token:localStorage.getItem('token'),
            user_id:id,
            rebate_type:type
          },
          success:(res) => {
            // console.log(res)
            this.$store.dispatch(store,res);
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      }*/
    },
    filters:{
      changDate(value){
        return value.split('-')[1]
      }
    },
    computed:{
      incomeInfo:function(){
        return this.$store.state.incomeInfo.subsidy_list;
      }
    },
    watch:{
      
    },
    mounted:function(){
      this.checkSystem($('.encouragegold'))
       this.$nextTick(() => { 
        let encouragegoldscroll = new BScroll(document.getElementById('encouragegold'), {
        click:true
        })
      })
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.encouragegold
  position: absolute
  width 100%
  left 0px
  top 0
  bottom 0
  overflow auto
  -webkit-overflow-scrolling:touch
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
  .msg
    text-align center
    height 50px 
    line-height 50px
    color #c81623
  .list
    display flex
    width 100%
    height 50px
    line-height 50px
    padding 0 15px
    border-1px(#eee)
    background #fff
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    &:active
      background rgba(0, 0, 0, .2)
    .left
      flex 1
      text-align left
      
    .right
      flex 1a
      margin-top 0
      text-align right
      
        
</style>        
