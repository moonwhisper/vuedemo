<template>
    <div class="goodsinfo-container">
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :lunbutu-list="this.lunbutuList" :isfull="false"></swiper>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card goods-sell">
            <div class="mui-card-header">{{ this.goodsinfo.name }}</div>
            <hr>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价： <del>￥{{ this.goodsinfo.oldPrice }}</del> &nbsp;&nbsp;&nbsp;&nbsp;销售价： <span class="now_price">￥{{ this.goodsinfo.newPrice }}</span>
                    </p>
                    <p>购买数量：<numbox></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card goods-params">
            <div class="mui-card-header">商品参数</div>
            <hr>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ this.goodsinfo.godNum }}</p>
                    <p>库存情况：{{ this.goodsinfo.quantity }}件</p>
                    <p>上架时间：{{ this.goodsinfo.addDate | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui'
    import swiper from "../subcomponents/swiper";
    import goodsinfo_numbox from "../subcomponents/goodsinfo_numbox";
    export default {
        name: "GoodsInfo",
        data() {
            return {
                // 将路由对象中的id挂载到data上，方便后期调用
                id: this.$route.params.id,
                // 轮播图的数据
                lunbutuList: [],
                // 商品详情的数据
                goodsinfo: []
            }
        },
        methods: {
            getLunbotu() {
                this.$http.get('api/getgoddetail?godId=' + this.id).then(result => {
                    if(result.body.status === 1) {
                        this.goodsinfo = result.body.god
                        this.lunbutuList = result.body.god.phos
                    } else {
                        Toast('获取商品详情数据失败')
                    }
                })
            }
        },
        created() {
            this.getLunbotu()
        },
        components: {
            swiper,
            numbox: goodsinfo_numbox
        }
    }
</script>

<style lang="scss" scoped>

    .goodsinfo-container{
        background-color: #eeeeee;
        overflow: hidden;
        color: black;

        .now_price{
            color: red;
            font-size: 16px;
            font-width: bold;
        }

        .mui-card.goods-sell{
            text-align: left;
            .mui-card-header{
                padding-left: 20px;
                padding-top: 20px;
            }

            .mui-card-content{
                padding-left: 20px;
            }

            .mui-numbox{
                height: 28px;
            }

            hr{
                background-color: #eeeeee;
                height: 1px;
                border: none;
            }

        }

        .mui-card.goods-params{
            text-align: left;
            .mui-card-header{
                padding-left: 20px;
                padding-top: 20px;
            }

            .mui-card-content{
                padding-left: 20px;
            }

            hr{
                background-color: #eeeeee;
                height: 1px;
                border: none;
            }
        }

        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
    }

    h3{
        color: black;
    }
</style>