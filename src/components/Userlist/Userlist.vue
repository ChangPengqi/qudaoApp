<template>
<transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
  <div class="userlist">
    <div class="title">
      <router-link to="/set" class="icon-left back" tag="i"></router-link>
      <span>人员管理</span>
      <router-link class="addUser" to="/userlist/adduser" v-show='false'>添加角色</router-link>
    </div>
    <div class="main">
      <div class="item-list" v-for="list of userList">
        <div class="item">
          <div class="item_l" >
            <p class="item-name">{{list.title}}</p>
            <div class="item-cont" @click='getDetail(list)' >
              <router-link class="cont-num" to="/userlist/list" tag='div' >
                <span class="num">{{list.count}}</span>
                人
              </router-link>
            </div>
          </div>
          <div class="item_r">
             <router-link class="cont-edit" to="/adduser/setpower" tag='div'>
              <span class="txt" @click='editPower(list)'>编辑权限</span>
              <i class="edit_btn" ></i>
              </router-link>
          </div>
        </div>
      </div>
      <div class="msg" v-if='userList.length==0'>暂无数据....</div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</transition>
</template>

<script>
export default {
  name:'userlist',
  data () {
    return {
      
    }
  },
  computed:{
    userList(){
      return this.$store.state.userInfo;
    }
  },
  methods:{
    getData(){
        $.ajax({
          url:this.BaseURL+'Rule/groupList',
          type:'post',
          data:{
            token:localStorage.getItem('token'),
          },
          success:(res) => {
          console.log(res)
            if(res.status==-1){
              this.$router.push({path:'/login'})
            }else{
              this.$store.dispatch('getUserInfo',res);
            }
          },
          error:(res) => {
            console.log('Ajax error!')
          } 
        })
        
      },
      editPower(data){
        this.$store.dispatch('getCurPowerInfo',data);
      },
      getDetail(data){
        this.$store.dispatch('getCurUserList',data);
      }
  },
  created:function(){
      this.getData()

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
    .msg
      text-align center 
      margin 10px 0
      color $mainColor
    .item
      height 60px
      padding 0 15px
      border-bottom 1px solid #eee
      overflow hidden
      .item_l
        float left
        width 70%
        .item-name
          margin-top 10px
          color #333
          font-weight 500
          font-size 14px
        .item-cont
          display flex
          margin-top 10px
          .cont-num
            text-align left
            font-size 14px
          .num
            color #ff8600
            font-weight 500
            font-size 16px
            vertical-align middle
      .item_r
        float right
        width 30%
        margin-top 0
        position relative
        .cont-edit
          text-align right
          font-size 14px
          .txt
            padding 23px 0
            display inline-block
            padding-right 14px
          
          .edit_btn
            vertical-align bottom
            display inline-block
            width 11px
            height 12px
            background url('./edit.png') no-repeat 
            background-size cover
            position absolute
            top 24px
            right 0
</style>
