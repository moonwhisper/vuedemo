<template>
    <div class="goods-list">
<!--        <router-link class="goods-item" v-for="item in goodsList" :key="item.godId" :to="'/home/goodsinfo/' + item.godId" tag="div">-->
<!--            <img :src="item.phos[0]" alt="">-->
<!--            <h1 class="title">{{ item.name }}</h1>-->
<!--            <div class="info">-->
<!--                <p class="price">-->
<!--                    <span class="now">￥{{ item.newPrice }}</span>-->
<!--                    <span class="old">￥{{ item.oldPrice }}</span>-->
<!--                </p>-->
<!--                <p class="sell">-->
<!--                    <span>热卖中</span>-->
<!--                    <span>剩{{ item.quantity }}件</span>-->
<!--                </p>-->
<!--            </div>-->
<!--        </router-link>-->

        <div class="goods-item" v-for="item in goodsList" :key="item.godId" @click="goDetail(item.godId)">
            <img :src="item.phos[0]" alt="">
            <h1 class="title">{{ item.name }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.newPrice }}</span>
                    <span class="old">￥{{ item.oldPrice }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import router from "../../router";
    export default {
        name: "GoodsList",
        data() {
            return {
                // 分页的页数
                pageIndex: 1,
                // 存放商品列表的数组
                goodsList: []
            }
        },
        methods: {
            // 获取商品列表
            getGoodsList() {
                this.$http.get('api/getgod?pageIdx=' + this.pageIndex).then(result => {
                    if(result.body.status === 1) {
                        this.goodsList = this.goodsList.concat(result.body.gods)
                    } else {
                        Toast('没有更多数据了~~')
                    }
                })
            },
            getMore() {
                this.pageIndex++
                this.getGoodsList()
            },
            goDetail(id) {
                // 使用JS的形式进行路由导航
                // console.log(this)

                router.push('/home/goodsinfo/' + id)
            }
        },

        created() {
            this.getGoodsList()
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list{

        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        color:black;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img{
                width: 100%;
            }

            .title{
                text-align: left;
                font-size: 14px;
            }

            .info{
                background-color: #eeeeee;

                p{
                    margin: 0;
                    padding: 5px;
                }

                .price{
                    text-align: left;

                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }

                    .old{
                        text-decoration: line-through;
                        font-size:12px;
                        margin-left: 10px;
                    }
                }

                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }

            }
        }
    }
</style>