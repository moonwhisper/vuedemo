<template>
    <mt-swipe :auto="4000">
        <!-- 将来谁使用此轮播图组件，谁为我们传递lubutuList -->
        <!-- 此时，lubutuList应该是父组件向子组件传值来设置 -->
        <mt-swipe-item v-for="item in lunbutuList" :key="item.index">
            <img :src="item" alt="" :class="{full: isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        name: "swiper",
        props: [
            "lunbutuList",
            "isfull"
        ]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;

        .mint-swipe-item {
            margin-top: 0px;

            img {
                border: 0;
                height: 100%;
            }
        }
    }

    .full{
        width: 100%;
    }
</style>