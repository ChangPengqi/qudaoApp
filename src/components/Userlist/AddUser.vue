<template>
<transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
  <div class="addUser">
    <div class="title">
      <router-link to="/set/userlist" class="icon-left back" tag="i"></router-link>
      <span>添加角色</span>
      <!-- <router-link class="addUser" to="/home/cashdetail">添加角色</router-link> -->
    </div>
    <div class="main">
      <input class="add_ipt" type="text" name="" placeholder="请填写角色名称" v-model='ruleName'>
    </div>
     <div class="msg" v-if="msgKey"><el-alert :title="msg" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert></div>
    <div class="add_power" @click="confirm" >
      <button class="power_btn" >确定</button>
    </div>
    <div class="model" v-show="success">
      角色添加成功！
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name:'addUser',
  data () {
    return {
      ruleName:'',
      msg:'',
      msgKey:false,
      success:false,
      closeIcon:false
     
      /*dataList:powerObj*/
     
    }
  },
 
  computed:{
    /*ruleList(){     
      return this.$store.state.ruleInfo;
    },
    curPower(){
      return this.$store.state.curPower
    }*/
  },
  methods:{
    confirm(){
      if(this.ruleName.length==0){
        this.msgKey=true;
        this.msg='角色名称不能为空'
        setTimeout(()=>{
          this.msgKey=false;
          this.msg=''
        },2000)
      }else{
        $.ajax({
          url:this.BaseURL+'Rule/addGroup',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            title:this.ruleName,
          },
          success:(res) => {
            console.log(res)
            if(res.status==1){
              this.success=true;
               setTimeout(()=>{
              this.success=false
              this.$router.push({path:'/set/userlist'})
              },1000)
            }          
            this.$store.dispatch('getCurPowerInfo',{title:this.ruleName});
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })


      }
      
    }
    /*getData(){
        $.ajax({
          url:this.BaseURL+'Rule/ruleList',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
          console.log(res)
          
          this.$store.dispatch('getRuleInfo',res);
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
        
      },
      OpenOrClose(obj){
        if(obj.status==1){
          obj.status=0;
        }else if(obj.status==0){
          obj.status=1;
        }
        var that=this;
        $.ajax({
          url:this.BaseURL+'Rule/ruleGroup',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            ag_id:that.curPower.ag_id,
            ar_id:obj.ar_id,
            status:obj.status,
          },
          success:(res) => {
            
            console.log(res)
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
        
      },
      submitPower(){
        this.$router.push({path:'/set/userlist'})
      }*/
    
  },
 
  created:function(){
      /*this.getData()
      */
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
  .model
    position: relative
    margin 25% auto
    width 200px
    border-radius 6px
    height 60px
    line-height 60px
    background rgba(9,187,7,1)
    text-align center
    color #fff
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
  .msg
    width 90%
    margin 20px auto
    color #f00
    font-size 14px
    font-weight 500 
    text-align center
    height 50px
    line-height 50px    
  .main
    margin-top 10px
    .add_ipt
      width 100%
      height 40px
      line-height 40px
      border none
      outline none
      padding-left 15px
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
  .add_power
    margin-top 40px
    .power_btn
      display block
      width 90%
      margin 0 auto
      height $buttonHeight
      border none
      background $mainColor
      color #fff
      border-radius 6px
      font-size 16px
</style>
