<template>
    <div>
        <comment :id="this.id" :getCommentsUrl="this.getcommentsurl" :post-comments-url="this.postcommentsurl"></comment>
    </div>
</template>

<script>
    import comment from "../subcomponents/comment";
    export default {
        name: "GoodsComment",
        data() {
            return {
                id: this.$route.params.id,
                getcommentsurl: 'api/getgodcom?godId=',
                postcommentsurl: 'api/addgodcom?godId='
            }
        },
        components: {
            comment
        }
    }
</script>

<style lang="scss" scoped>
    h3{
        color: black;
    }
</style>