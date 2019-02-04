<style scoped lang="less">
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <div>后台名称：InitAdmin后台</div>
                <div>客户端框架：vue-admin v0.1.0</div>
                <div>服务端框架：actionphp v0.1.0</div>
                <div>PHP版本：7.0</div>
                <div>数据库版本：Mysql5.7</div>
                <h1>
                    <img src="@/assets/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button @click="handleStart">Start iView</Button>
                    <Button @click="go_core_user_login">登录</Button>
                    <Button @click="go_core_user_list">用户列表</Button>
                </h2>
            </Col>
            <Col span="24">
                <h1>
                    <img src="@/assets/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button @click="handleStart">Start iView</Button>
                    <Button @click="go_core_user_login">登录</Button>
                    <Button @click="go_core_user_list">用户列表</Button>
                </h2>
            </Col><Col span="24">
                <h1>
                    <img src="@/assets/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button @click="handleStart">Start iView</Button>
                    <Button @click="go_core_user_login">登录</Button>
                    <Button @click="go_core_user_list">用户列表</Button>
                </h2>
            </Col>
            <Col span="24">
                <h1>
                    <img src="@/assets/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button @click="handleStart">Start iView</Button>
                    <Button @click="go_core_user_login">登录</Button>
                    <Button @click="go_core_user_list">用户列表</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        created: function () {
        },
        methods: {
            go_core_user_login () {
                this.$router.push('core/user/login')
            },
            go_core_user_list () {
                this.$router.push('core/user/lists')
            },
            handleStart () {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        }
    }
</script>
