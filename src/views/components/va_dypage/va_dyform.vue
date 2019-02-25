<style>
    .spin-icon-load{
        animation: ani-spin 1s linear infinite;
    }
    @keyframes ani-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .spin-col {
        height: 100px;
        position: relative;
        border: 0px solid #eee;
    }
</style>

<template>
    <div class="form-wrapper">
         <template v-if="this.data != ''">
            <Form @submit.native.prevent :ref="ref" :model="data.form_values" :label-position="label_position" :label-width="label_width" :rules="data.form_rules">
                <template v-for="(item,key,index) in data.form_items">
                    <template v-if="data.form_rules[item.name] != ''">
                        <VaDyformItem :key="index" :item="item" :form_values="data.form_values"></VaDyformItem>
                    </template>
                    <template v-else>
                        <VaDyformItem :key="index" :item="item" :form_values="data.form_values"></VaDyformItem>
                    </template>
                </template>
                
                <!-- 按钮 -->
                <Divider />
                <FormItem style="text-align:left">
                    <Button type="primary" size="large" style="margin-right: 15px" @click="handleSubmit(ref)">确认提交</Button>
                    <Button type="text" size="large" @click="handleReset(ref)">取消操作</Button>
                </FormItem>
            </Form>
        </template>
        <template v-else>
            <Row>
                <Col class="spin-col" span="24">
                    <Spin fix>
                        <Icon type="ios-loading" size=22 class="spin-icon-load"></Icon>
                        <div>Loading</div>
                    </Spin>
                </Col>
            </Row>
        </template>
    </div>
</template>

<script>
import VaDyformItem from '@/views/components/va_dypage/va_dyform_item'
export default {
  name: 'DynamicForm',
  components: {
        VaDyformItem
    },
  props: {
    api: ''
  },
  data () {
    return {
        ref: 'form', //相当于子组件实例ID
        data: '',
        label_position: 'right',
        label_width: 100
    }
  },
  created () {
    this.ref = 'form_' + (new Date()).getTime()
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  computed: {
  },
  methods: {
      formlist_addrow (name) {
        this.data.form_values[name].push(new Object());
      },
      handleSubmit (name) {
        let _this = this
        // 获取checkboxtree的选中项目
        for(let index in _this.data.form_items) {
            if (_this.data.form_items[index].type == 'checkboxtree') {
                let admin_auth = _this.$refs[_this.data.form_items[index].name][0].getCheckedProp('admin_auth')
                _this.data.form_values[_this.data.form_items[index].name] = admin_auth
            }
        };
        //console.log(_this.data.form_values)
        
        //提交数据
        if (this.data.form_rules.length == 0) {
            this.submitForm()
            return true
        }
        this.$refs[name].validate((valid) => {
            if (valid) {
                _this.submitForm()
            } 
        })
    },
    submitForm () {
        // 提交数据
        let _this = this
        switch (this.data.form_method) {
            case 'post':
                axios.post(this.api, this.data.form_values)
                    .then(function (res) {
                        res = res.data
                        if(res.code == '200'){
                            _this.$Message.success(res.msg)
                            _this.$Modal.remove()
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                break;
            case 'put':
                axios.put(this.api, this.data.form_values)
                    .then(function (res) {
                        res = res.data
                        if(res.code == '200'){
                            _this.$Message.success(res.msg)
                            _this.$Modal.remove()
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                break;
        
            default:
                _this.$Message.error('form_method不存在')
                break;
        } 
    },
    handleReset (name) {
        this.api = '';
        this.data = '';
        this.$refs[name].resetFields()
        this.$Modal.remove()
    }
  },
  watch: {
    api(){
        let _this = this
        // 获取表单构造数据
        if (this.api) {
            axios.get(this.api)
                .then(function (res) {
                    res = res.data
                    if(res.code=='200'){
                        if (res.data.form_data.form_rules.length == 0) {
                            res.data.form_data.form_rules = new  Object();
                        }
                        //console.log(res.data.form_data);
                        _this.data = res.data.form_data
                    }else{
                        _this.$Message.error(res.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }
  }
}
</script>
