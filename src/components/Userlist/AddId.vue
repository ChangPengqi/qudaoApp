<template>
<transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
  <div class="addId">
    <div class="title">
      <router-link to="/userlist/list" class="icon-left back" tag="i"></router-link>
      <span>添加帐号</span>
      <!-- <router-link class="addUser" to="/home/cashdetail">添加角色</router-link> -->
    </div>
    <div class="main">
      <input class="add_ipt" type="text" name="" placeholder="帐号" v-model='userName'>
      <input class="add_ipt" type="password" name="" placeholder="密码" v-model='pwd'>     
     <!--  <span class="showRole" ref="showRole" @click.prevent="selecteRole"  :value="role">角色</span> -->
     <div class="showRole">角色<span class="">{{this.curUserList.title}}</span></div>
      <!-- <div class="container" ref="container"></div> -->
      <div class="msg" v-if='msgKey'><el-alert :title="message" type="error" show-icon :closable='closeIcon' style='width:80%;margin:0 10%'></el-alert></div>
    </div>
    <div class="add_power">
      <button class="power_btn" @click="submit_newId">提交</button>
    </div>
    <!-- <msg :message="tips" :msgKey="tipsKey"></msg> -->
  </div>
</transition>
</template>

<script>


/*const data = [
    {'id': '01', 'value': '销售'},
    {'id': '02', 'value': '财务'},
    {'id': '03', 'value': '人事'},
    {'id': '04', 'value': '技术'},
    {'id': '05', 'value': '客服'},
    {'id': '06', 'value': '渠道'},
    {'id': '07', 'value': '风控'},
    {'id': '08', 'value': '会计'},
];*/

/*import IosSelect from './merge/iosSelect.js'*/
import Msg from 'components/Msg/Msg'
export default {
  name:'addId',
  components:{
    Msg
  },
  data (){
    return {
    /*  data:data,*/
      msgKey:false,
      userName:'',
      pwd:'',
      messaage:'',
      closeIcon:false
    }
  },
  created:function(){

  },
  computed:{
    curUserList(){
      return this.$store.state.curUserList
    }
  },
  methods:{
    // selecteRole (){    
    //   var _this=this;
    //   var roleSelect = new IosSelect(1, 
    //         [this.data],
    //         {
    //             container: '.container',
    //             title: '角色选择',
    //             itemHeight: 60,
    //             itemShowCount: 3,
    //             callback (data){  
    //               _this.$refs.showRole.innerHTML=data.value;                
    //               _this.$refs.showRole.dataset['id']=data.id;
    //               _this.$refs.showRole.dataset['value']=data.value;
    //             }                
    //     });
    // },
    submit_newId () {
      //post 数据 成功      
        /*this.openMsg({delay:1000,txt:'添加成功'})*/
        if(this.userName.length!=0 && this.pwd.length!=0){
            $.ajax({
              url:this.BaseURL+'Rule/doAddAdmin',
              type:'post',
              data:{
                token:localStorage.getItem('token'),
                admin_account:this.userName,
                admin_password:this.pwd,
                group_ids:this.curUserList.ag_id,
              },
              success:(res) => {
                console.log(res.info)
                if(res.status==-1){
                  this.msgKey=true;
                  this.message=res.info;
                  setTimeout(() => {
                    this.msgKey=false;
                    this.password=''
                  },2000)
                }else{
                  this.$router.push({path:'/userlist/list'})
                }
                
              
              //this.$store.dispatch('getUserListInfo',res);
              
              },
              error:(res) => {
                console.log('Ajax error!')
              } 
            })
          }else{
            this.msgKey=true;
            this.message='账户名和密码不能为空'
            setTimeout(() => {
              this.msgKey=false;
              this.password=''
            },2000)
          }

         
         
    },
    /*openMsg (options){
      this.tips=options.txt;
      this.tipsKey=true;
      this.closeMsg(options.delay);
    },
    closeMsg (delay){
      setTimeout(() =>{
        this.tipsKey=false;
      },delay)
    }*/
  },
   mounted:function(){
    this.checkSystem($('.addId'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="stylus">
@import './merge/iosSelect.css'
@import "../../common/index.styl"
.addId
  position: fixed
  top 0
  left 0
  bottom 0
  width 100%
  background #eee
  .msg
    width 90%
    margin 0 auto
    color #f00
    font-size 14px
    font-weight 500
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
    background #eee
    .add_ipt
      width 100%
      height 45px
      line-height 45px
      border none
      outline none
      margin-bottom 10px
      padding-left 15px      
    .showRole
      display inline-block
      width 100%
      height 45px
      line-height 45px
      border none
      outline none
      margin-bottom 10px
      padding-left 15px
      padding-right 30px
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background #fff 
      span
        display inline-block
        width 80%
        text-align center
  .add_power
    margin-top 80px
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
