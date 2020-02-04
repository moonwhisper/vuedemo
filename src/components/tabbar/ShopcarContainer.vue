<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner" v-for="(item, i) in goodslist" :key="item.id">
                        <mt-switch v-model='$store.getters.getGoodsSelected[item.id]'
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.img">
                        <div class="info">
                            <h1>{{ item.name }}</h1>
                            <p>
                                <span class="price">￥{{ item.price }}</span>
                                <numbox :initcount="item.count" :goodsid="item.id"></numbox>
                                <a href="" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner-jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
                            总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger" size="small">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/Shopcar_numbox'
    export default {
        name: "ShopcarContainer",
        data() {
            return {
                // 购物车中所有商品的数据
                goodslist: this.$store.state.car
            }
        },
        methods: {
            remove(id, index) {
                // 点击删除把商品从 store 中根据传递的id删除，同时，把当前组件中的goodslist对应要删除的那个商品使用index删除
                this.goodslist.splice(index, 1)
                this.$store.commit("removeFromCar", id)
            },
            selectedChanged(id, val) {
                // 每当点击开关，把最新的开关状态同步到store中
                // console.log(id + "---" + val)
                this.$store.commit('updateGoodsSelected', {id: id, selected: val})
            }
        },
        components: {
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eeeeee;
        overflow: hidden;
        color: black;

        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
                margin: 20px 0;

                img{
                    width: 60px;
                    height: 60px;
                }

                h1{
                    text-align: left;
                    font-size: 13px;
                }

                .info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 10px;

                    .price{
                        color: red;
                        font-weight: bold;
                    }
                }
            }
        }

        .mui-card-content-inner-jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            padding: 10px;

            span{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>