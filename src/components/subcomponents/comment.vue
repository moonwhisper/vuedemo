<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentList" :key="item.comId">
                <div class="cmt-title">
                    第{{ i + 1}}楼&nbsp;&nbsp;用户：{{ item.username }}&nbsp;&nbsp;发表时间： {{ item.comDate | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content ==='' ? '此用户很懒，什么都没说' : item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "comment",
        data() {
            return {
                // 默认展示第一页数据
                pageIndex: 1,
                commentList: [],
                // 评论输入的内容
                msg: ''
            }
        },
        props: [
          'id', 'getCommentsUrl', 'postCommentsUrl'
        ],
        methods: {
            getComments(){
                // getCommentsUrl: 'api/getnewscom?newsid='
                this.$http.get(this.getCommentsUrl + this.id + '&pageIdx=' + this.pageIndex).then(result => {
                    if(result.body.status === 1) {
                        // this.commentList = result.body.comments
                        // 每当获取新评论数据的时候，不要把老数据情况覆盖，而是应该在后面追加新的数据
                        this.commentList = this.commentList.concat(result.body.comments)
                    } else {
                        Toast('获取评论数据失败')
                    }
                })
            },
            // 加载更多评论
            getMore() {
                this.pageIndex++
                this.getComments()
            },
            postComment() {
                // 发表评论

                // 校验是否为空内容
                if(this.msg.trim().length === 0){
                    return Toast('评论内容不能为空！')
                }


                // 参数1： 请求的URL地址
                // 参数2： 提交给服务器的数据对象 { content: this.msg }
                // 参数3:  定义提交的时候，表单中数据的格式 { emulateJSON: true }
                // 'api/addnewscom?newsId='
                this.$http.post(this.postCommentsUrl + this.id, {
                    content: this.msg.trim()
                }).then( result => {
                    if(result.body.status === 1) {
                        // 1. 拼接出一个评论对象
                        var cmt = { username: '匿名',  comDate: Date.now(), content: this.msg.trim() }

                        this.commentList.unshift(cmt)
                        this.msg = ''
                    } else {
                        Toast('发表新的评论失败！')
                    }

                })
            }
        },
        created() {
            this.getComments()
        }
    }
</script>

<style lang="scss" scoped>
    .comment-container{
        color: black;

        h3{
            font-size: 16px;
            text-align: left;
        }

        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #cccccc;
                    text-align: left;
                    line-height: 30px;
                }

                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                    text-align: left;
                }
            }
        }
    }

</style>