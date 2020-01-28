<template>
   <div>
       <!-- 轮播图区域-->
       <mt-swipe :auto="400000">
           <!-- z -->
           <mt-swipe-item v-for="item in lubutuList" :key="item.index">
               <img :src="item" alt="">
           </mt-swipe-item>
       </mt-swipe>

       <!-- 九宫格到六宫格的改造工程-->
       <ul class="mui-table-view mui-grid-view mui-grid-9">
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../assets/menu1.png" alt="">
               <div class="mui-media-body">新闻资讯</div></a></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../assets/menu2.png" alt="">
               <div class="mui-media-body">图片分享</div></a></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../assets/menu3.png" alt="">
               <div class="mui-media-body">商品购买</div></a></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../assets/menu4.png" alt="">
               <div class="mui-media-body">留言反馈</div></a></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../assets/menu5.png" alt="">
               <div class="mui-media-body">视频专区</div></a></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../assets/menu6.png" alt="">
               <div class="mui-media-body">联系我们</div></a></li>
       </ul>
   </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  name: "HomeContainer",
  data: function () {
      return {
          lubutuList: [] //保存轮播图的数组
      }
  },
  created() {
     this.getLunbotu()
  },
  methods: {
    // 获取轮播图数据
    getLunbotu() {
       this.$http.get("http://120.77.181.41:3000/api/getcover").then(result => {
          console.log(result.body)
           if(result.body.status === 1) {
               this.lubutuList = result.body.imgs
           } else {
               Toast('加载轮播图失败')
           }
       })
    }
  }
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;

        .mint-swipe-item {
            margin-top: 0px;
        /*&:nth-child(1) {*/
        /*    background-color: red;*/
        /*}*/

        /*&:nth-child(2) {*/
        /*    background-color: green;*/
        /*}*/

        /*&:nth-child(3) {*/
        /*    background-color: cyan;*/
        /*}*/

            img {
                border: 0;
                width: 100%;
                height: 100%;
            }
        }
    }

    .mui-grid-view.mui-grid-9 {
        background-color: #ffffff;

        img{
            width: 60px;
            height: 60px;
        }

        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
        padding: 11px 15px;
        margin: -1px 0 0 -1px;
        vertical-align: top;
    }
</style>