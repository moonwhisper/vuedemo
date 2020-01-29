<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a class="mui-control-item mui-active">
                    推荐
                </a>
                <a class="mui-control-item">
                    热点
                </a>
                <a class="mui-control-item">
                    北京
                </a>
                <a class="mui-control-item">
                    社会
                </a>
                <a class="mui-control-item">
                    娱乐
                </a>
                <a class="mui-control-item">
                    科技
                </a>
            </div>
        </div>
        <h3>图片列表</h3>
    </div>
</template>

<script>
    // 导入mui的js文件
// import mui from  '../../lib/mui/js/mui.min.js'
//
// mui('.mui-scroll-wrapper').scroll({
//     // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//     deceleration: 0.0005
// })

export default {
    name: "PhotoList",
    data() {
        return {}
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
    h3{
        color: black;
    }

    .mui-scroll{
        color: black;
    }

</style>