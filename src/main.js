import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
// 1.1 导入路由的包
import VueRouter from 'vue-router'

Vue.use(MintUI)

// 1.2 安装路由
Vue.use(VueRouter)


// 1.3 导入自己的router.js路由模块
import router from './router.js'

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  // 1.4 挂载路由对象到vm实例上
  router,
  render: h => h(App),
}).$mount('#app')
