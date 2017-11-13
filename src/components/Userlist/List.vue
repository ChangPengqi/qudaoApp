<template>
<transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
  <div class="userlist">
    <div class="title">
      <router-link to="/set/userlist" class="icon-left back" tag="i"></router-link>
      <span>列表</span>
      <router-link class="addUser" to="/userlist/list/addid">添加帐号</router-link>
    </div>
    <div class="main">
      <div class="item-list" v-for="(list,index) of userList">
        <div class="item">
          <div class="item-name">
            <span class="name">{{list.account}}</span>
            <span class="job">{{list.title}}</span>
          </div>
          <div class="item-del">
            <button class="del" @click="removeuser(list)">删除</button>
          </div>
        </div>
        
      </div>
      <div class="dialog-wrap" v-show="dialog">
          <div class="mark"></div>
          <div class="dialog">
            <div class="title">确定删除吗？</div>
            <div class="btnGrounp">
              <button class="no" @click='removeNo()'>取消</button>
              <button class="yes" @click='removeYes()'>确定</button>
            </div>
          </div>
      </div>
    </div>
    
  </div>
</transition>
</template>

<script>
/*const list = [
  {name:'张三',job:'销售经理'},
  {name:'李四',job:'销售经理'},
  {name:'王五',job:'销售经理'},
  {name:'谢广坤',job:'销售经理'},
  {name:'赵四',job:'销售经理'},
  {name:'刘能',job:'销售经理'},
]*/
export default {
  name:'userlist',
  data (){
    return {
     /* userlist:list,*/
      dialog:false,
      removeName:'',
      listId:''
    }
  },
  created:function(){
    this.getData(this.curUserList.ag_id)
  },
  computed:{
    curUserList(){
      return this.$store.state.curUserList
    },
    userList:function(){
      return this.$store.state.userListInfo;
    },
    adminUserOne:function(){
      return this.$store.state.adminUserOne
    }


  },
  methods:{
    getData(id){
       $.ajax({
          url:this.BaseURL+'Rule/groupAdminList',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            ag_id:id
          },
          success:(res) => {
          console.log(res)
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getUserListInfo',res);
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })

    },
    
    removeuser(data){
      this.dialog=true;
      this.$store.dispatch('getAdminUserOne',data)
    },
  /*  removeList (index,name){
      this.dialog=true;
      // this.userlist.splice(index,1);
      this.removeName=name;
      this.listId=index;
    },*/
    removeYes(){
      $.ajax({
          url:this.BaseURL+'Rule/deleteAdmin',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
            user_id:this.adminUserOne.user_id
          },
          success:(res) => {
            console.log(res)
            this.dialog=false;
            this.getData(this.curUserList.ag_id)
            this.$store.dispatch('getUserListInfo',res);
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
      
    },
    removeNo (){
      this.dialog=false;
    }
  },
   mounted:function(){
    this.checkSystem($('.userlist'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.userlist
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
      .addUser
        position: absolute
        width 60px
        right 0
        font-size 14px
        color #fff
        padding-right 15px
  .main
    background #fff
    position:absolute;
    top 50px
    bottom 0
    width 100%
    overflow auto
    -webkit-overflow-scrolling:touch
    .item
      display flex
      height 60px      
      padding 0 15px
      border-bottom 1px solid #eee
      overflow hidden
      .item-name
        flex 1
        margin-top 10px
        font-size 14px
        font-weight 500
        .name
          display block
          overflow hidden
          color #333
        .job
          display inline-block
          margin-top 10px
          color #999
      .item-del
        flex 1
        line-height 60px
        text-align right
        margin-right 10px
        .del
          border 1px solid #ff8600
          border-radius 4px
          padding 3px 8px
          color #ff8600
          outline none
          background none
  .dialog-wrap
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    .mark
      position:absolute;
      width: 100%
      top 0
      bottom 0
      background rgba(0, 0, 0, .4)
    .dialog
      position: absolute
      width 80%
      height 110px
      top: 40%;
      margin-left 10%
      border-radius 4px
      background #fff
      overflow hidden
      .title
        width 100%
        height 60px
        line-height 60px
        background #fff
        color #333
        border-bottom 1px solid #eee
      .btnGrounp
        display flex
        button
          flex 1
          height 50px
          border none
          font-size 15px
          background #fff
          &:first-child
            border-right 1px solid #eee
          &:active
            background #c81623
            color #fff
</style>
