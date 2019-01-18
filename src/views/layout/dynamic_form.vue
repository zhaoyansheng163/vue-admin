<template>
    <div class="form-wrapper">
        <Form :ref="ref" :model="data.form_item" :label-position="label_position" :label-width="label_width" :rules="data.form_rules">
            <FormItem v-for="(item,key,index) in data.form_item" :key="index" :label="item.title" :prop="item.name">
                <!-- 文本框 -->
                <template v-if="item.type == 'text'">
                    <Input v-model="item.value" :placeholder="item.placeholder"></Input>
                </template>
                <!-- 多行文本 -->
                <template v-else-if="item.type == 'textarea'">
                    <Input v-model="item.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="item.placeholder"></Input>                    
                </template>
                <!-- 下拉框 -->
                <template v-else-if="item.type == 'select'">
                    <Select v-model="item.value">
                        <Option v-for="(item1,key1,index1) in item.options" :key="index1" :value="item1.value">
                            {{item1.title}}
                        </Option>
                    </Select>
                </template>
                <!-- 单选框 -->
                <template v-else-if="item.type == 'radio'">
                    <RadioGroup v-model="item.value">
                        <Radio v-for="(item1,key1,index1) in item.options" :key="index1" :label="item1.value">
                            {{item1.title}}
                        </Radio>
                    </RadioGroup>
                </template>
                <!-- 多选框 -->
                <template v-else-if="item.type == 'input'">
                    <CheckboxGroup v-model="item.value">
                        <Checkbox :label="item1.title"></Checkbox>
                    </CheckboxGroup>
                </template>
                <!-- 开关 -->
                <template v-else-if="item.type == 'switch'">
                    <i-switch v-model="item.value" size="large">
                        <span slot="open">{{item1.options[0].title}}</span>
                        <span slot="close">{{item1.options[1].title}}</span>
                    </i-switch>
                </template>
                <!-- 滑块 -->
                <template v-else-if="item.type == 'slider'">
                    <Slider v-model="item.value" range></Slider>
                </template>
                <!-- 日期选择 -->
                <template v-else-if="item.type == 'datepicker'">
                    <DatePicker type="date" placeholder="选择日期" v-model="item.value"></DatePicker>
                </template>
                <!-- 时间选择 -->
                <template v-else-if="item.type == 'timepicker'">
                    <TimePicker type="time" placeholder="选择时间" v-model="item.value"></TimePicker>
                </template>
                <!-- 日期时间选择 -->
                <template v-else-if="item.type == 'datetimepicker'">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="选择日期" v-model="item.value[0]"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <TimePicker type="time" placeholder="选择时间" v-model="item.value[1]"></TimePicker>
                        </Col>
                    </Row>
                </template>
                <!-- 单图上传 -->
                <template v-else-if="item.type == 'uploadimage'">
                </template>
                <!-- 多图上传 -->
                <template v-else-if="item.type == 'uploadimages'">
                </template>
            </FormItem>
            <!-- 按钮 -->
            <Divider />
            <FormItem style="text-align:right">
                <Button type="text" @click="handleReset(ref)">取消操作</Button>
                <Button type="primary" style="margin-left: 15px" @click="handleSubmit(ref)">确认提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: {
    label: {},
    data: {},
    rules: {}
  },
  data () {
    return {
        ref: 'form', //相当于子组件实例ID
        label_position: 'right',
        label_width: 100
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
    }
  },
  watch: {
  }
}
</script>
