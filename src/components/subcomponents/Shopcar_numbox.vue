<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" :value="this.initcount" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from  '../../lib/mui/js/mui.min.js'
    export default {
        name: "shopcar_numbox",
        methods: {
            // 每当数量值改变，则立即把最新的数量同步到购物车的store中，覆盖之前的数量值
            countChanged() {
                // console.log(this.$refs.numbox.value)
                this.$store.commit("updateGoodsInfo", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value})
            }
        },
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox()
        },
        props: [
            "initcount", "goodsid"
        ]

    }
</script>

<style lang="scss" scoped>

</style>