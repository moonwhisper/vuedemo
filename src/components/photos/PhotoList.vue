<template>
    <div>
        <!-- 顶部滑动条区域 -->
<!--        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">-->
<!--            <div class="mui-scroll">-->
<!--                <a :class="['mui-control-item', i == 0 ? 'mui-active' : '']" v-for="(item, i) in cates"-->
<!--                   :key="i" @click="getPhotoListByCateId">-->
<!--                    {{ item }}-->
<!--                </a>-->
<!--            </div>-->
<!--        </div>-->

        <van-tabs @click="getPhotoListByCateId">
            <van-tab v-for="(item, i)  in cates" :key="i" :title="item">
                {{ item }}
            </van-tab>
        </van-tabs>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="(item, i) in list" :key="i" :to="'/home/photoinfo/' + item.phoId" tag="li">
                <img v-lazy="item.phos[0]">

                <div class="info">
                    <h1 class="info-title">{{ item.type }}</h1>
                    <div class="info-body">{{ item.intro }}</div>
                </div>

                <img v-lazy="item.phos[1]">
            </router-link>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 导入mui的js文件
// import mui from  '../../lib/mui/js/mui.min.js'

export default {
    name: "PhotoList",
    data() {
        return {
            // 所有的照片分类
            cates: [],
            // 图片列表
            list: []
        }
    },
    methods: {
        getAllCategory() {
            this.$http.get('api/getphotypes').then(result => {
                if(result.body.status === 1) {
                    // 手动拼接出最完整的分类列表
                    result.body.types.unshift('全部')
                    this.cates = result.body.types
                } else {
                    Toast('获取照片分类信息失败！')
                }
            })
        },
        getPhotoListByCateId(name, title) {
            // 根据图片分类类型，获取图片列表
            var url

            if(title === '全部') {
                url = 'api/getpho?type=' + '&pageIdx=1'
            } else {
                // 对url中的中文进行编码
                url = encodeURI('api/getpho?type=' + title + '&pageIdx=1')
            }

            this.$http.get(url).then(result => {
                if(result.body.status === 1) {
                    this.list = result.body.phos
                } else {
                    Toast('获取图片列表失败！')
                }
            })
        }
    },
    created() {
        this.getAllCategory()

        // 默认当进入页面时，就主动请求所有图片列表的数据
        this.getPhotoListByCateId(0, '全部')
    },
    mounted() {
        // mui('.mui-scroll-wrapper').scroll({
        //     scrollX: true,
        //     // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        //     deceleration: 0.0005
        // });
    }
}
</script>

<style lang="scss" scoped>

    * {
        touch-action: pan-y;
    }

    h3{
        color: black;
    }

    .mui-scroll{
        color: black;
    }

    .photo-list{

        margin: 0;
        padding: 10px;

        li{
            background-color: #ccc;

            text-align: center;

            position: relative;

            background-color: rgba(0, 0, 0, 0.4);

            img{
                width:100%;
                margin-bottom: auto;
                vertical-align: middle;
            }

            img[lazy=loading] {
                width: 100%;
                height: 300px;
                margin: auto;
            }

            .info{

                position: absolute;
                bottom: 0;

                color: white;
                text-align: left;

                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }

                .info-body{
                    font-size: 13px;
                }
            }
        }
    }

</style>