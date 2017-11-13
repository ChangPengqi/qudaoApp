/*
import GuidePages from 'components/GuidePages/GuidePages'
import Login from 'components/Login/Login'
import Footer from 'components/Footer/Footer'
//首页
import Home from 'components/Home/Home.vue'
//收益
import ReBateMain from 'components/ReBate/ReBateMain'
import EncourageGold from 'components/ReBate/EncourageGold'
import ReBateDetail from 'components/ReBate/ReBateDetail'
import ReBateCreditDetail from "components/ReBate/ReBateCreditDetail"
import ReBate from 'components/ReBate/ReBate'
//提现
import CashDetail from 'components/Cash/CashDetail'
import ExpenDetail from 'components/Cash/ExpenDetail'
import MyCard from 'components/Cash/MyCard'
import AddCard from 'components/Cash/AddCard'
import AddCardInfo from 'components/Cash/AddCardInfo'
import WithDrawal from 'components/Cash/WithDrawal'
import WithDrawalResult from 'components/Cash/WithDrawalResult'
import WithDrawalProcess from 'components/Cash/WithDrawalProcess'
//粉丝
import Fans from 'components/Fans/Fans'
import DirectFan from 'components/Fans/DirectFan'
import ChannelFan from 'components/Fans/ChannelFan'
import FansDetail from 'components/FansDetail/FansDetail'
import FansReBateDetail from 'components/FansDetail/FansReBateDetail'
import FansInstallmentDetail from 'components/FansDetail/FansInstallmentDetail'
import ActiveCreditDetail from 'components/FansDetail/ActiveCreditDetail'
//二维码
import QrCode from 'components/QrCode/QrCode'
import QrCodeLoad from 'components/QrCode/QrCodeLoad'
//县级分销商
import CountyDealer from 'components/CountyDealer/CountyDealer'
import DealerApply from 'components/DealerApply/DealerApply'
import CountyDetail from 'components/CountyDetail/CountyDetail'
import CountyFreeze from 'components/CountyState/CountyFreeze'
import CountyAudit from 'components/CountyState/CountyAudit'
import Stage from 'components/CountyDetail/Stage'
import Credit from 'components/CountyDetail/Credit'
import CountyReBateDetail from 'components/CountyDetail/CountyReBateDetail'
import CountyInstallmentDetail from 'components/CountyDetail/CountyInstallmentDetail'
import CountyActiveCreditDetail from 'components/CountyDetail/CountyActiveCreditDetail' 
//数据分析
import DataAnalysis from 'components/DataAnalysis/DataAnalysis.vue'
import FansChart from 'components/DataAnalysis/main/FansChart.vue'
import AreaChart from 'components/DataAnalysis/main/AreaChart.vue'
import BuyChart from 'components/DataAnalysis/main/BuyChart.vue'
import HabitChart from 'components/DataAnalysis/main/HabitChart.vue'
//动态
import Msgs from 'components/Msgs/Msgs'
import Headlines from 'components/Msgs/Headlines'
import HeadDetail from 'components/Msgs/HeadDetail'
import Notice from 'components/Msgs/Notice'
import CustomerService from 'components/CustomerService/CustomerService'
//我的
import My from 'components/My/My'
//设置
import Seter from 'components/Set/Set.vue'
import Person from 'components/Set/CenterSet/Person'
import AvatarPre from "components/AvatarPre/AvatarPre"
import LoginPass from 'components/Set/CenterSet/LoginPass'
import PayPassReset from 'components/Set/CenterSet/PayPassReset'
import PayPassSelect from 'components/Set/CenterSet/PayPassSelect'
import PayPassFor from 'components/Set/CenterSet/PayPassFor'
import PayPassForSet from 'components/Set/CenterSet/PayPassForSet'
import About from 'components/Set/CenterSet/About'
import Shild from 'components/Set/CenterSet/Shild'
import PayPass from 'components/Set/CenterSet/PayPass'
*/
import {Login,Information,InforStatus,Footer,Home,ReBateMain,EncourageGold,ReBateDetail,
	ReBateCreditDetail,ReBate,CashDetail,ExpenDetail,MyCard,AddCard,
	AddCardInfo,WithDrawal,WithDrawalResult,WithDrawalProcess,Fans,
	DirectFan,ChannelFan,FansDetail,FansReBateDetail,FansInstallmentDetail,
	ActiveCreditDetail,Countyfenlist,QrCode,QrCodeLoad,CountyDealer,DealerApply,
	CountyDetail,CountyFreeze,CountyAudit,Stage,Credit,CountyReBateDetail,
	CountyInstallmentDetail,CountyActiveCreditDetail,DataAnalysis,FansChart,
	AreaChart,BuyChart,HabitChart,Msgs,Headlines,HeadDetail,Notice,
	CustomerService,My,Seter,Person,AvatarPre,LoginPass,PayPassReset,
	PayPassSelect,PayPassFor,PayPassForSet,About,Shild,PayPass,
	Userlist,AddUser,SetPower,List,AddId} from './asynComponent.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes=[
