<template>
    <ConsltRoom :idR="$route.params.idRoom" mensagem="Id of room"/>
</template>

<script>
import ConsltRoom from '@/components/ConsltRoom.vue';

export default {
    components: {
        ConsltRoom
    }
};
</script>