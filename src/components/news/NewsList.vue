<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo?id=' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间： {{ item.add_time | dateFormat('YYYY-MM-DD') }} </span>
                            <span>点击： {{ item.clicked }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import Toast from 'mint-ui'

    export default {
        name: "NewsList",
        data: function () {
            return {
                // 新闻列表
                newsList: []
            }
        },
        methods: {
            // 获取新闻列表
            getNewsList() {
                this.$http.get('api/getnews').then(result => {
                    if(result.body.status === 1) {
                        this.newsList = result.body.news
                    } else {
                        Toast('获取新闻列表失败')
                    }
                })
            }
        },
        created() {
            this.getNewsList()
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                color: black;
                font-size: 14px;
            }

            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>