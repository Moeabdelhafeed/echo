<template>
    <div @click="handleClick()" class="d-flex align-items-center p-4 pointer1" :class="{ 'bg-red': mouseEnter === 'red', 'bg-green': mouseEnter === 'green' }">
        <div  class="profile-container profile   "  :class="[$route.name ==='profile' ? 'profileborder' : '']">
            <img     :src="request.profile_image" alt="">
            </div>
        <p class="mb-0 ms-3 text-truncate w-25">{{request.name}}</p>
        <p class="mb-0 text-white-50 position-absolute ms-3" style="right:115px">{{ formatDate(request.updated_at) }}</p>
        <div class=" position-absolute end-0 me-4" @click.stop>
            
        <i
            @click="acceptReqClick(request.id)"
            @mouseenter="mouseEnter = 'green'"
            @mouseleave="mouseEnter = false"
            class="mb-0 text-success ms-5 bi bi-check-circle-fill icon"
        ></i>
        <i 
            @click="rejectReqClick(request.id)"
             @mouseenter="mouseEnter = 'red'"
            @mouseleave="mouseEnter = false"
        class="mb-0 text-danger ms-3 bi bi-x-circle-fill icon"></i>
        </div>
    </div>
</template>

<script setup>
import { useFriendsStore } from '@/stores/Freinds';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import timeFunction from '@/plugins/timeFunction';
import { useMessagesStore } from '@/stores/Messages';
import { storeToRefs } from 'pinia';




let mouseEnter = ref(false);
const $router = useRouter();

const {newFriend} = storeToRefs(useMessagesStore())

const {rejectReq, acceptReq} = useFriendsStore();

const {formatDate} = timeFunction();



const props = defineProps({
    request:{
        type: Object,
        required: true
    }
})

const rejectReqClick = (id) => {
    rejectReq(id)
}

const acceptReqClick = (id) => {
    acceptReq(id).then(() => {
        
    })
}

const handleClick = () => {
    $router.push({name: 'profile' , params: {'id' : props.request.id}})
}
</script>

<style scoped>
.profile {
    height: 50px;
    width: 50px;
    cursor: pointer;
}

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



.pointer1 {
    cursor: pointer;
}


</style>
