import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'

Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
