<template>
<transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
  <div class="addUser">
    <div class="title">
      <router-link to="/set/userlist" class="icon-left back" tag="i"></router-link>
      <span>权限</span>
      <!-- <router-link class="addUser" to="/home/cashdetail">添加角色</router-link> -->
    </div>

    <div class="main">
      <div class="item-list">
        <div class="item" v-for="list of outcurRuleList.rule_list"  >
          <span class="item-name">{{list.title}}</span>
          <span class="item-switch" >
            <span class="status"> {{list.status}}</span>
            <span>
            <i-switch v-model="list.value" @on-change="change(list)"></i-switch>
            <!-- <el-switch 
              v-model='list.value '
              on-text=""
              off-text=''
              on-color="#169416"
              off-color="#e5e5e5" @change='switchChange(list)'>
            </el-switch> -->
            </span>
          </span>
        </div>       
      </div>
      <div class="submit-btn">
        <button class="btn" @click='submitPower()'>提交</button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name:'addUser',
  components:{
    
  },
  data () {
    return { 
          
    }
  },
  filters:{
    transStatus(status){
      if(status==1){
        return true
      }else if(status==2) {
        return false
      }
    },
  },
  computed:{
    curRuleList(){  
      return this.$store.state.ruleInfo;
    },
    curPower(){
      return this.$store.state.curPower
    },
    ruleList(){
      return this.$store.state.rulelist
    },

    outcurRuleList(){
      var dataid1=[]
      var dataid2=[]
      var title=[]
      for(var attr in this.ruleList){
        dataid1.push(this.ruleList[attr].id)
        title.push(this.ruleList[attr].title)
      }
      for(var attr in this.curRuleList.rule_list){ 
        dataid2.push(this.curRuleList.rule_list[attr].ar_id)
      }
      for (var i=0;i<dataid1.length;i++) {
        if(dataid1[i]==dataid2[i]){
          this.curRuleList.rule_list[i].title= title[i]
        }
      }
      return this.curRuleList
    } 
  },
  methods:{
    change(obj){
      obj.status=obj.status==2?1:2
    },
   /* switchChange(obj){
      obj.status=obj.status==2?1:2
      
    },*/
    getRuleList(){
      $.ajax({
          url:this.BaseURL+'Rule/ruleList',
          type:'post',
          data:{
            token:localStorage.getItem('token'), 
          },
          success:(res) => {
          console.log(res)
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getRulelist',this.changeData(res));
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        }) 
    },
    getPowerRuleList(){
        $.ajax({
          url:this.BaseURL+'rule/ruleGroup',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            ag_id:this.curPower.ag_id
          },
          success:(res) => {
          var cook=[]
          for(var attr in res.rule_list){
            cook.push(res.rule_list[attr].status)
          }
          document.cookie=cook;
          console.log(res);
          this.$store.dispatch('getRuleInfo',this.changeData(res));
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })      
    },      
    changeData(obj){
        for(var attr in obj.rule_list){
            if(obj.rule_list[attr].status==1){
              obj.rule_list[attr].value=true
            }else if(obj.rule_list[attr].status==2){
              obj.rule_list[attr].value=false
            }  
          }
        return obj;
    },
    submitPower(){
        var arr1=[]//存储id
        for(var attr in this.outcurRuleList.rule_list){
          if(this.outcurRuleList.rule_list[attr].status==1)
            arr1.push(this.outcurRuleList.rule_list[attr].ar_id)  
        }
    

        /*var arr1=[]; // 保存全部id
        var arr2=[]; // 保存status
        var arr3=document.cookie.split(';')[0].split(','); // 保存cookie中的status 得到的为数组
        var arr4=[]; // 保存改变的id 得到的为数组
        var str1=''; // 保存cookie中的status 得到的为字符串
        var str2=''; // 保存改变的id  得到的为字符串
        for(var attr in this.outcurRuleList.rule_list){
            arr1.push(this.outcurRuleList.rule_list[attr].ar_id)
            arr2.push(this.outcurRuleList.rule_list[attr].status)
        }

        for(var i=0; i<arr1.length; i++){
          if(arr2[i]!=arr3[i]){
            arr4.push(arr1[i])
          }
        }
        str2=arr4.join(',')
        console.log(arr3)*/
        /*str=arr.join(',')*/
        $.ajax({
          url:this.BaseURL+'Rule/doRuleGroup',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            ag_id:this.curPower.ag_id,
            ar_id:arr1.join(','),           
          },
          success:(res) => {
            this.$router.push({path:'/set/userlist'})
            console.log(res)
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })  
      }
    
  },
 
  created:function(){
      this.getPowerRuleList()
      this.getRuleList()
  },
   mounted:function(){
    this.checkSystem($('.addUser'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.addUser
  position: fixed
  top 0
  left 0
  bottom 0
  width 100%
  background #eee
  .title
      position: relative
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
  .main
    position: absolute
    top $barHeight
    width 100%
    bottom 0
    overflow auto
    -webkit-overflow-scrolling:touch
    .item-list
      background #fff
      .item
        height 50px
        line-height 50px
        padding 0 15px
        border-bottom 1px solid #eee
        .el-switch
          padding 0
        .item-name
          float left
          font-size 15px
          color #333
          font-weight 500
        .item-switch
          float: right
    .submit-btn
      margin-top 30px
      margin-bottom 60px
      .btn
        display block
        width 90%
        height $buttonHeight
        margin 0 auto
        border none
        outline none
        border-radius 6px
        font-size 16px
        color #fff
        background $mainColor
  

</style>
