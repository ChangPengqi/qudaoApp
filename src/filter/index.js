import Vue from 'vue'

//时间戳转换格式
Vue.filter('formdata',function(value){
  var time=parseInt(value);
  return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
})
//性别
Vue.filter('sexTo',function(value){
  var value= parseInt(value);
  if(value === 1){
    return '男'
  }else{
    return '女'
  }
})

Vue.prototype.checkSystem=function(obj){
	var u = navigator.userAgent;
	var token=localStorage.getItem('token');
	if(!token){
		this.$router.push({path:'/login'})
	}else{
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		obj.css('top',0)
		} else if (u.indexOf('iPhone') > -1) {
			obj.css('top',0)
		} else {
			obj.css('top',0)

		}
	}
		
}