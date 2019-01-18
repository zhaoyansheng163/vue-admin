<template>
  <div>
    <Card shadow>
      <Button @click="modal_add()">添加</Button>
      <tree-table expand-key="title" :is-fold="false" :border="true" :stripe="true" :expand-type="false" :selectable="false" :columns="columns" :data="data_list" >
        <template slot="actions" slot-scope="scope">
          <Button @click="modal_edit(scope)">修改</Button>
          <Button @click="modal_delete(scope)">删除</Button>
        </template>
      </tree-table>
    </Card>
  </div>
</template>

<script>
import DynamicForm from '@/views/layout/dynamic_form'
export default {
    name: 'tree_table_page',
    components: {
        DynamicForm
    },
    data () {
        return {
            columns: [
                {
                title: 'ID',
                key: 'id',
                width: '40px'
                },
                {
                title: '部门',
                key: 'title',
                minWidth: '50px'
                },
                {
                title: '排序',
                key: 'sortnum'
                },
                {
                title: '操作',
                key: 'actions',
                minWidth: '200px',
                type: 'template',
                template: 'actions'
                }
            ],
            data_scope: null,
            data_list: [],
            form_api:{}
        }
    },
    created(){
        let _this = this
        axios.get('v1/core/admin/auth_role/lists')
            .then(function (res) {
                res = res.data
                if(res.code=='200'){
                    _this.form_api = res.data.form_api
                    _this.data_list = res.data.data_list
                    console.log(_this.form_api)
                }else{
                    _this.$Message.error(res.msg)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    methods: {
        modal_add() {
            let _this = this
            this.$Modal.success({
                width: '600',
                scrollable: true,
                title: '添加角色',
                iconName: 'ios-create-outline',
                render: (h) => {
                    return h(DynamicForm, {
                        props: {
                            api: _this.form_api.add
                        },
                        on: {
                        }
                    })
                }
            })
        },
        modal_edit(scope) {
            let _this = this
            this.$Modal.warning({
                width: '600',
                scrollable: true,
                title: '修改角色',
                iconName: 'ios-create-outline',
                render: (h) => {
                    return h(DynamicForm, {
                        props: {
                            api: _this.form_api.edit + '/' + scope.row.id
                        },
                        on: {
                        }
                    })
                }
            })
        },
        modal_delete(scope) {
            let _this = this
            this.$Modal.confirm({
                okText: "确认删除",
                cancelText: "取消操作",
                title: '确认要删除该角色吗？',
                content: '<p><p>如果该角色下有子角色需要先删除或者移动</p><p>如果该角色下有成员需要先移除才可以删除</p><p>删除该角色将会删除对应的权限数据</p></p>',
                onOk: () => {
                    _this.$Message.info('正在删除');
                    axios.delete(_this.form_api.delete + '/' + scope.row.id)
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
        }
    }
}
</script>
    
<style>
    .ivu-modal-confirm .ivu-modal-confirm-footer{
        /* display: none; */
    }
</style>
