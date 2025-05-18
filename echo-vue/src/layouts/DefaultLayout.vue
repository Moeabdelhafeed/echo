<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue';
import SideBarComponent from '@/components/SideBarComponent.vue';
import SideBarBottomComponent from '@/components/SideBarBottomComponent.vue';
import { useMessagesStore } from '@/stores/Messages';
import echo from '@/plugins/echo';
import { useAuthStore } from '@/stores/auth';
import { useFriendsStore } from '@/stores/Freinds';
import { storeToRefs } from 'pinia';


const {user} = storeToRefs(useAuthStore());


const $route = useRoute();

const {addNewChat, getChats, getUnreadChats, addNewMessage, removeMessage, removeChat, initialGetChats, outSideTyping, outSideNotTyping, seenMessageWithTime} = useMessagesStore();

const { count_unseen_chats, newMessage, newFriend, newReq } = storeToRefs(useMessagesStore());

const {getRequests, addNewReq, addNewFriend, removeFriendWeb, removeReqWeb} = useFriendsStore();

const {requests} = storeToRefs(useFriendsStore());



onMounted(() => {
   
    initialGetChats() 
    
    echo.private( `user.${user.value.id}`)
    .listen('.friend.req.sent', (event) => {
        newReq.value = true;
        
        addNewReq(event.sender);
        setTimeout(() => {
            newReq.value = false;
        }, 2000);
            }).listen('.friend.req.accept' , (event) => {

                newFriend.value = true;
            
                addNewFriend(event.sender);
                addNewChat(event.chat);
            
                setTimeout(() => {
                    newFriend.value = false;
                }, 2000);
            }).listen('.friend.req.delete', (event) => {
                removeReqWeb(event.sender);
            }).listen('.friend.delete', (event) => {
                removeFriendWeb(event.sender);
            });


            echo.private( `user.${user.value.id}`).listen('.friend.delete', (event) => {
                if (event.chatId){
                    removeChat(event.chatId);
                }
            }).listen('.message.delete' , (event) => {
  removeMessage(event.message, event.updated_at, event.was_deleted)
  
}).listen('.message.sent', (event) => {
  addNewMessage(event.message, '0', ).then(() => {
    newMessage.value = true;
    outSideNotTyping(event.message.chat_id)
    setTimeout(() => {
        newMessage.value = false;
    }, 2000)
  })
  if(event.chat){
    addNewChat(event.chat)
  }
}).listen('.typing', (event) =>{
    outSideTyping(event.chat_id)
}).listen('.typing.not', (event) =>{
    outSideNotTyping(event.chat_id)
}).listen('.message.seen' , (event) => {
  setTimeout(() => {
    
    seenMessageWithTime(event.last_message)

  }, 0);
});
    
})

</script>

<template>
<div class="row m-0 p-0 g-0  ">
    <SideBarComponent class=" d-sm-block d-none"/>
    <SideBarBottomComponent class=" d-sm-none " />
    

    <slot />

</div>



</template>

<style>



</style>