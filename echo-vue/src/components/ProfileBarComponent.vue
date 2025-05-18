<script setup>
import MessagesBarComponent from '@/components/MessagesBarComponent.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import MessagesChatInfoSidebarComponent from './MessagesChatInfoSidebarComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useFriendsStore } from '@/stores/Freinds';
import echo from '@/plugins/echo';
import { useMessagesStore } from '@/stores/Messages';

const {chats, notArchivedChats} = storeToRefs(useMessagesStore());
const {getChats, initialGetMessages}= useMessagesStore();

const $route = useRoute()
const authStore = storeToRefs(useAuthStore())
const $router = useRouter()
const user = ref(null)
const {getUserWithId} = useAuthStore();
const {createFriend, deleteReq, rejectReq, acceptReq, removeFriend} = useFriendsStore();


const handleCreateFriend = (id) =>{
    createFriend(id).then((s) => {
        if(s){
            user.value.pending = true;
        }
    });
   
}
const handleDeleteReq = (id) =>{
    deleteReq(id).then((s) => {
        if(s){
            user.value.pending = false;
        }
    });
   
}

const handleRejectReq = (id) =>{
    rejectReq(id).then((s) => {
        if(s){
            user.value.hePending = false;
        }
    });
   
}

const handleAcceptReq = (id) =>{
    acceptReq(id).then((s) => {
        if(s){
            user.value.hePending = false;
            user.value.pending = false;
            user.value.friend = true;
            getChats();
        }
    });
}

onMounted( async () => {
    await getChats();
    getUserWithId($route.params.id).then((s) => {
        if(s){
            user.value = s;
        }else{
            $router.push({name: 'friends'})
        }
    })


    echo.private( `user.${authStore.user.value.id}`)
    .listen('.friend.req.sent', (event) => {
        user.value.hePending = true;
            }).listen('.friend.req.accept', (event) =>{
        user.value.friend = true;
        user.value.hePending = false;
        user.value.pending = false;
    
    }).listen('.friend.req.delete', (event) => {
        user.value.pending = false;
        user.value.hePending = false;
        user.value.friend = false;
            }).listen('.friend.delete', (event) => {
                user.value.friend = false;
                user.value.pending = false;
                user.value.hePending = false;
            });
})

const handleBack = () => {
    $router.go(-1)
}

const removeFriendClick = (id) => {
    removeFriend(id).then((s) => {

        user.value.friend = false;
    })
}


const handleChat = async () => {
    // First, try to find the chat with the user in the first position
    const onechat = chats.value.find((c) => c.users[0]?.id === user.value.id);
    // Then, try to find the chat with the user in the second position
    const twochat = chats.value.find((c) => c.users[1]?.id === user.value.id);

    // Check if a valid chat was found in either position
    if (onechat) {
        $router.push({ name: 'messagesChat', params: { chatId: onechat.id } });
        initialGetMessages(id);
    } else if (twochat) {
        $router.push({ name: 'messagesChat', params: { chatId: twochat.id } });
        initialGetMessages(id);
    } else {
        console.error('No chat found for the user:', user.value.id);
        // Optionally, handle the case where no chat is found (e.g., create a new chat or show a message)
    }
};

</script>

<template>

<div class="overflow-auto position-relative messagebar col  dvh-100  ">
    <div class=" bg-background  align-items-center d-flex border-start-0 border-end-0 border-top-0 position-sticky  top-0 z-3 sticky-title ">
        <i @click="handleBack()" class="bi bi-arrow-left textcolor ms-4 icon "></i>
    <h5 class="  fw-bold p-4 mb-0 chat-title me-4 ">profile</h5>
</div>
<div class="d-flex justify-content-center">

<div  class="profile-container    "  :class="[$route.name ==='profile' ? 'profileborder' : '']">
            <img   v-if="user"  :src="user.profile_image" alt="">
            </div>
</div>
            
            <div class="text-center text-wrap w-50 m-auto   mt-4" v-if="user">
                <h2 class="text-break h2"> {{ user.name}}</h2>
                <h5  class=" text-white-50 text-break"> {{user.bio  }}</h5>
                <button v-if="!user.pending && !user.hePending && !user.friend" @click="handleCreateFriend(user.id)" type="submit" class="smallbtn activebtn border-0 rounded-5 mt-4 p-3 " style="width: 200px;"> Add</button>
                <button v-if="user.pending" @click="handleDeleteReq(user.id)" type="submit" class=" btn btn-outline-warning mt-4 rounded-5  p-3 " style="width: 200px;"> pending</button>
                <div v-if="user.hePending" >

                <button @click="handleAcceptReq(user.id)"  type="submit" class=" btn btn-outline-success mt-4 mx-2 rounded-5  p-3 " style="width: 100px;"> accept</button>
                <button @click="handleRejectReq(user.id)" type="submit" class=" btn btn-outline-danger mt-4 mx-2 rounded-5  p-3 " style="width: 100px;"> cancel</button>
                </div>
                <div v-if="user.friend" class=" flex-column">
            
                <button @click="handleChat()"  type="submit" class="btn btn-success border-0 rounded-5 mt-4 p-3 " style="width: 200px;"> chat with your friend</button>
                </div>
            </div>
            <div v-if="user">

                <div v-if="user.friend" class=" position-absolute bottom-0 w-100 mb-6">
                    <button @click="removeFriendClick(user.id)" class="btn btn-outline-danger border-0 p-3 rounded-0 w-100 ">
                        delete friend
                    </button>
                </div>
            </div>

            
            
</div>

</template>


<style scoped>


.profile{
    height: 200px;
    width: 200px;
}
.chat-title {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.icons{
    color: rgba(255, 255, 255, 0.479);
    font-size: 25px;
    cursor: pointer;
}
.icons:hover{
    color: #F0E4FF;
    transition: 0.3s;
}


.bg-background{
    background-color: #160429;
}


</style>