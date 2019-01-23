<template>
  <div>
    <VaDylist :api="api"></VaDylist>
  </div>
</template>

<script>
import VaDylist from '@/views/components/va_dypage/va_dylist'
export default {
    name: 'va_dylist_route',
    components: {
        VaDylist
    },
    data () {
        return {
            api: ''
        };
    },
    created: function(){
    },
    mounted: function(){
        this.api = this.$route.meta.api
    },
    watch: {
        $route(){
            this.api = this.$route.meta.api
        },
    }
}
</script>
    
<style>
</style>
