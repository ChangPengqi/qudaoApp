import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store={
    	state:{
        loginInfo:{},//登录信息
    		homeinfo:{}, //首页信息
        myinfo:{},  //我的信息
        qualification:{},//资质信息列表
        province:[], //省份信息
        city:[], // 市信息

        incomeInfo:{}, //收益总列表


        rebatelist:{},//返利列表
        encouragelist:{},//鼓励金列表
        stages:{},//收益分期

        activecredit:{},//收益激活信用钱包
        countyinfo:[],//区县管理中心
        countydetailinfo:{}, //county_id县详情 type=0
        countydetailinfoone:{},//county_id县详情 type=1
        county_name:'',
        countyrebatedetail:[],//返利明细
        countystagedetail:{},//分期
        countycreditdetail:{},//激活信用钱包 

        fansList:{},//粉丝列表

        fansDetailList:{},//粉丝明细
        fansDetailistInfo:{},// 粉丝明细详情列表

        


        consumeDetail:{},
        chaFansDetail:{},
        chaFansDetailistInfo:{},



        fansRebateDetail:[],//粉丝返利明细
        fansStageDetail:{},//粉丝分期详情
        fenCountryInfo:{},
        jqnews:[],//就趣头条
        jqcontent:{},//就趣详情
        jqnotice:[],//消息通知
        qrcode:'',//二维码
        cardInfo:{},//银行卡信息

        card:{},
        cashInfo:[],

        cashDetail:{},
        myOneCard:{},
        userInfo:{},
        ruleInfo:{},
        withdrawInfo:{},
        curPower:{},
        /*ruleDditInfo:{}*/
        rulelist:{},
        
        consumeDetailOne:{},
        consumeDetail:{},
        subsidyInfo:{},
        subsidydetail:{},
        myFenInfo:{},
        userListInfo:{},
        curUserList:{},
        adminUserOne:{},
        countyDealer:{},
        countylistDate:{},
        fanlistinfo:{},
        rebateDetailInfo:{}
      


    	},
    	mutations:{
        GET_LOGININFO(state,info){
          //获取登录信息
          state.loginInfo=info;
        },
        GET_HOMEINFO (state,info){
          //获取首页信息
          state.homeinfo=info;
        },
        GET_MYINFO (state,info){
          //获取我的信息
          state.myinfo=info;
        },
        GET_QUALIFICATION(state,info){
          //获取资质信息
          state.qualification=info;
        },
        GET_PROVINCE(state,info){
          //获取省份信息
          state.province=info;
        },
        GET_CITY(state,info){
          //获取市信息
          state.city=info;
        },
        GET_INCOMEINFO(state,info){
          state.incomeInfo=info;
        },

       


        GET_REBATELIST (state,info){
          //获取返利列表
          state.rebatelist=info;
        },
        GET_ENCOURAGELIST (state,info){
          //获取鼓励金列表
          state.encouragelist=info;
        },
        GET_STAGEDETAIL (state,info){
          //获取分期详情
          state.stages=info;
        },
        GET_ACTIVECREDIT (state,info){
          //获取激活信用钱包
          state.activecredit=info;
        },
        GET_FENCOUNTRYINFO(state,info){
          state.fenCountryInfo=info;
        },
        GET_COUNTYINFO (state,info){
          //获取区县信息
          state.countyinfo=info;
        },
        GET_COUNTYDETAILINFO (state,info){
          //获取county_id县详情 type=0
          state.countydetailinfo=info;
        },
        GET_COUNTYDETAILINFOONE (state,info){
          //获取county_id县详情 type=1
          state.countydetailinfoone=info;
        },
        GET_COUNTYNAME (state,info){
          //获取county_name
          state.county_name=info
        },
        GET_COUNTYREBATEDETAIL (state,info){
          //获取county返利明细
          state.countyrebatedetail=info
        },
        GET_COUNTYSTAGEDETAIL (state,info){
          //获取county分期明细
          state.countystagedetail=info
        },
        GET_COUNTYCREDITDETAIL (state,info){
          //获取激活信用钱包明细
          state.countycreditdetail=info
        },
        GET_FANSINFO (state,info){
          //获取粉丝信息
          state.fansList=info;
        },
        GET_FANSDETAILINFO (state,info){
          //获取粉丝明细信息
          state.fansDetailList=info;
        },
        GET_FANSDETAILISTINFO(state,info){
          //获取粉丝明细详情列表信息
          state.fansDetailistInfo=info
        },
       


        GET_CONSUMEDETAIL(state,info){
          state.consumeDetail=info
        },
        GET_CHAFANSDETAIL(state,info){
          state.chaFansDetail=info
        },
        GET_CHAFANSDETAILISTINFO(state,info){
          state.chaFansDetailistInfo=info
        },


        GET_FANREBATEINFO (state,info){
          //获取粉丝返利明细信息
          state.fansRebateDetail=info;
        },
        GET_FANSTAGEINFO (state,info){
          //获取粉丝分期明细信息
          state.fansStageDetail=info;
        },
        GET_JQNEWSINFO (state,info){
          //获取就趣头条信息
          state.jqnews=info;
        },
        GET_JQCONTENTINFO (state,info){
          //获取就趣头条单条信息
          state.jqcontent=info;
        },
        GET_JQNOTICEINFO (state,info){
          //获取消息通知信息
          state.jqnotice=info;
        },
        GET_QRCODEINFO (state,info){
          //获取二维码信息
          state.qrcode=info;
        },
        GET_RULEEDITINFO(state,info){
          state.ruleDditInfo=info
        },
      





        GET_CARDINFO(state,info){
          //获取银行卡信息
          state.cardInfo=info;
        },

        GET_CARD(state,info){
          state.card=info;
        },
        GET_CASHINFO(state,info){
          state.cashInfo=info;
        },
        GET_CASHDETAIL(state,info){
          state.cashDetail=info;
        },
        GET_MYONECARD(state,info){
          state.myOneCard=info
        },
        GET_USERINFO(state,info){
          state.userInfo=info;
        },
       GET_RULEINFO(state,info){
          state.ruleInfo=info
        },

        GET_WITHDRAWINFO(state,info){
          state.withdrawInfo=info;
        },
        GET_CURPOWERINFO(state,info){
          state.curPower=info
        },
        GET_RULELIST(state,info){
          state.rulelist=info
        },

        GET_CONSUMEDETAILONE(state,info){
          state.consumeDetailOne=info
        },
        GET_SUBSIDYINFO(state,info){
          state.subsidyInfo=info
        },
        GET_SUBSIDYDETAIL(state,info){
          state.subsidydetail=info
        },
        GET_MYFENINFO(state,info){
          state.myFenInfo=info
        },
        GET_USERLISTINFO(state,info){
          state.userListInfo=info
        },
        GET_CURUSERLIST(state,info){
          state.curUserList=info
        },
        GET_ADMINUSERONE(state,info){
          state.adminUserOne=info
        },
        GET_COUNTYDEALER(state,info){
          state.countyDealer=info
        },
        GET_COUTYLISTDATE(state,info){
          state.countylistDate=info
        },
        GET_FANLISTINFO(state,info){
          state.fanlistinfo=info
        },
        GET_REBATEDETAILINFO(state,info){
          state.rebateDetailInfo=info
        },

    


    	},
      actions:{
        getLoginInfo({commit},info){
          commit('GET_LOGININFO',info)
        },
        getHomeInfo ({commit},info){
          commit('GET_HOMEINFO',info)
        },
        getMyInfo ({commit},info){
          commit('GET_MYINFO',info)
        },

        getQualification ({commit},info){
          commit('GET_QUALIFICATION',info)
        },
        getProvince ({commit},info){
          commit('GET_PROVINCE',info)
        },
        getCity({commit},info){
          commit('GET_CITY',info)
        },

        getIncomeInfo({commit},info){
          commit('GET_INCOMEINFO',info)
        },


       



        getRebateList({commit},info){
          commit('GET_REBATELIST',info)
        },
        getEncourageList({commit},info){
          commit('GET_ENCOURAGELIST',info)
        },
        getStageDetail({commit},info){
          commit('GET_STAGEDETAIL',info)
        },
        getActiveCredit({commit},info){
          commit('GET_ACTIVECREDIT',info)
        },

        getFenCountryInfo({commit},info){
          commit('GET_FENCOUNTRYINFO',info)
        },


        getCountyInfo({commit},info){
          commit('GET_COUNTYINFO',info);
        },
        getCountyDetailInfo({commit},info){
          commit('GET_COUNTYDETAILINFO',info);
        },
        getCountyDetailInfoOne({commit},info){
          commit('GET_COUNTYDETAILINFOONE',info);
        },
        getCountyName({commit},info){
          commit('GET_COUNTYNAME',info);
        },
        getCountyRebateDetail({commit},info){
          commit('GET_COUNTYREBATEDETAIL',info);
        },
        getCountyStageDetail({commit},info){
          commit('GET_COUNTYSTAGEDETAIL',info);
        },
        getCountyCreditDetail({commit},info){
          commit('GET_COUNTYCREDITDETAIL',info);
        },
        getFansInfo({commit},info){
          commit('GET_FANSINFO',info);
        },
        getFansDetailInfo({commit},info){
          commit('GET_FANSDETAILINFO',info);
        },
        getFansDetailistInfo({commit},info){
          commit('GET_FANSDETAILISTINFO',info)
        },
     
        getConsumeDetail({commit},info){
          commit('GET_CONSUMEDETAIL',info)
        },
        getChaFansDetailInfo({commit},info){
          commit('GET_CHAFANSDETAIL',info)
        },
        getChanFansDetailistInfo({commit},info){
          commit('GET_CHAFANSDETAILISTINFO',info)
        },


        getFansRebateInfo({commit},info){
          commit('GET_FANREBATEINFO',info);
        },
        getFansStageInfo({commit},info){
          commit('GET_FANSTAGEINFO',info);
        },
        getJqNewsInfo({commit},info){
          commit('GET_JQNEWSINFO',info);
        },


        getJqContentInfo({commit},info){
          commit('GET_JQCONTENTINFO',info);
        },


        getJqNoticeInfo({commit},info){
          commit('GET_JQNOTICEINFO',info);
        },
        getQrcodeInfo({commit},info){
          commit('GET_QRCODEINFO',info);
        },



        getCardInfo({commit},info){
          commit('GET_CARDINFO',info)
        },

        getFirstStepCardInfo({commit},info){
          commit('GET_CARD',info)
        },
        getCashInfo({commit},info){
          commit('GET_CASHINFO',info)
        },
        getCashDetailInfo({commit},info){
          commit('GET_CASHDETAIL',info)
        },
        getMyCardInfo({commit},info){
          commit('GET_MYONECARD',info)
        },
        getUserInfo({commit},info){
          commit('GET_USERINFO',info)
        },
        getRuleInfo({commit},info){
          commit('GET_RULEINFO',info)
        },
        getWithDrawInfo({commit},info){
          commit('GET_WITHDRAWINFO',info)
        },

        getCurPowerInfo({commit},info){
          commit('GET_CURPOWERINFO',info)
        },
       /* getRuleEditInfo({commit},info){
          commit('GET_RULEEDITINFO',info)
        }*/

        getRulelist({commit},info){
          commit('GET_RULELIST',info)
        },

        getConsumeDetailOne({commit},info){
          commit('GET_CONSUMEDETAILONE',info)
        },
        getSubsidyInfo({commit},info){
          commit('GET_SUBSIDYINFO',info)
        },
        getSubsidydetail({commit},info){
          commit('GET_SUBSIDYDETAIL',info)
        },

        getMyFenInfo({commit},info){
          commit('GET_MYFENINFO',info)
        },
        getUserListInfo({commit},info){
          commit('GET_USERLISTINFO',info)
        },
        getCurUserList({commit},info){
          commit('GET_CURUSERLIST',info)
        },
        getAdminUserOne({commit},info){
          commit('GET_ADMINUSERONE',info)
        },
        getCountydealer({commit},info){
          commit('GET_COUNTYDEALER',info)
        },
        getCountylistDate({commit},info){
          commit('GET_COUTYLISTDATE',info)
        },
        getFanlistInfo({commit},info){
          commit('GET_FANLISTINFO',info)
        },
        getRebateDetailInfo({commit},info){
          commit('GET_REBATEDETAILINFO',info)
        },

       
      }
}

export default new Vuex.Store(store)