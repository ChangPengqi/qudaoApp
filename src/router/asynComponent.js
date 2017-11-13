// import Login from 'components/Login/Login'
const Login = resolve => require(['components/Login/Login.vue'],resolve)
//个人或企业信息
const Information = resolve => require(['components/Information/Information.vue'],resolve)
//个人或企业信息审核状态
const InforStatus = resolve => require(['components/Information/InforStatus.vue'],resolve)
// import Footer from 'components/Footer/Footer'
const Footer = resolve => require(['components/Footer/Footer.vue'],resolve)
//首页
// import Home from 'components/Home/Home.vue'
const Home = resolve => require(['components/Home/Home.vue'],resolve)
//收益
// import ReBateMain from 'components/ReBate/ReBateMain'
const ReBateMain = resolve => require(['components/ReBate/ReBateMain'],resolve)
// import EncourageGold from 'components/ReBate/EncourageGold'
const EncourageGold = resolve => require(['components/ReBate/EncourageGold'],resolve)
// import ReBateDetail from 'components/ReBate/ReBateDetail'
const ReBateDetail = resolve => require(['components/ReBate/ReBateDetail'],resolve)
// import ReBateCreditDetail from "components/ReBate/ReBateCreditDetail"
const ReBateCreditDetail = resolve => require(["components/ReBate/ReBateCreditDetail"],resolve)
// import ReBate from 'components/ReBate/ReBate'
const ReBate = resolve => require(['components/ReBate/ReBate'],resolve)
//提现
// import CashDetail from 'components/Cash/CashDetail'
const CashDetail = resolve => require(['components/Cash/CashDetail'],resolve)
// import ExpenDetail from 'components/Cash/ExpenDetail'
const ExpenDetail = resolve => require(['components/Cash/ExpenDetail'],resolve)
// import MyCard from 'components/Cash/MyCard'
const MyCard = resolve => require(['components/Cash/MyCard'],resolve)
// import AddCard from 'components/Cash/AddCard'
const AddCard = resolve => require(['components/Cash/AddCard'],resolve)
// import AddCardInfo from 'components/Cash/AddCardInfo'
const AddCardInfo = resolve => require(['components/Cash/AddCardInfo'],resolve)
// import WithDrawal from 'components/Cash/WithDrawal'
const WithDrawal = resolve => require(['components/Cash/WithDrawal'],resolve)
// import WithDrawalResult from 'components/Cash/WithDrawalResult'
const WithDrawalResult = resolve => require(['components/Cash/WithDrawalResult'],resolve)
// import WithDrawalProcess from 'components/Cash/WithDrawalProcess'
const WithDrawalProcess = resolve => require(['components/Cash/WithDrawalProcess'],resolve)
//粉丝
// import Fans from 'components/Fans/Fans'
const Fans = resolve => require(['components/Fans/Fans'],resolve)
// import DirectFan from 'components/Fans/DirectFan'
const DirectFan = resolve => require(['components/Fans/DirectFan'],resolve)
// import ChannelFan from 'components/Fans/ChannelFan'
const ChannelFan = resolve => require(['components/Fans/ChannelFan'],resolve)
// import FansDetail from 'components/FansDetail/FansDetail'
const FansDetail = resolve => require(['components/FansDetail/FansDetail'],resolve)
// import FansReBateDetail from 'components/FansDetail/FansReBateDetail'
const FansReBateDetail = resolve => require(['components/FansDetail/FansReBateDetail'],resolve)
// import FansInstallmentDetail from 'components/FansDetail/FansInstallmentDetail'
const FansInstallmentDetail = resolve => require(['components/FansDetail/FansInstallmentDetail'],resolve)
// import ActiveCreditDetail from 'components/FansDetail/ActiveCreditDetail'
const ActiveCreditDetail = resolve => require(['components/FansDetail/ActiveCreditDetail'],resolve)
const Countyfenlist = resolve => require(['components/FansDetail/Countyfenlist'],resolve)

