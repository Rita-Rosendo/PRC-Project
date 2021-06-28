<template>
    <ConsltHotel :idH="$route.params.idHotel" mensagem="Id of hotel"/>
</template>

<script>
import ConsltHotel from '@/components/ConsltHotel.vue';

export default {
    components: {
        ConsltHotel
    }
};
</script>