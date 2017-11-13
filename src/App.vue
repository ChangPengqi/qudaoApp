<template>
  <div id="app">
    <router-view></router-view>
    <!-- <wx-footer></wx-footer> -->
  </div>
</template>

<script>
// import Footer from 'components/Footer/Footer.vue'

export default {
  name: 'app',
  // components: {
  //   'wx-footer':Footer
  // }
  data(){
      return {

      }
  },
  created:function(){
   console.log('aaaaaaa')
    
  },
  methods:{


  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height: 1
}
a{
  color: #666;
}
</style>
