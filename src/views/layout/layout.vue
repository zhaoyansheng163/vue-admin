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
            
            <Sider :style="{overflow: 'hidden', overflow: 'auto'}" breakpoint="md" ref="side1" hide-trigger reakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :open-names="['0']" active-name="activeLeft" mode="vertical" theme="dark" width="auto" class="left-menu" :class="menuitemClasses">
                    <template v-for="(item1,key1,index1) in this.get_menu_list">
                        <Submenu v-if="item1.level == '1'" :name="index1" :key="item1.name">
                            <template slot="title">
                                <Icon type="ios-filing" />
                                {{item1.title}}
                            </template>
                            <template v-if="item1._child">
                                <template v-for="(item2,key2,index2) in item1._child">
                                    <Submenu v-if="item2._child" :key="item2.name" name="">
                                        <template slot="title">{{item2.title}}</template>
                                        <MenuItem :key="item3.name" v-for="(item3,key3,index3) in item2._child" :to="item3.route" :name="index1 + '-' +index2 + '-' +index3">{{item3.title}}</MenuItem>
                                    </Submenu>
                                    <MenuItem v-else :key="item2.name" :to="key2" :name="index1 + '-' +index2">{{item2.title}}</MenuItem>
                                </template>
                            </template>
                        </Submenu>
                    </template>
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
                                <router-link class="tags-view-item" :to="item" :key="item.path" :class="isActive(item)?'active':''" v-for="(item) in Array.from(this.get_visitedviews)">
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
    import Layout from '@/views/layout';
    import { mapMutations, mapActions, mapGetters } from 'vuex'
    import {setTagviewsInLocalstorage, getTagviewsFromLocalstorage} from './store/util.js'
    export default {
        data () {
            return {
                activeLeft: '0-1',
                isCollapsed: false
            };
        },
        beforeMount: function () {
            // 获取API接口返回的左侧导航列表
            var routes = [
                {
                    path: '/',
                    name: 'root',
                    redirect: '/home',
                    meta: {
                        title: '首页'
                    },
                    component: Layout,
                    children: [
                        {
                            path: '/home',
                            name: 'home',
                            meta: {
                                title: '首页'
                            },
                            component: () => import('@/views/index.vue')
                        }
                    ]
                }
            ]
            var children = [];

            // 获取菜单
            let _this = this;
            let menu_list = this.$store.state.menu.get_menu_list;
            if(!menu_list){      
                axios.get('v1/core/admin/menu/lists')
                    .then(function (res) {
                        res = res.data;
                        if(res.code=='200'){
                            menu_list = res.data.menu_list;
                            for(let index1 in menu_list) {
                                if(menu_list[index1]._child){
                                    for(let index2 in menu_list[index1]._child) { 
                                        console.log(menu_list[index1]._child[index2])
                                        children.push(
                                            {
                                                path: index2,
                                                name: index2,
                                                meta: {
                                                    title: menu_list[index1]._child[index2].title
                                                },
                                                component: () => import('@/views/module'+index2+'.vue')
                                            }
                                        )
                                    }
                                }
                            }
                            routes[0].children = children
                            _this.$router.addRoutes(routes)
                            _this.$store.dispatch('setMenuList',menu_list);
                        }else{
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted:function(){
            // 首次加载读取之前打开的标签
            this.$store.dispatch('setVisitedViews');
        },
        computed: {
            ...mapGetters([
                'get_visitedviews', //多标签数据
                'get_menu_list' //左侧导航
            ]),

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
