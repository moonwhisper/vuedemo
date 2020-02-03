<template>
    <div class="goodsDetail-container">
        <h3>{{ info.name }}</h3>
        <hr>
        <div class="content" v-html="info.intro"></div>
        <div class="goods-img" v-for="(item, index) in info.phos" :key="index">
            <img :src="item" alt="">
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "GoodsDesc",
        data() {
            return{
                id: this.$route.params.id,
                // 图文数据
                info: {}
            }
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('api/getgoddetail?godId=' + this.id).then(result => {
                    if(result.body.status === 1) {
                        this.info = result.body.god
                    } else {
                        Toast('获取商品图文数据失败')
                    }
                })
            }
        },
        created() {
            this.getGoodsDesc()
        }
    }
</script>

<style lang="scss" scoped>

    .goodsDetail-container{
        color: black;
        padding: 4px;

        h3{
            font-size: 16px;
            color: #226aff;
            margin: 15px 0;
        }

        .content{
            font-size: 14px;
            text-align: left;
        }

        .goods-img{
            width: 100%;
        }

    }
</style>