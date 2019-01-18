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
    <Modal
        v-model="modal_list.delete.show"
        title="确认要删除该角色吗？"
        ok-text="确认删除"
        cancel-text="取消操作"
        @on-ok="ok"
        @on-cancel="cancel">
        <Alert type="error">
            <p>如果该角色下有子角色需要先删除或者移动</p>
            <p>如果该角色下有成员需要先移除才可以删除</p>
            <p>删除该角色将会删除对应的权限数据</p>
        </Alert>
    </Modal>
    <Modal
        v-model="modal_list.add.show"
        :footer-hide="true"
        title="添加一个角色">
        <DynamicForm :data="modal_list.add.form_data"></DynamicForm>
    </Modal>
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
        modal_list: {
            add: {
                show: false,
                form_data: []
            },
            edit: {
                show: false,
                form_item: []
            },
            delete: {
                show: false,
                form_item: []
            }
        },
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
        data_list: []
    }
    },
    created(){
        let _this = this
        axios.get('v1/core/admin/auth_role/lists')
            .then(function (res) {
                res = res.data
                if(res.code=='200'){
                    _this.data_list = res.data.data_list
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
            this.modal_list.add.show = true
            let _this = this
            axios.get('v1/core/admin/auth_role/add')
                .then(function (res) {
                    res = res.data
                    if(res.code=='200'){
                        _this.modal_list.add.form_data = res.data.form_data
                    }else{
                        _this.$Message.error(res.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        modal_edit(scope) {
        },
        modal_delete(scope) {
            this.modal_list.delete.show = true
            this.data_scope = scope
        },
        ok() {
            this.$Message.info('正在删除');
            let _this = this
            axios.delete('v1/core/admin/auth_role/delete/' + this.data_scope.row.id)
                .then(function (res) {
                    res = res.data
                    if(res.code=='200'){
                        _this.$Message.success(res.msg)
                    }else{
                        _this.$Message.error(res.msg)
                    }
                    _this.data_scope = null
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        cancel() {
        }
    }
}
</script>

<style>

</style>
