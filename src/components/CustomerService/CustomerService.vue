<template>
    <div class="customerservice">
        <section class="head">
            <router-link to="/msgs" class="fa icon-left back" tag="i"></router-link>
            我的客服
        </section>
        <section class="chatlist" :class="showSelBox>0?'chatlist-bottom-collapse':'chatlist-bottom'">            
                <ul>
                    <template v-for="item in records">
                        <li class="chat-mine" v-if="item.type==1">
                            <div class="chat-user"><img v-if='avatar' :src='avatar'><img v-if='!avatar' src='./user_default.png'></div>
                            <div class="time"><cite><i>{{item.time}}</i>{{item.name}}</cite></div>  
                            <div class="chat-text" v-html="(item.content)"></div>                          
                        </li>
                        <li v-if="item.type==2">
                            <div class="chat-user"><img src="./default.png"></div>
                            <div class="time"><cite>{{item.name}}<i>{{item.time}}</i></cite></div> 
                            <div class="chat-text" v-html="(item.content)"></div>                           
                        </li>
                    </template>
                </ul>            
        </section>
        <section class="foot">  
            <input class="con" v-model="content" placeholder="请输入消息">          
            <span class="btn btn-send" v-on:click="sendMsg">发送</span>           
        </section>
    </div>
</template>

<script>
import util from './util'
export default {
    name: 'customerservice',
    data() {
        var _this=this;
        return {
            showSelBox: 0, // 0隐藏 1显示表情 2显示其他
            selFace: '表情',
            selOther: '其他功能',
            content:'',
            topStatus: '',
            //聊天记录
            records: [{
                type: 1,
                time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                name: '',
                content: '你好！'
            }, {
                type: 2,
                time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                name: '客户MM',
                content: '您好，这里是就趣购客服！'
            }],
            // 表情
          
        }
    },
    created:function(){
        console.log(this.myinfo)
     this.records[0].name=this.myinfo
      
    },
    computed:{
        myinfo:function(){
            return this.$store.state.myinfo.username;
        },
        avatar:function(){
            return this.$store.state.homeinfo.touxiang;
        },
    },
    methods: {
        //发送消息
        sendMsg: function(){
            var _this=this;

            if(this.content==''){
                
                return;
            }

            this.records.push({
                type: 1,
                time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                name: this.myinfo,
                content: _this.content
            });

            setTimeout(function(){
                _this.records.push({
                    type: 2,
                    time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                    name: '客服MM',
                    content: '您好，很高兴为您服务！'
                });
            },500);

            this.content='';

            this.scrollToBottom();
            this.focusTxtContent();//聚焦输入框
        
        },
        //聚焦输入框
        focusTxtContent:function(){
            document.querySelector(".con").focus();
        },
        //滚动条滚动到底部
        scrollToBottom:function(){
            setTimeout(function(){
                var chatlist = document.getElementsByClassName('chatlist')[0];
                chatlist.scrollTop=chatlist.scrollHeight;
            },500);
        },
        
    },
    mounted:function(){
        this.checkSystem($('.customerservice'))
        this.scrollToBottom();
        this.focusTxtContent();
    }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/index.styl"
.customerservice
  position:fixed;
  top 0
  left 0
  width 100%
  bottom 0
  background #fff
  .head
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
</style>
<style scoped>
    .chatlist {
        position: absolute;
        top: 50px;
        bottom: 50px;
        left: 0px;
        right: 0px;
        overflow: auto;
        -webkit-overflow-scrolling:touch;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    
    .chatlist-bottom {
        bottom: 48px;
    }
    
    .chatlist-bottom-collapse {
        bottom: 198px;
    }
    
    .chatlist ul {
        min-height: 300px;
    }
    
    .chatlist ul .chat-mine {
        text-align: right;
        padding-left: 0;
        padding-right: 60px;
    }
    
    .chatlist ul li {
        position: relative;
        /*font-size: 0;*/
        margin-bottom: 10px;
        padding-left: 60px;
        min-height: 68px;
    }
    
    .chat-mine .chat-user {
        left: auto;
        right: 3px;
    }
    
    .chat-user {
        position: absolute;
        left: 3px;
    }
    
    .chat-text,
    .chat-user {
        display: inline-block;
        vertical-align: top;
        /*font-size: 14px;*/
    }
    
    .chat-user img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }
    
    .time {
        width: 100%;
    }
    
    cite {
        left: auto;
        right: 60px;
        text-align: right;
    }
    
    cite {
        font-style: normal;
        line-height: 24px;
        font-size: 12px;
        white-space: nowrap;
        color: #999;
        text-align: left;
    }
    
    cite i {
        font-style: normal;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 12px;
    }
    
    .chat-mine .chat-text {
        margin-left: 0;
        text-align: left;
        background-color: #33DF83;
        color: #fff;
    }
    
    .chat-text {
        position: relative;
        line-height: 22px;
        /*margin-top: 25px;*/
        padding: 6px 8px;
        background-color: #eee;
        border-radius: 3px;
        color: #333;
        word-break: break-all;
        max-width: 462px\9;
    }
    
    .chat-text,
    .chat-user {
        display: inline-block;
        vertical-align: top;
        font-size: 15px;
    }
    
    .chat-text img {
        max-width: 100%;
        vertical-align: middle;
    }
    
    .chat-user {
        position: absolute;
        left: 3px;
    }
    
    .chat-text:after {
        content: '';
        position: absolute;
        left: -10px;
        top: 15px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #eee transparent transparent;
        overflow: hidden;
        border-width: 10px;
    }
    
    .chat-mine .chat-text:after {
        left: auto;
        right: -10px;
        border-top-color: #33DF83;
    }
    
    .foot {
        width: 100%;
        min-height: 48px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        background-color: #F8F8F8;
    }
    
    .foot .con {
        position: absolute;
        left: 5%;
        right:0;
        top:10%;
        height: 80%;
        width: 70%;
        border: none;
        padding-left: 10px;
        background:#fff;
        border-radius: 6px;
        line-height: 100%
    }
    .btn {
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        line-height:40px;
        margin-left: 5px;
        padding: 0 6px;
        background: #33DF83;
        color: #fff;
        border-radius: 3px;
    }
    
    .btn-send {
        position: absolute;
        right: 4px;
        top: 10%;
        width: 15%;
        height: 80%;
        line-height: 40px;
        text-align: center;
        box-shadow: 0px 0px 1px rgba(0,0,0,.5);
    }
    .btn-send:active{
        background:#67c180;
    }
</style>