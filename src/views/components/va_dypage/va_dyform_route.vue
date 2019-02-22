<template>
  <div>
    <Card shadow>
        <VaDyform :api="api"></VaDyform>
    </Card>
  </div>
</template>

<script>
import VaDyform from '@/views/components/va_dypage/va_dyform'
export default {
    name: 'va_dyform_route',
    components: {
        VaDyform
    },
    data () {
        return {
            api: ''
        };
    },
    created: function(){
    },
    beforeMount: function(){
        if (this.$route.params.name) {
            this.api = this.$route.meta.api + '/' + this.$route.params.name
        } else {
            this.api = this.$route.meta.api
        }
    },
    watch: {
        $route(){
            if (this.$route.params.name) {
                this.api = this.$route.meta.api + '/' + this.$route.params.name
            } else {
                this.api = this.$route.meta.api
            }
        },
    }
}
</script>
    
<style>
</style>
