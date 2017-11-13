// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index.js'
import store from './vuex/index.js'
import './filter/index.js'
import './baseUrl.js'
import App from './App'
import "./common/index.styl"
import iView from 'iview'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css';
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(iView);

var app = {
     initialize: function() {
         this.bindEvents();
         this.setupVue();
     },
     bindEvents: function() {
         document.addEventListener('deviceready',this.onDeviceReady, false);        
     },
     onDeviceReady: function() {
         app.receivedEvent('deviceready');
         navigator.splashscreen.hide();
     },
     receivedEvent: function(id) {
         console.log('Received Event: ' + id);
     },
     setupVue: function() {
			new Vue({
		    el: '#app',
		    template: '<App/>',
		    components: { App },
		    router,
		    store,
		    render: h => h(App),
		    created:function(){
		    	var token=localStorage.getItem('token')
		    	console.log(token)
	        	if(token){ 
					router.push({path:'/home'})        					      	
			      }else{
			      	router.push({path:'/login'})
			      } 

			    /*router.push({path:'/home/dataanalysis'})*/
	
			    /*router.push({path:'/set/about'})*/
			    /*router.push({path:'/home/rebate/rebatecreditdetail'})*/
			    /*router.push({path:'/msgs/haadlines/headdetail'})*/
			    
			    

		    },
		    mounted:function(){
		   /* */			
		      document.body.addEventListener('touchstart', function () { });//移动端实现button:active
		      //fastclick 消除click 300ms延迟
		      if ('addEventListener' in document) {
		          document.addEventListener('DOMContentLoaded', function() {
		              FastClick.attach(document.body);
		          }, false);
		      }
		    }
		})
        
    }
 };
app.initialize();



  
/*document.addEventListener('deviceready', function() { 
  window.navigator.splashscreen.hide()
}, false);
*/