//二维码
// import QrCode from 'components/QrCode/QrCode'
const QrCode = resolve => require(['components/QrCode/QrCode.vue'],resolve)
// import QrCodeLoad from 'components/QrCode/QrCodeLoad'
const QrCodeLoad = resolve => require(['components/QrCode/QrCodeLoad'],resolve)
//县级分销商
// import CountyDealer from 'components/CountyDealer/CountyDealer'
const CountyDealer = resolve => require(['components/CountyDealer/CountyDealer.vue'],resolve)
// import DealerApply from 'components/DealerApply/DealerApply'
const DealerApply = resolve => require(['components/DealerApply/DealerApply.vue'],resolve)
// import CountyDetail from 'components/CountyDetail/CountyDetail'
const CountyDetail = resolve => require(['components/CountyDetail/CountyDetail'],resolve)
// import CountyFreeze from 'components/CountyState/CountyFreeze'
const CountyFreeze = resolve => require(['components/CountyState/CountyFreeze'],resolve)
// import CountyAudit from 'components/CountyState/CountyAudit'
const CountyAudit = resolve => require(['components/CountyState/CountyAudit'],resolve)
// import Stage from 'components/CountyDetail/Stage'
const Stage = resolve => require(['components/CountyDetail/Stage'],resolve)
// import Credit from 'components/CountyDetail/Credit'
const Credit = resolve => require(['components/CountyDetail/Credit'],resolve)
// import CountyReBateDetail from 'components/CountyDetail/CountyReBateDetail'
const CountyReBateDetail = resolve => require(['components/CountyDetail/CountyReBateDetail'],resolve)
// import CountyInstallmentDetail from 'components/CountyDetail/CountyInstallmentDetail'
const CountyInstallmentDetail = resolve => require(['components/CountyDetail/CountyInstallmentDetail'],resolve)
// import CountyActiveCreditDetail from 'components/CountyDetail/CountyActiveCreditDetail' 
const CountyActiveCreditDetail = resolve => require(['components/CountyDetail/CountyActiveCreditDetail'],resolve)
//数据分析
// import DataAnalysis from 'components/DataAnalysis/DataAnalysis.vue'
const DataAnalysis = resolve => require(['components/DataAnalysis/DataAnalysis.vue'],resolve)
// import FansChart from 'components/DataAnalysis/main/FansChart.vue'
const FansChart = resolve => require(['components/DataAnalysis/main/FansChart.vue'],resolve)
// import AreaChart from 'components/DataAnalysis/main/AreaChart.vue'
const AreaChart = resolve => require(['components/DataAnalysis/main/AreaChart.vue'],resolve)
// import BuyChart from 'components/DataAnalysis/main/BuyChart.vue'
const BuyChart = resolve => require(['components/DataAnalysis/main/BuyChart.vue'],resolve)
// import HabitChart from 'components/DataAnalysis/main/HabitChart.vue'
const HabitChart = resolve => require(['components/DataAnalysis/main/HabitChart.vue'],resolve)
//动态
// import Msgs from 'components/Msgs/Msgs'
const Msgs = resolve => require(['components/Msgs/Msgs'],resolve)
// import Headlines from 'components/Msgs/Headlines'
const Headlines = resolve => require(['components/Msgs/Headlines'],resolve)
// import HeadDetail from 'components/Msgs/HeadDetail'
const HeadDetail = resolve => require(['components/Msgs/HeadDetail'],resolve)
// import Notice from 'components/Msgs/Notice'
const Notice = resolve => require(['components/Msgs/Notice'],resolve)
// import CustomerService from 'components/CustomerService/CustomerService'
const CustomerService = resolve => require(['components/CustomerService/CustomerService'],resolve)
//我的
// import My from 'components/My/My'
const My = resolve => require(['components/My/My'],resolve)
//设置
// import Seter from 'components/Set/Set.vue'
const Seter = resolve => require(['components/Set/Set.vue'],resolve)
// import Person from 'components/Set/CenterSet/Person'
const Person = resolve => require(['components/Set/CenterSet/Person'],resolve)
// import AvatarPre from "components/AvatarPre/AvatarPre"
const AvatarPre = resolve => require(["components/AvatarPre/AvatarPre"],resolve)
// import LoginPass from 'components/Set/CenterSet/LoginPass'
const LoginPass = resolve => require(['components/Set/CenterSet/LoginPass'],resolve)
// import PayPassReset from 'components/Set/CenterSet/PayPassReset'
const PayPassReset = resolve => require(['components/Set/CenterSet/PayPassReset'],resolve)
// import PayPassSelect from 'components/Set/CenterSet/PayPassSelect'
const PayPassSelect = resolve => require(['components/Set/CenterSet/PayPassSelect'],resolve)
// import PayPassFor from 'components/Set/CenterSet/PayPassFor'
const PayPassFor = resolve => require(['components/Set/CenterSet/PayPassFor'],resolve)
// import PayPassForSet from 'components/Set/CenterSet/PayPassForSet'
const PayPassForSet = resolve => require(['components/Set/CenterSet/PayPassForSet'],resolve)
// import About from 'components/Set/CenterSet/About'
const About = resolve => require(['components/Set/CenterSet/About'],resolve)
// import Shild from 'components/Set/CenterSet/Shild'
const Shild = resolve => require(['components/Set/CenterSet/Shild'],resolve)
// import PayPass from 'components/Set/CenterSet/PayPass'
const PayPass = resolve => require(['components/Set/CenterSet/PayPass'],resolve)

const Userlist = resolve => require(['components/Userlist/Userlist'],resolve)

const AddUser = resolve => require(['components/Userlist/AddUser'],resolve)

const SetPower = resolve => require(['components/Userlist/SetPower'],resolve)

const List = resolve => require(['components/Userlist/List'],resolve)

const AddId = resolve => require(['components/Userlist/AddId'],resolve)

export { Login,Information,InforStatus,Footer,Home,ReBateMain,EncourageGold,ReBateDetail,ReBateCreditDetail,
	ReBate,CashDetail,ExpenDetail,MyCard,AddCard,AddCardInfo,WithDrawal,WithDrawalResult,
	WithDrawalProcess,Fans,DirectFan,ChannelFan,FansDetail,FansReBateDetail,FansInstallmentDetail,
	ActiveCreditDetail,Countyfenlist,QrCode,QrCodeLoad,CountyDealer,DealerApply,CountyDetail,CountyFreeze,
	CountyAudit,Stage,Credit,CountyReBateDetail,CountyInstallmentDetail,CountyActiveCreditDetail,
	DataAnalysis,FansChart,AreaChart,BuyChart,HabitChart,Msgs,Headlines,HeadDetail,Notice,
	CustomerService,My,Seter,Person,AvatarPre,LoginPass,PayPassReset,PayPassSelect,PayPassFor,
	PayPassForSet,About,Shild,PayPass,Userlist,AddUser,SetPower,List,AddId}