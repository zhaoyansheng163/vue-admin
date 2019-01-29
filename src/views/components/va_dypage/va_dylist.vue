<template>
  <div>
    <Card shadow>
      <Button
        v-for="(item,key) in dynamic_data.top_button_list"
        :key="key"
        :type="item.type?item.type:'default'"
        :size="item.size?item.size:''"
        :icon="item.icon?item.icon:''"
        :shape="item.shape?item.shape:''"
        @click="top_button_modal(key)"
        style="margin-bottom: 15px;">
        {{item.title}}
      </Button>
      <tree-table
        expand-key="title"
        :is-fold="false"
        :border="true"
        :stripe="true"
        :expand-type="false"
        :selectable="false"
        :columns="dynamic_data.columns"
        :data="data_list" >
        <template slot="right_button_list" slot-scope="scope">
            <Button
                v-for="(item,key) in dynamic_data.right_button_list"
                :key="key"
                :type="item.type"
                :size="item.size"
                :icon="item.icon"
                :shape="item.shape"
                @click="right_button_modal(key,scope)"
                style="margin-right: 3px;">
                {{item.title}}
            </Button>
        </template>
      </tree-table>
    </Card>
  </div>
</template>

<script>
import VaDyform from '@/views/components/va_dypage/va_dyform'
export default {
    name: 'DynamicList',
    props: {
        api: ''
    },
    components: {
        VaDyform
    },
    data () {
        return {
            data_list: [],
            dynamic_data: {}
        }
    },
    watch: {
        api(val) {
            let _this = this
            axios.get(this.api)
                .then(function (res) {
                    res = res.data
                    if(res.code=='200'){
                        _this.dynamic_data = res.data.dynamic_data
                        _this.data_list = res.data.data_list
                    }else{
                        _this.$Message.error(res.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    },
    created() {
    },
    mounted(){
    },
    methods: {
        top_button_modal(key) {
            let _this = this
            let button_data = _this.dynamic_data.top_button_list[key]
            this.$Modal.success({
                width: button_data.modal_data.width?button_data.modal_data.width:600,
                scrollable: true,
                title: button_data.modal_data.title?button_data.modal_data.title:'未指定标题',
                iconName: 'ios-create-outline',
                render: (h) => {
                    return h(VaDyform, {
                        props: {
                            api: button_data.modal_data.api
                        },
                        on: {
                        }
                    })
                }
            })
        },
        right_button_modal(key,scope) {
            let _this = this
            let button_data = _this.dynamic_data.right_button_list[key]
            if(button_data.modal_data.type == 'confirm'){
                this.$Modal.confirm({
                    okText: button_data.modal_data.okText,
                    cancelText: button_data.modal_data.cancelText,
                    title: button_data.modal_data.title,
                    content: button_data.modal_data.content,
                    onOk: () => {
                        axios.delete(button_data.modal_data.api + '/' + scope.row.id)
                            .then(function (res) {
                                res = res.data
                                if(res.code=='200'){
                                    _this.$Message.success(res.msg)
                                }else{
                                    _this.$Message.error(res.msg)
                                }
                            })
                            .catch(function (error) {
                                console.log(error)
                            });
                    },
                    onCancel: () => {
                    }
                });
            } else {
                this.$Modal.warning({
                    width: button_data.modal_data.width?button_data.modal_data.width:600,
                    scrollable: true,
                    title: button_data.modal_data.title?button_data.modal_data.title:'未指定标题',
                    render: (h) => {
                        return h(VaDyform, {
                            props: {
                                api: button_data.modal_data.api + '/' + scope.row.id
                            },
                            on: {
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>
    
<style>
    .ivu-modal-confirm .ivu-modal-confirm-footer{
        /* display: none; */
    }
</style>
