<template>
    <!-- 问题： 我们不知道什么时候能够拿到max, 可以采用watch监听max -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max' >
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>

    <!-- 分析，子组件什么时候把数据传递给父组件
         -->
</template>

<script>
    import mui from  '../../lib/mui/js/mui.min.js'
    export default {
        name: "goodsinfo_numbox",
        methods: {
            countChanged() {
                // 每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
                // console.log(this.$refs.numbox.value)
                this.$emit('getCount', parseInt(this.$refs.numbox.value))
            }
        },
        props: [
            "max"
        ],
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox()
        }
        // watch: {
        //     'max': function (newVal) {
        //          console.log(mui(".mui-numbox").numbox().getValue())
        //          mui(".mui-numbox").numbox().setOption('max', newVal)
        //     }
        // }

    }
</script>

<style lang="scss" scoped>

</style>