// {path:'/',component:GuidePages}
{path:'/login',component:Login},
{path:'/Information',component:Information},
{path:'/Information/inforStatus',component:InforStatus},
{path:'/home',component:Home},


{path:"/home/rebate",component:ReBate},
{path:'/home/rebate/rebatemain',component:ReBateMain},
{path:'/home/rebate/encouragegold',component:EncourageGold},



{path:'/home/rebate/rebatedetail',component:ReBateDetail},
{path:'/home/rebate/rebatecreditdetail',component:ReBateCreditDetail},


{path:'/home/cashdetail',component:CashDetail},
/*{path:'/home/cashdetail/2',component:CashDetail},*/
{path:'/home/cash/expendetail',component:ExpenDetail},
{path:'/home/cash/mycard/1',component:MyCard},
{path:'/home/cash/mycard/2',component:MyCard},
{path:'/home/cash/addcard/1',component:AddCard},
{path:'/home/cash/addcard/2',component:AddCard},
/*{path:'/home/cash/addcard/3',component:AddCard},*/
{path:'/home/cash/addcard/addcardinfo',component:AddCardInfo},
{path:'/home/cash/withdrawal',component:WithDrawal},
{path:'/home/cash/withdrawalresult',component:WithDrawalResult},
{path:'/home/cash/withdrawalprocess',component:WithDrawalProcess},


{path:'/home/fans',component:Fans},

{path:'/home/fans/directfan',component:DirectFan},
{path:'/home/fans/channelfan',component:ChannelFan},

{path:'/home/fans/fansrebatedetail',component:FansReBateDetail},
{path:'/home/fans/fansinstallmentdetail',component:FansInstallmentDetail},
{path:'/home/fans/activecreditdetail',component:ActiveCreditDetail},
{path:'/home/fans/Countyfenlist',component:Countyfenlist},

{path:'/home/fans/fansDetail',component:FansDetail},

{path:'/home/qrcode',component:QrCode},
{path:'/home/qrcode/qrcodeload',component:QrCodeLoad},
{path:'/home/countydealer',component:CountyDealer},
{path:'/home/countystate/countyfreeze',component:CountyFreeze},
{path:'/home/countystate/countyaudit',component:CountyAudit},
{path:"/home/countyDealer/dealerapply",component:DealerApply},
{path:'/home/countydetail/countyrebatedetail',component:CountyReBateDetail},
{path:'/home/countydetail/countyinstallmentdetail',component:CountyInstallmentDetail},
{path:'/home/countydetail/countyactivecreditdetail',component:CountyActiveCreditDetail},


{path:'/home/countydetail',component:CountyDetail},
{path:'/home/countydetail/credit',component:Credit},
	/*children:[
		{path:' ',component:Stage},
		{path:'stage',component:Stage},
		{path:'credit',component:Credit}
	]*/

{
	path:'/home/dataanalysis',component:DataAnalysis,
	children:[
		{path:'',component:FansChart},
		{path:'fansChart',component:FansChart},
		{path:'areaChart',component:AreaChart},
		{path:'buyChart',component:BuyChart},
		{path:'habitChart',component:HabitChart}
	]
},
{path:'/msgs',component:Msgs},
{path:'/msgs/headlines',component:Headlines},
{path:'/msgs/haadlines/headdetail',component:HeadDetail},
{path:'/msgs/notice',component:Notice},
{path:'/msgs/customerservice',component:CustomerService},
{path:'/my',component:My},
{path:'/set',component:Seter},
{path:'/set/person',component:Person},
{path:'/set/person/avatarpre',component:AvatarPre},
{path:'/set/shild/loginpass',component:LoginPass},
{path:'/set/shild/paypassreset',component:PayPassReset},
{path:'/set/shild/paypassfor/1',component:PayPassFor},
{path:'/set/shild/paypassfor/2',component:PayPassFor},
{path:'/set/shild/paypassforset',component:PayPassForSet},
{path:'/set/shild/paypassselect',component:PayPassSelect},
{path:'/set/about',component:About},
{path:'/set/shild',component:Shild},
{path:'/set/paypass/1',component:PayPass},
{path:'/set/paypass/2',component:PayPass},

{path:'/set/userlist',component:Userlist},
{path:'/userlist/adduser',component:AddUser},
{path:'/adduser/setpower',component:SetPower},
{path:'/userlist/list',component:List},
{path:'/userlist/list/addid',component:AddId}
]


export default new VueRouter({routes});