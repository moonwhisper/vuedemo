<template>
    <div class="goodsinfo-container">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

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
                    <p>购买数量：
                        <numbox @getCount="getSelectedCount" :max="goodsinfo.quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 分析，如何实现加入购物车时候，拿到选择的数量 -->
        <!-- 1. 经过分析发现，按钮属于goodsinfo页面，数字属于number组件
             2. 由于涉及到了父子组件的嵌套了，所以，无法直接在goodsinfo页面中获取到选中的数量值
             3. 如何解决这个问题？ 涉及到了子组件向父组件传值   （事件调用机制）
             4. 事件调用的本质： 父向子传递方法，子调用这个方法，同时，把数据当做参数，传递给这个方法-->

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
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
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
                goodsinfo: [],
                // 控制小球的隐藏和显示的标识符
                ballFlag: false,
                // 保存用户选中的商品数量，默认为1
                selectedCount: 1
            }
        },
        methods: {
            getGoodsInfo() {
                this.$http.get('api/getgoddetail?godId=' + this.id).then(result => {
                    if(result.body.status === 1) {
                        this.goodsinfo = result.body.god
                        this.lunbutuList = result.body.god.phos
                    } else {
                        Toast('获取商品详情数据失败')
                    }
                })
            },
            goDesc(id) {
                // 点击使用编程式导航跳转到图文介绍页面
                this.$router.push({name: 'goodsdesc', params: { id }})
            },
            goComment(id) {
                // 点击使用编程式导航跳转到评论页面
                this.$router.push({name: 'goodscomment', params: { id }})
            },
            addToShopCar() {
                // 添加到购物车
                this.ballFlag = ! this.ballFlag
                // {id: 商品的id, name: 商品的名称,  count: 要购买的数量, price: 商品的单价, selected: 是否选中, img: 商品的图片地址}
                var info = {
                    id: this.id,
                    name: this.goodsinfo.name,
                    count: this.selectedCount,
                    price: this.goodsinfo.newPrice,
                    selected: true,
                    img: this.goodsinfo.imgIntro[0]}

                // 调用store中的mutations, 来将商品加入购物车
                this.$store.commit('addToCar', info)
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)"
            },
            enter(el, done) {
                // enter表示动画开始之后的样式，可以设置小球完成动画之后的结束状态

                // 小球动画优化思路
                // 1. 导致动画不准确的本质原因： 我们把小球最终位移到的位置，已经局限在了某一分辨率下的滚动条未滚动的情况下
                // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了
                // 3. 因此，我们经过分析，得到结论，不能把位移的距离设置成具体值，而是应该根据不同情况，动态计算坐标值
                // 4. 经过分析，先得到徽标的横纵坐标，再得到小球的横纵坐标，坐标值相减，就可以得到位移距离
                // 5. 如何获取徽标和小球的位置？ domObject.getBoundingClientRect()

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect()
                const badgePosition = document.getElementById('badge').getBoundingClientRect()
                const xDist = badgePosition.left - ballPosition.left
                const yDist = badgePosition.top - ballPosition.top

                // console.log(ballPosition)
                // console.log(badgePosition)

                setTimeout(() => {
                    el.style.transform = `translate(${xDist}px, ${yDist}px)`
                    el.style.transition = 'all 0.5s ease'
                    done()
                }, 20)
            },
            afterEnter(el) {
                this.ballFlag = ! this.ballFlag
                el.offsetWidth
            },
            getSelectedCount(count) {
                // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
                this.selectedCount = count
                // console.log('父组件拿到的数量值为:' + count)
            }
        },
        created() {
            this.getGoodsInfo()
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

            .mint-button{
                margin-right: 10px;
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

        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;

            top: 341px;
            left: 156px;
        }
    }

</style>