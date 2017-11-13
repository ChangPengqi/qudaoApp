<template>
  <div class="headdetail">
    <div class="title">
      <router-link to="/msgs/headlines" class="fa icon-left back" tag="i"></router-link>
      <span>就趣头条</span>
    </div>
    <div class="content" id="headdetail">
      <h3 class="headtitle">{{content.title}}</h3 class="headtitle">
      <p class="time">{{content.ctime | formdata}}</p>
      <p class="para"> {{content.content | transToHtml}} </p>
    <!--  <img src="./kuaibao.jpg" width="100%"> -->
      <!-- <p class="para">当日上午九点，就趣董事长以及公司各级高层领导和各界友人一起出席了挂牌仪式。随着铜锣的鸣声响起，他们共同见证了就趣上市的这一辉煌时刻，现场的掌声如雷鸣般响彻整个会场，气氛空前热烈，众人纷纷向就趣表示热烈祝贺。</p> -->
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'headdetail',
  
  data () {
    return {
     /* content:{}*/
     
    }
  },
  created(){
    /*this.getData(location.search.split('=')[1])*/
  },
  computed:{
    content:function(){
      return this.$store.state.jqcontent;
    }
  },
  filters:{

    transToHtml(string){
        var newStr='<div>'+string+'</div>'
      return $(newStr).text()
      

    }
  },
  methods:{
     /* getData(id){ 
        $.ajax({
          url: 'http://qvdao.jqugo.com/Topline/art_content',
          type: 'post',
          dataType: 'json',
          data: {art_id:id},
          success:function(res){
            if(res.status==1){
              this.content=res.info;

            }

          }
        })
        
         
      }*/
  },
  mounted:function(){
    this.checkSystem($('.headdetail'))
  }
  // mounted:function(){
  //    let msgscroll = new BScroll(document.getElementById('headdetail'), {
  //       // click:true
  //     })
  // }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.headdetail
  position:fixed;
  top 0
  left 0
  width 100%
  bottom 0
  background #fff
  .title
    position: relative;
    top 0
    left 0
    width 100%
    height $barHeight
    line-height $barHeight
    text-align center
    color #fff
    background $mainColor
    font-size 18px
    font-weight 400
    .back 
      position: absolute
      left 0
      width $barHeight
      line-height $barHeight
  .content
    position: absolute
    z-index 100
    top: $barHeight
    bottom 0
    left 0
    right 0
    width 100%
    padding 15px 10px
    overflow auto
    -webkit-overflow-scrolling:touch
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .headtitle
      font-size 17px
    .time
      margin 15px 0
      font-size 13px
      color #999
    .para
      line-height: 1.7;
      font-size: 15px
      font-weight 400
      text-indent 2em      
</style>
