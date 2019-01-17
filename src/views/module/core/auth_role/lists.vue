<template>
  <div>
    <Card shadow>
      <Button @click="add()">添加</Button>
      <tree-table expand-key="title" :is-fold="false" :border="true" :stripe="true" :expand-type="false" :selectable="false" :columns="columns" :data="data_list" >
        <template slot="actions" slot-scope="scope">
          <Button @click="edit(scope)">修改</Button>
          <Button @click="deleteOne(scope)">删除</Button>
        </template>
      </tree-table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'tree_table_page',
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
      data_list: []
    }
    },
    created(){
        let _this = this
        axios.get('v1/core/admin/auth_role/lists')
            .then(function (res) {
                res = res.data
                console.log(res)
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
    add() {
        console.log(scope)
    },
    edit(scope) {
        console.log(scope)
    },
    deleteOne(scope) {
        let _this = this
        axios.delete('v1/core/admin/auth_role/delete/' + scope.row.id)
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
    }
  }
}
</script>

<style>

</style>
