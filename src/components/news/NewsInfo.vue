<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>

        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间： {{ newsinfo.add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo.clicked }}次</span>
        </p>
        <hr>

        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import Toast from 'mint-ui'

    // 1 导入评论子组件
    import comment from "../subcomponents/comment";

    export default {
        name: "NewsInfo",
        data() {
            return {
                // 将url地址中传递过来的id值，挂载到data上，方便以后调用
                id: this.$route.query.id,
                newsinfo: []
            }
        },
        methods: {
            // 获取新闻详情
            getNewsInfo(){
                this.$http.get('api/getnewsdetail?newsId=' + this.id).then(result => {
                    if(result.body.status === 1) {
                        this.newsinfo = result.body.news
                    } else {
                        Toast('获取新闻失败')
                    }
                })
            }
        },
        created() {
            this.getNewsInfo()
        },
        components: {
            'comment-box': comment
        }
    }
</script>

<style lang="scss" scoped>

    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }

        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }

        .content{
            color: #2ac845;
        }
    }
</style>