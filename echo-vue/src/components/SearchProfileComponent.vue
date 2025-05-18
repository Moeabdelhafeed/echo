<template>
    <div @click="handleClick()" class="d-flex align-items-center p-4 pointer1">
        <div  class="profile-container profile   "  :class="[$route.name ==='profile' ? 'profileborder' : '']">
            <img     :src="user.profile_image" alt="">
            </div>
        <p class="mb-0 ms-3">{{user.name}}</p>
        <div class=" position-absolute end-0 me-4">
        </div>
    </div>
</template>

<script setup>
import { useFriendsStore } from '@/stores/Freinds';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const $router = useRouter()

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const handleClick = () => {
    $router.push({name: 'profile' , params: {'id' : props.user.id}})
}
</script>

<style scoped>

.icon {
    font-size: 25px;
}

.bg-red {
    background-color: rgba(255, 108, 108, 0.247);
    transition:  0.3s;
}

.bg-green{
    background-color: rgba(74, 255, 74, 0.267);
    transition:  0.3s;
}
.bg-yellow{
    background-color: rgba(152, 194, 0, 0.267);
    transition:  0.3s;
}




.pointer1 {
    cursor: pointer;
}


</style>
