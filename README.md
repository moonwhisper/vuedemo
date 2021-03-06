# vuedemo

a vue project demo（代码为学习代码，参考黑马Vue教程，来源https://www.bilibili.com/video/av50680998?p=1）

## 制作首页App组件
1. 完成Header区域，使用的是Mint-UI中的Header组件
2. 制作底部的Tabbar区域，使用的是MUI中的Tabbar.html
3. 要在中间区域放置一个router-view来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击tabbar中的路由链接展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，使用vue-resource
2. 使用 vue-resource的 this.$http.get获取数据
3. 获取到的数据要保存到data上
4. 使用 v-for 循环渲染每个item项

## 改造九宫格区域的样式

## 改造新闻资讯路由链接

## 新闻资讯的页面制作
1. 绘制界面，使用 MUI 中的media-list.html
2. 使用vue-resource获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为router-link， 同时，在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
3. 在父组件中，使用 'components' 属性将刚才导入的comment组件，注册为自己的子组件
4. 将注册组件时候的注册名称以标签形式在页面中引用即可

## 获取所有的评论数据，显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件，在事件中，去请求下一页数据
2. 点击加载更多按钮，让pageIndex++，然后重新调用this.getComments()方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多按钮的时候，应该调用数组的concat方法，拼接上新数据

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表评论按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则提示用户"评论内容不能为空"
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论成功后，在客户端手动拼接出一个最新的对象，然后调用数组的unshift方法，把最新的评论追加到data中评论列表数组的起始位置

## 改造图片分享按钮为路由的链接，并显示对应的组件页面

## 绘制 图片列表组件页面结构，并美化样式
1. 制作 顶部的滑动条
2. 制作 底部的图片列表

## 制作顶部滑动条
1. 需要借助于MUI tab-with-segmented-control.html
2. 目前滑动条无法滑动，后续考虑vant组件的tab

## 获取图片下的所有分类，并渲染分类列表

## 制作图片列表区域
1. 图片列表需要使用懒加载，这里采用Mint-UI的组件，Lazy load
2. 根据'Lazy load'的使用文档使用
3. 渲染图片列表数据

## 实现图片列表的懒加载改造和样式美化

## 实现点击图片跳转到图片详情页面
1. 在改造 li 成router-link的时候，需要使用tag 属性指定为li

## 实现图片详情页面的布局和美化，同时获取数据，渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件vue-preview这个插件
2. 获取到所有的图片列表，然后使用v-for指令渲染数据
3. img标签上的class不能去掉

## 绘制 商品列表页面，并美化
    注意： 一定要区分 this.$route 和 this.$router 两个对象
    其中， this.$route是路由参数对象，所有路由中的参数， params, query都属于它
    其中， this.$router是一个路由导航对象， 用它可以方便地使用JS代码，实现路由的前进、后退、跳转到新的URL中 
    
## vuex
1. vuex是为了保存组件之间共享的数据而诞生的，这样可以避免父子组件之间的传值
2. 只有共享的数据，才有权利放到vuex中，组件内部私有的数据，只要放到组件的data中国即可
3. state中的数据不能直接修改，如果想要修改，必须通过mutations
4. 如果组件想要直接从state上获取数据，需要this.$store.state.***
5. 如果组件想要修改数据，必须使用mutations提供的方法，需要通过this.$store.commit('方法的名称', 唯一的参数)
6. 如果store中state上的数据，在对外提供的时候，需要做一层包装，那么，推荐使用getters，如果需要使用，则用this.$store.getters.***

