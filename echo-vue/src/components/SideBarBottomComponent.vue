<template>
    <div v-if="!$route.params.chatId" class="sidebar border border-start-0  d-flex  justify-content-center border-bottom-0 border-end-0 position-absolute bottom-0 z-3 ">

        <div class=" justify-content-between align-items-center  w-75 d-flex m-3  ">
            
            <RouterLink :to="{name: 'messages'}" class="nav-link" > 
            <i class="bi bi-chat-fill sidebar-icons m-auto  " :class="[$route.name.includes('messages') ? 'active' : '', newMessage ? 'active' : '']" >
                <span style="font-size:15px " class=" ms-1 position-absolute" v-if="count_unseen_chats <= 9"> {{count_unseen_chats }}</span>
  <span style="font-size:15px " class=" ms-1 position-absolute" v-else> +9 </span>
            </i>
        </RouterLink>


        <RouterLink :to="{name: 'friends'}" class="nav-link" > 
            <i class="bi bi-person-fill sidebar-icons  " :class="[$route.name === 'friends' ? 'active' : '', newFriend ? 'active' : '']"></i>
        </RouterLink>

        <RouterLink :to="{name: 'search'}" class="nav-link" > 
            <i class="bi bi bi-search sidebar-icons " :class="[$route.name ==='search' ? 'active' : '']"></i>
        </RouterLink>

        <RouterLink :to="{name: 'friendsRequests'}" class="nav-link d-flex justify-content-center" >
        
        <i class=" bi bi-bell-fill sidebar-icons d-block position-relative text-center " :class="[$route.name ==='friendsRequests' ? 'active' : '' , newReq ? 'active' : '']">

            <span style="font-size:15px " class=" position-absolute"> {{ requests.length }}</span>
        </i>
        <div class="z-0 d-flex justify-content-center mt-3">
                <transition 
                appear
                @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave"  @leave="leave"
                >

            </transition>
            </div>
            
    </RouterLink>
    
    <RouterLink :to="{name : 'profile', params: { id: user.id }}">

        <div  class="profile-container profile   "  :class="[$route.params.id == user.id ? 'profileborder' : '']">
            <img     :src="user.profile_image" alt="">
            </div>
</RouterLink>
      
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useFriendsStore } from '@/stores/Freinds';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import gsap from 'gsap'
import { onBeforeMount, onMounted, ref } from 'vue';
import echo from '@/plugins/echo';
import { useMessagesStore } from '@/stores/Messages';
import { useWebNotification } from '@vueuse/core';

const { isSupported, permissionGranted, ensurePermissions } = useWebNotification();



if (isSupported.value && !permissionGranted.value) {
  ensurePermissions(); 
}


const {addNewReq, addNewFriend} = useFriendsStore();
const {count_unseen_chats, newMessage, newFriend, newReq} = storeToRefs(useMessagesStore())
const {addNewChat, getChats, getUnreadChats, addNewMessage, removeMessage, removeChat, initialGetChats, } = useMessagesStore();

const {user} = storeToRefs(useAuthStore());

const $route = useRoute();

const {requests} = storeToRefs(useFriendsStore());



const beforeEnter = (el) => {
    gsap.set(el,{
        opacity: 0,
        translateY: -20,
    })
}

const enter = (el) => {
    gsap.to(el, {
        opacity: 1,
        translateY: 0,
        duration: 0.5,
    })
}


const leave = (el, done) => {
    gsap.to(el, {
        opacity: 0,
        translateY: -20,
        duration: 0.5,
        onComplete: done,
    })
}


onMounted(() => {
 


})

</script>

<style scoped>

.profileborder{
    border: 2px solid #F0E4FF;
}

.profile{
    width: 30px;
    height: 30px;
}
.sidebar-icons{
    color: rgba(255, 255, 255, 0.479);
    font-size: 25px;
    cursor: pointer;
}
.sidebar-icons:hover{
    color: #F0E4FF;
    transition: 0.3s;
}

.active{
    color: #F0E4FF;
}

</style>