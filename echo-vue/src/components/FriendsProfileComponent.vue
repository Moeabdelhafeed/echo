<template>
    <div @click="handleClick()" class="d-flex align-items-center p-4 pointer1" :class="{ 'bg-red': mouseEnter === 'red', 'bg-green': mouseEnter === 'green' }">
        
        <div  class="profile-container profile   "  :class="[$route.name ==='profile' ? 'profileborder' : '']">
            <img     :src="friend.profile_image" alt="">
            </div>
            
        <p class="mb-0 ms-3 text-truncate w-25 " >{{ friend.name }}</p>
        <p class="mb-0 text-white-50 position-absolute ms-3" style="right:70px">{{ dayjs(friend.updated_at).format("MMMM D, YYYY")
        }}</p>
        <div class=" position-absolute end-0 me-4" @click.stop>

        <i 
            @click="removeFriendClick(friend.id)"
             @mouseenter="mouseEnter = 'red'"
            @mouseleave="mouseEnter = false"
        class="mb-0 text-danger ms-3 bi bi-x-circle-fill icon"></i>
        </div>
    </div>
</template>

<script setup>
import { useFriendsStore } from '@/stores/Freinds';
import { ref } from 'vue';
import timeFunction from '@/plugins/timeFunction';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';


const {formatDate} = timeFunction();

let mouseEnter = ref(false);

const $router = useRouter();

const {removeFriend} = useFriendsStore();

const props = defineProps({
    friend: {
        type: Object,
        required: true
    }
})

const removeFriendClick = (friendId) => {
    removeFriend(friendId);
}

const handleClick = () => {
    $router.push({ name: 'profile', params: { id: props.friend.id } });
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
