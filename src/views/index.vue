<style scoped lang="less">
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
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
        methods: {
            go_core_user_login () {
                this.$router.push('core/user/login')
            },
            go_core_user_list () {
                this.$router.push('core/user/list')
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
