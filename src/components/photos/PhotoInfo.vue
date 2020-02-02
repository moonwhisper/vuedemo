<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.type }}</h3>
        <p class="subtitle">
            <span>发表时间： {{ Date.now() | dateFormat }}</span>
            <span>点击次数：{{ 198 }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list" :key="item.src" :src="item.src"
                 height="100" @click="$preview.open(index, list)">
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.intro"></div>

        <!-- 放置一个现成的评论子组件 -->
        <comment :id="id" :get-comments-url="this.getcommentsurl" :post-comments-url="this.postcommentsurl"></comment>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import comment from "../subcomponents/comment";
    export default {
        name: "PhotoInfo",
        data() {
            return {
                id: this.$route.params.id,
                // 图片详情
                photoinfo: {},
                getcommentsurl: 'api/getphocom?phoId=',
                postcommentsurl: 'api/addphocom?phoid=',
                // 缩略图的数组
                list: []
            }
        },
        methods: {
            getPhotoInfo() {
                // 获取图片的详情
                this.$http.get('api/getphodetail?phoId=' + this.id).then(result => {
                    if(result.body.status === 1) {
                        // 循环每个图片数据，补全图片的宽和高
                        result.body.pho.phos.forEach( item => {
                            var temp = {}
                            temp.src = item
                            temp.w = 300
                            temp.h = 400

                            this.list.push(temp)
                        })

                    } else {
                        Toast('获取图片列表失败！')
                    }
                })
            }
        },
        components: {
            comment
        },
        created() {
            this.getPhotoInfo()
        }
    }
</script>

<style lang="scss" scoped>

    .photoinfo-container{
        padding: 3px;

        h3{
            color: #26a2ff;
            font-size: 15px;
            margin: 15px 0;
        }

        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content{
            color: black;
            font-size: 13px;
            line-height: 30px;
            text-align: left;
        }

        .thumbs{
            text-align: left;
            img{
                margin: 10px;
            }
        }
    }
</style>