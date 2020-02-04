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

// 设置请求的根路径
Vue.http.options.root = 'http://120.77.181.41:3000'
// 全局设置 发送 post 请求的时候， 表单数据格式组织形式  { emulateJSON: true }
Vue.http.options.emulateJSON = true

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站时，肯定会调用main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {  // this.$store.state.***
    // 将购物车中商品的数据用一个数组存储起来，
    // 在car数组中存储一些商品的对象，可以暂时将商品的对象设计为，
    // {id: 商品的id, name: 商品的名称,  count: 要购买的数量, price: 商品的单价, selected: 是否选中, img: 商品的图片地址}
    car: car
  },
  mutations: { // this.$store.commit('方法的名称'， 按需传递唯一的参数)
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息保存到store中的car上
      // 分析： 1.如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
      // 2. 如果没有，则直接把商品数据push到car中即可

      // flag标识是否在购物车中找到对应的商品
      var flag = false

      state.car.some(item => {
        if(item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果在购物车中没有找到该商品
      if(!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析：
      state.car.some(item => {
        if(item.id == goodsinfo.id) {
          item.count = goodsinfo.count
          return true
        }
      })

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      // 根据 id 从store中删除对应的那条商品数据
      state.car.some( (item, i) => {
        if(item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if(item.id == info.id) {
          item.selected = info.selected
        }
      })

      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {  //  this.$store.getters.***
    getAllCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += parseInt(item.count)
      })

      return c
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach( item=> {
        o[item.id] = item.selected
      } )

      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,  // 勾选的数量
        amount: 0  // 勾选的总价
      }

      state.car.forEach(item => {
        if(item.selected == true) {
          o.count += parseInt(item.count)
          o.amount += item.price * item.count
        }
      })

      return o
    }
  }
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dateStr, pattern='YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


Vue.config.productionTip = false

new Vue({
  // 1.4 挂载路由对象到vm实例上
  router,
  store,
  render: h => h(App),
}).$mount('#app')
