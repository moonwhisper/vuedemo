<template>
  <div id="app" class="app-container">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <!------ 顶部header区域 ------>
    <mt-header fixed title="黑马程序员 Vue项目">
        <span slot="left" @click="goBack" v-show="flag">
            <mt-button icon="back">返回</mt-button>
        </span>
    </mt-header>

    <!------ router-view区域 ----->
      <transition>
          <router-view></router-view>
      </transition>

    <!-------底部Tabbar区域 ----->
      <nav class="mui-bar mui-bar-tab">
          <router-link class="mui-tab-item mui-active" to="/home">
              <span class="mui-icon mui-icon-home"></span>
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link class="mui-tab-item" to="/member">
              <span class="mui-icon mui-icon-contact"></span>
              <span class="mui-tab-label">会员</span>
          </router-link>
          <router-link class="mui-tab-item" to="/shopcar">
              <span class="mui-icon shopcar"><span class="mui-badge" id="badge">{{ this.$store.getters.getAllCount }}</span></span>
              <span class="mui-tab-label">购物车</span>
          </router-link>
          <router-link class="mui-tab-item" to="/search">
              <span class="mui-icon mui-icon-search"></span>
              <span class="mui-tab-label">搜索</span>
          </router-link>
      </nav>


  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'app',
    data() {
        return {
            flag: false
        }
    },
    methods: {
        goBack() {
            // 点击后退
            this.$router.go(-1)
        }
    },
    watch: {
        '$route.path': function (newVal) {
            if(newVal === '/home') {
                this.flag = false
            } else {
                this.flag = true
            }
        }
    },
    created() {
        if(this.$route.path === '/home') {
            this.flag = false
        } else {
            this.flag = true
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style','background-color: #fff')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
    mounted() {
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
.app-container {
    border: 0;
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
}

.mint-header.is-fixed{
    z-index: 99;
}

.shopcar{
    background-image: url("./assets/shopcar-normal.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
}

.mui-active .shopcar{
    background-image: url("./assets/shopcar-click.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
}
</style>
