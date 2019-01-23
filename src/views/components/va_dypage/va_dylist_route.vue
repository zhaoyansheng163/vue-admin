<template>
  <div>
    <VaDylist :api="$route.params.api"></VaDylist>
  </div>
</template>

<script>
import VaDylist from '@/views/components/va_dypage/va_dylist'
export default {
    name: 'va_dylist_route',
    components: {
        VaDylist
    }
}
</script>
    
<style>
</style>
