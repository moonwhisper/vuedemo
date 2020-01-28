import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from "./components/tabbar/HomeContainer";
import MemberContainer from "./components/tabbar/MemberContainer";
import ShopcarContainer from "./components/tabbar/ShopcarContainer";
import SearchContainer from "./components/tabbar/SearchContainer";

// 3 创建路由对象
var router = new VueRouter({
    // 配置路由规则
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer }
    ],
    // 覆盖默认的路由高亮的类，默认的类叫做mui-active
    linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router