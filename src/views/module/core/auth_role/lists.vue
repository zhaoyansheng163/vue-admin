<template>
  <div>
    <VaDylist api="v1/core/admin/auth_role/lists"></VaDylist>
  </div>
</template>

<script>
import VaDylist from '@/views/components/va_dypage/va_dylist'
export default {
    name: 'tree_table_page',
    components: {
        VaDylist
    },
    data () {
        return {
        }
    },
    created(){
    },
    methods: {
    }
}
</script>
    
<style>
</style>
