<style scoped lang="less">
    @import '../../plugins/iview-variables.less';
    .layout{
        border: 0px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 0px;
        overflow: hidden;
        .logo-box{
            background: #363e4f;
            display: flex;
            justify-content: left;
            align-items: center;
            color: rgba(255, 255, 255, 0.7);
            padding: 15px;
            .logo{
                height: 42px;
                margin-right: 8px;
            }
            .title{
                font-weight: 400;
                font-size: 16px;
            }
        }
        .layout-header-bar{
            display: flex;
            justify-content: space-between;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
            padding-right: 20px;
            .menu-icon{
                transition: all .3s;
            }
            .rotate-icon{
                transform: rotate(-90deg);
            }
            .right {
                display: flex;
                align-items: center;
            }
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
    }

    .main-layout-con {
        /* 多标签样式 */
        .tag-nav-wrapper {
            position: relative;
            height: 40px;
            white-space: nowrap;
            background-color: #f0f0f0;
            .btn-con{
                position: absolute;
                top: 0px;
                height: 100%;
                background: #fff;
                padding-top: 3px;
                z-index: 10;
                button{
                    padding: 6px 4px;
                    line-height: 14px;
                    text-align: center;
                }
                &.left-btn{
                    left: 0px;
                }
                &.right-btn{
                    right: 32px;
                    border-right: 1px solid #F0F0F0;
                }
            }
            .close-con{
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                width: 32px;
                background: #fff;
                text-align: center;
                z-index: 10;
            }
            .tags-view-wrapper {
                position: absolute;
                top: 0;
                bottom: 0;
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
                    .title {
                        display: inline-block;
                        font-size: 13px;
                    }
                    .dot{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #e8eaec;
                        border-radius: 50%;
                        margin: 0px 6px 0px 4px;
                    }
                    &.active .dot{
                        background-color: @primary-color;
                    }
                    .close-tag {
                        font-size: 22px;
                        margin-top: -5px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{height: '100vh'}">
            <Sider :style="{overflow: 'hidden', overflow: 'auto'}" breakpoint="md" ref="side1" hide-trigger reakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <div >
                    <router-link class="logo-box" to="/home">
                        <img class="logo" src="@/assets/logo.png" alt="InitAdmin">
                        <div class="title">InitAdmin</div>
                    </router-link>
                </div>
                <Menu :open-names="[0]" active-name="activeLeft" mode="vertical" theme="dark" width="auto" class="left-menu" :class="menuitemClasses">
                    <template v-for="(item1,key1) in this.get_menu_list">
                        <Submenu v-if="item1.level == '1'" :name="key1" :key="item1.path">
                            <template slot="title">
                                <Icon type="ios-filing" />
                                {{item1.title}}
                            </template>
                            <template v-if="item1._child">
                                <template v-for="(item2,key2) in item1._child">
                                    <Submenu v-if="item2._child" :key="item2.path" :name="key1 + '-' + key2">
                                        <template slot="title">{{item2.title}}</template>
                                        <MenuItem :key="item3.path" v-for="(item3,key3) in item2._child" :to="item3.path" :name="key1 + '-' + key2 + '-' + key3">{{item3.title}}</MenuItem>
                                    </Submenu>
                                    <template v-else>
                                        <MenuItem :key="item2.path" :to="item2.path" :name="key1 + '-' + key2">{{item2.title}}</MenuItem>
                                    </template>
                                </template>
                            </template>
                        </Submenu>
                    </template>
                </Menu>
            </Sider>
            <Layout >
                <Header :style="{width: '100%', paddingLeft: '20px'}" class="layout-header-bar">
                    <div class="left">
                        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0px', cursor: 'pointer'}" type="md-menu" size="24"></Icon>
                    </div>
                    <div class="right">
                        <div>
                            <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                        </div>
                        <Dropdown style="margin-right: 15px;">
                            <a href="javascript:void(0)" style="font-size: 14px;">
                                访问前台
                                <Icon type="md-arrow-dropdown" style="font-size: 18px;"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>
                                    <a target="_blank" href="/">PC前台</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a target="_blank" href="/m">Wap前台</a>
                                </DropdownItem>
                                <DropdownItem>微信小程序</DropdownItem>
                                <DropdownItem>手机App</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <a href="javascript:void(0)" style="font-size: 14px;">
                                <Badge>
                                    <Avatar shape="circle" size="large" icon="ios-person" />
                                </Badge>
                                <Icon type="md-arrow-dropdown" style="font-size: 18px;"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>我的消息</DropdownItem>
                                <DropdownItem>修改密码</DropdownItem>
                                <DropdownItem divided>注销</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>
                <Content class="main-content-con" :style="{height: 'calc(100% - 60px)', overflow: 'hidden'}">
                    <Layout class="main-layout-con" :style="{height: '100%'}">
                        <Content class="tag-nav-wrapper">
                            <div class="btn-con left-btn">
                                <Button type="text" @click="handleScroll(120)">
                                    <Icon :size="18" type="ios-arrow-back" />
                                </Button>
                            </div>
                            <div class="btn-con right-btn">
                                <Button type="text" @click="handleScroll(-120)">
                                    <Icon :size="18" type="ios-arrow-forward" />
                                </Button>
                            </div>
                            <div class="close-con">
                                <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
                                    <Button size="small" type="text">
                                        <Icon :size="18" type="ios-close-circle-outline" />
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="close-all">关闭所有</DropdownItem>
                                        <DropdownItem name="close-others">关闭其他</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                </div>
                            <div class="tags-view-wrapper" :style="{left: tagsleft+'px'}">
                                <div style="white-space: nowrap;overflow: visible;transition: left .3s ease;">
                                    <router-link class="tags-view-item" :to="item" :key="item.path" :class="isActive(item)?'active':''" v-for="(item) in Array.from(this.get_visitedviews)">
                                        <span class="dot"></span>
                                        <span class="title">{{item.title}}</span>
                                        <Icon v-if="item.name != 'home'" class="close-tag" type="ios-close" @click.prevent.stop='delSelectTag(item)'/>
                                    </router-link>
                                </div>
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
        <BackTop></BackTop>
    </div>
</template>
<script>
    import Layout from '@/views/layout';
    import Fullscreen from './fullscreen'
    import { mapMutations, mapActions, mapGetters } from 'vuex'
    import util from './store/util.js'
    export default {
        components: {
            Fullscreen
        },
        data () {
            return {
                activeLeft: '0-0',
                isCollapsed: false,
                isFullscreen: false,
                tagsleft: '28'
            };
        },
        beforeCreate: function () {
            // 首次加载读取之前打开的标签
            this.$store.dispatch('setVisitedViews')
            let menu_list = util.getMenulistFromLocalstorage()
            
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

            // 登录获取菜单
            let _this = this;
            if(menu_list.length == 0){
                axios.get('v1/core/admin/menu/lists')
                    .then(function (res) {
                        res = res.data;
                        if(res.code=='200'){
                            menu_list = res.data.menu_list;
                            for(let index1 in menu_list) {
                                if(menu_list[index1]._child){
                                    for(let index2 in menu_list[index1]._child) {
                                        if(menu_list[index1]._child[index2].is_vadypage == '1'){
                                            children.push(
                                                {
                                                    path: menu_list[index1]._child[index2].path,
                                                    name: menu_list[index1]._child[index2].path,
                                                    meta: {
                                                        title: menu_list[index1]._child[index2].title,
                                                        api: menu_list[index1]._child[index2].api
                                                    },
                                                    component: () => import('@/views/components/va_dypage/va_dylist_route.vue')
                                                }
                                            )
                                        } else {
                                            children.push(
                                                {
                                                    path: menu_list[index1]._child[index2].path,
                                                    name: menu_list[index1]._child[index2].path,
                                                    meta: {
                                                        title: menu_list[index1]._child[index2].title
                                                    },
                                                    component: () => import('@/views/module'+menu_list[index1]._child[index2].path+'.vue')
                                                }
                                            )
                                        }
                                    }
                                }
                            }
                            routes[0].children = children
                            _this.$router.addRoutes(routes)
                            _this.$store.dispatch('setMenuList', menu_list);
                        }else{
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
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
            },

            //多标签滚动
            handleScroll (e) {
                let left = Number(this.tagsleft) + Number(e)
                if (left >= 28) {
                    this.tagsleft = 28
                } else {
                    this.tagsleft = left
                }
            },
            handleTagsOption (type) {
                if (type.includes('all')) {
                    // 关闭所有，除了home
                    let views = [{
                        name: 'home',
                        path: '/home',
                        title: '首页'
                    }]
                    this.$store.dispatch('setVisitedViews', views)
                } else if (type.includes('others')) {
                    // 关闭除当前页和home页的其他页
                }
            },
        },
        watch:{
            //地址栏变化了就触发这个添加方法
            $route(){
                this.addViewTags();
            }
        }
    }
</script>
