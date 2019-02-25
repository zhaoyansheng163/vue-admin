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
                <FormItem v-for="(item,key,index) in data.form_items" :key="index" :label="item.title" >
                    <!-- 文本框 -->
                    <template v-if="item.type == 'text'">
                        <Input v-model="data.form_values[item.name]" :placeholder="item.extra.placeholder"></Input>
                    </template>
                    <!-- 多行文本 -->
                    <template v-else-if="item.type == 'textarea'">
                        <Input v-model="data.form_values[item.name]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="item.extra.placeholder"></Input>                    
                    </template>
                    <!-- 自定义数组 -->
                    <template v-else-if="item.type == 'array'">
                        <Input v-model="data.form_values[item.name]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="item.extra.placeholder"></Input>                    
                    </template>
                    <!-- 下拉框 -->
                    <template v-else-if="item.type == 'select'">
                        <Select v-model="data.form_values[item.name]">
                            <Option v-for="(item1,key1,index1) in item.extra.options" :key="index1" :value="item1.value">
                                {{item1.title}}
                            </Option>
                        </Select>
                    </template>
                    <!-- 单选框 -->
                    <template v-else-if="item.type == 'radio'">
                        <RadioGroup v-model="data.form_values[item.name]">
                            <Radio v-for="(item1,key1,index1) in item.extra.options" :key="index1" :label="item1.value">
                                <span>{{item1.title}}</span>
                            </Radio>
                        </RadioGroup>
                    </template>
                    <!-- 多选框 -->
                    <template v-else-if="item.type == 'checkbox'">
                        <CheckboxGroup v-model="data.form_values[item.name]">
                            <Checkbox v-for="(item1,key1,index1) in item.extra.options" :key="index1" :label="item1.title"></Checkbox>
                        </CheckboxGroup>
                    </template>
                    <!-- 开关 -->
                    <template v-else-if="item.type == 'switch'">
                        <i-switch v-model="data.form_values[item.name]" size="large">
                            <span slot="open">{{item1.extra.options[0].title}}</span>
                            <span slot="close">{{item1.extra.options[1].title}}</span>
                        </i-switch>
                    </template>
                    <!-- 滑块 -->
                    <template v-else-if="item.type == 'slider'">
                        <Slider v-model="data.form_values[item.name]" range></Slider>
                    </template>
                    <!-- 日期选择 -->
                    <template v-else-if="item.type == 'datepicker'">
                        <DatePicker type="date" placeholder="选择日期" v-model="idata.form_values[item.name]"></DatePicker>
                    </template>
                    <!-- 时间选择 -->
                    <template v-else-if="item.type == 'timepicker'">
                        <TimePicker type="time" placeholder="选择时间" v-model="data.form_values[item.name]"></TimePicker>
                    </template>
                    <!-- 日期时间选择 -->
                    <template v-else-if="item.type == 'datetimepicker'">
                        <Row>
                            <Col span="11">
                                <DatePicker type="date" placeholder="选择日期" v-model="data.form_values[item.name][0]"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <TimePicker type="time" placeholder="选择时间" v-model="data.form_values[item.name][1]"></TimePicker>
                            </Col>
                        </Row>
                    </template>
                    <!-- 评分 -->
                    <template v-else-if="item.type == 'rate'">
                        <Rate v-model="data.form_values[item.name]" />
                    </template>
                    <!-- 级联选择 -->
                    <template v-else-if="item.type == 'cascader'">
                        <Cascader :data="item.extra.options" v-model="data.form_values[item.name]" size="large"></Cascader>
                    </template>
                    <!-- 颜色选择器 -->
                    <template v-else-if="item.type == 'colorpicker'">
                        <ColorPicker v-model="data.form_values[item.name]" />
                    </template>
                    <!-- 单文件上传 -->
                    <template v-else-if="item.type == 'file'">
                        <Upload
                            type="drag"
                            :action="item.action">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                                <p>点击或者拖动文件到此处上传</p>
                            </div>
                        </Upload>
                    </template>
                    <!-- 多文件上传 -->
                    <template v-else-if="item.type == 'files'">
                        <Upload
                            multiple
                            type="drag"
                            :action="item.action">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                                <p>点击或者拖动文件到此处上传</p>
                            </div>
                        </Upload>
                    </template>
                    <template v-else-if="item.type == 'checkboxtree'">
                        <!-- https://github.com/lison16/tree-table-vue -->
                        <tree-table
                            :ref="item.name"
                            :expand-key="item.extra.expand-key"
                            :is-fold="true"
                            :border="true"
                            :stripe="false"
                            :selectable="true"
                            :expand-type="false"
                            :selection-type="checkbox"
                            :columns="item.extra.columns"
                            :data="item.extra.data">
                        </tree-table>
                    </template>
                    <template v-else-if="item.type == 'formlist'">
                        <Row>
                            <div v-for="(item1,key1,index1) in item.extra.options" :key="index1">
                                <Col :span="item1.span">
                                    {{item1.title}}
                                </Col>
                            </div>
                        </Row>
                        <Row v-for="(item2,key2,index2) in data.form_values[item.name]" :key="index2">
                            <div v-for="(item3,key3,index3) in item.extra.options" :key="index3">
                                <Col :span="item3.span">
                                    <Input v-model="data.form_values[item.name][key2][item3.value]"></Input>
                                </Col>
                            </div>
                        </Row>
                        <Button @click="formlist_addrow(item.name)" style="margin-top: 8px;">增加一行</Button>
                    </template>
                    <div style="color: #aaa;font-size: 12px;">{{item.extra.tip}}</div>
                </FormItem>
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
export default {
  name: 'DynamicForm',
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
        this.data.form_values[name].push(new Array());
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
        console.log(_this.data.form_values)
        
        this.$refs[name].validate((valid) => {
            if (valid) {
                // 提交数据
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
                        _this.$Message.error('form_method not found')
                        break;
                } 
            } else {
                //this.$Message.error('错误!')
            }
        })
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
