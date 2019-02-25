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
        let _this = this
        let length = this.$route.params.length
        if ( length > 0) {
            this.$route.params.forEach(function(e){  
                _this.$route.meta.api = _this.$route.meta.api + '/' + _this.$route.params[e]
            });
            _this.api = _this.$route.meta.api
        } else {
            _this.api = _this.$route.meta.api
        }
    },
    watch: {
        $route(){
            let _this = this
            let length = this.$route.params.length
            if ( length > 0) {
                this.$route.params.forEach(function(e){  
                    _this.$route.meta.api = _this.$route.meta.api + '/' + _this.$route.params[e]
                });
                _this.api = _this.$route.meta.api
            } else {
                _this.api = _this.$route.meta.api
            }
        },
    }
}
</script>
    
<style>
</style>
