<template>
    
    <div class="sidebar  border border-start-0 border-bottom-0 border-top-0 col-auto dvh-100 p-4">
        <RouterLink class=" text-white text-decoration-none" :to="{name: 'messages'}">
            <h5 class="textcolor fw-bold">Echo.</h5>
        </RouterLink>
        <div class="mt-5">
        
            <RouterLink :to="{name: 'messages'}" class="nav-link" > 
                <i class="bi bi-chat-fill sidebar-icons m-auto text-center d-block mb-3" 
  :class="[$route.name && $route.name.includes('messages') ? 'active' : '', newMessage ? 'active' : '']">
  <span style="font-size:15px " class=" ms-1 position-absolute" v-if="count_unseen_chats <= 9"> {{count_unseen_chats }}</span>
  <span style="font-size:15px " class=" ms-1 position-absolute" v-else> +9 </span>
</i>


        </RouterLink>
        

        <RouterLink :to="{name: 'friends'}" class="nav-link" > 
            <i class="bi bi-person-fill sidebar-icons d-block text-center mb-3" :class="[$route.name ==='friends' ? 'active' : '', , newFriend ? 'active' : '']"></i>
                <transition 
                appear
                @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave"  @leave="leave"
                >
            <div v-if="newFriend" class="z-0 d-flex justify-content-center mt-3 mb-3">
            <div  class="bg-noti z-0  p-2 rounded-5 "  >
                    new 
                </div>
            </div>
            </transition>
        </RouterLink>
        <RouterLink :to="{name: 'search'}" class="nav-link" > 
            <i class="bi bi bi-search sidebar-icons d-block text-center mb-3" :class="[$route.name ==='search' ? 'active' : '']"></i>
        </RouterLink>

        <RouterLink :to="{name: 'friendsRequests'}" class="nav-link" >
        
            <i class=" z-3  bi bi-bell-fill sidebar-icons d-block position-relative text-center " :class="[$route.name ==='friendsRequests' ? 'active' : '', newReq ? 'active' : ''] ">
                <span style="font-size:15px " class=" position-absolute" v-if="requests.length <= 9"> {{ requests.length }}</span>
                <span style="font-size:15px " class=" position-absolute" v-else> +9 </span>
            </i>
                <transition 
                appear
                @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave"  @leave="leave"
                >
            <div v-if="newReq"  class="z-0 d-flex justify-content-center mt-3">
            <div  class="bg-noti z-0 position-absolute p-2 rounded-5 " >
                    new 
                </div>
            </div>
            </transition>
            
                
        </RouterLink>
        
        </div>
        <RouterLink :to="{name : 'profile', params: { id: user.id }}">

            <div  class="profile-container profile position-absolute bottom-0 mb-4   "  :class="[$route.params.id == user.id ? 'profileborder' : '']">
            <img     :src="user.profile_image" alt="">
            </div>
        </RouterLink>
    </div>
</template>

<script setup>
import echo from '@/plugins/echo';
import { useAuthStore } from '@/stores/auth';
import { useFriendsStore } from '@/stores/Freinds';
import Echo from 'laravel-echo';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import { useMessagesStore } from '@/stores/Messages';
import { useWebNotification } from '@vueuse/core';

const { isSupported, permissionGranted, ensurePermissions } = useWebNotification();



if (isSupported.value && !permissionGranted.value) {
  ensurePermissions(); 
}



const $route = useRoute();

const {addNewChat, getChats, getUnreadChats, addNewMessage, removeMessage, removeChat, initialGetChats} = useMessagesStore();

const { count_unseen_chats, newMessage, outSideTyping , newFriend, newReq} = storeToRefs(useMessagesStore());

const {getRequests, addNewReq, addNewFriend, removeFriendWeb, removeReqWeb} = useFriendsStore();

const {requests} = storeToRefs(useFriendsStore());

const {user} = storeToRefs(useAuthStore());



const beforeEnter = (el) => {
    gsap.set(el,{
        opacity: 0,
        translateY: -20,
    })
}

const enter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        translateY: 0,
        duration: 0.5,
        onComplete: done,
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


onBeforeMount(() => {
  

})
</script>

<style scoped>

.bg-noti{
    background-color: #F0E4FF;
    color: #160429;
}
.profile{
    width: 50px;
    height: 50px;
}
.profileborder{
    border: 2px solid #F0E4FF ;
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