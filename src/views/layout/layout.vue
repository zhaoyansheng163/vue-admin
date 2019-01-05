/**
 * +----------------------------------------------------------------------
 * | tpvue-admin [ 轻量级模块化Vue后台 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2018-2019 http://tpvue.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * +----------------------------------------------------------------------
 * | Author: jry <598821125@qq.com>
 * +----------------------------------------------------------------------
*/
<style scoped>
    .layout{
        border: 0px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 0px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    /* 多标签样式 */
    .tags-view-item {
        display: inline-block;
        margin: 2px 4px 2px 0;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
        line-height: 32px;
        border: 1px solid #e8eaec!important;
        color: #515a6e!important;
        background: #fff!important;
        padding: 0 12px;
    }
    .tags-view-item .title {
        display: inline-block;
        font-size: 13px;
    }
    .tags-view-item .dot{
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #e8eaec;
        border-radius: 50%;
        margin: 0px 6px 0px 4px;
    }
    .tags-view-item.active .dot{
        background-color: #2d8cf0;
    }
    .close-tag {
        font-size: 22px;
        margin-top: -5px;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{height: '100vh'}">
            <Sider :style="{overflow: 'hidden'}" breakpoint="md" ref="side1" hide-trigger reakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <router-link to="/home">
                            <Icon type="ios-home"></Icon>
                            <span>首页</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <router-link to="/core/user/list">
                            <Icon type="ios-search"></Icon>
                            <span>Option 2</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout >
                <Header :style="{width: '100%', paddingLeft: '20px'}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0px', cursor: 'pointer'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content class="main-content-con" :style="{height: 'calc(100% - 60px)', overflow: 'hidden'}">
                    <Layout class="main-layout-con" :style="{height: '100%'}">
                        <Content class="tag-nav-wrapper" :style="{ height: '40px', backgroundColor: '#f0f0f0'}">
                            <div class="tags-view-wrapper">
                                <router-link class="tags-view-item" :to="item" :key="item.path" :class="isActive(item)?'active':''" v-for="(item) in Array.from(visitedViews)">
                                    <span class="dot"></span>
                                    <span class="title">{{item.title}}</span>
                                    <Icon v-if="item.name != 'home'" class="close-tag" type="ios-close" @click.prevent.stop='delSelectTag(item)'/>
                                </router-link>
                            </div>
                        </Content>
                        <Content class="content-wrapper" :style="{height: 'calc(100%)', overflow: 'auto', padding: '15px'}">
                            <keep-alive>
                                <router-view/>
                            </keep-alive>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false
            };
        },
        mounted:function(){
            // 首次加载读取之前打开的标签
            this.addViewTags();
        },
        computed: {
            //缩放左侧导航
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },

            //多标签数据
            visitedViews(){
                //store中取值
                return this.$store.state.tagsview.visitedviews
            }
        },
        methods: {
            //缩放左侧导航
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },

            //判断多标签当前路由
            isActive(route){
                return route.path == this.$route.path
            },
            //增加新标签
            addViewTags(){
                if(this.$route.name){
                    const route = this.$route
                    this.$store.dispatch('addVisitedViews',route);
                }
            },
            //先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
            delSelectTag(route){
                console.log(route)
                this.$store.dispatch('delVisitedViews',route).then((views)=>{
                    if(this.isActive(route)){//只有在关闭当前打开的标签页才会有影响
                    let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                    if(lastView){
                        this.$router.push(lastView);
                    }else{
                        this.$router.push('/');
                    }
                    }
                })
            }
        },
        watch:{
            //地址栏变化了就触发这个添加方法
            $route(){
                this.addViewTags();
            }
        }
    }
</script>
