<template> 

<div 
    class="overflow-auto position-relative messagebar border border-start-0 border-bottom-0 border-top-0 col-auto col-size dvh-100" 
    :class="{'col-size-100' : !$route.params.chatId, 'background-color-col' : windowWidth <= 576}"
>
<h5  
    class="fw-bold p-4 mb-0 hide-on-md-again"  
    v-if="!($route.params.chatId && windowWidth <= 576)"
>
    Messages
</h5>
<div v-if="loading" class="d-flex justify-content-center m-4 align-items-center">
    Loading chats...
    </div>
<div   v-if="notArchivedChats.length > 0" >
    

    <div  class="position-sticky top-0 z-3 sticky-title">
    </div>
   


    <div v-if="notArchivedChats" :class="{'d-on-sm-n': $route.params.chatId}">
    <MessagesBarProfileComponent 
        @click="handleClick(chat.id)" 
        v-for="chat in notArchivedChats" 
        :key="chat.id" 
        :chat="chat" 
    />
    <div class="mb-6 d-sm-none"></div>
    </div>

    
</div>
<div v-else class="hide-up-m"  >
    <div 
    v-if="!isSmallScreen && !loading"
    class="col dvh-100 d-flex flex-column align-items-center bg justify-content-center text-center p-5 " >
    
    <i class="bi mb-3 rounded-circle bi-chat icon"></i>
    <h3>Start messaging your friends</h3> 

    <div class="mb-6"></div>
  </div>
</div>
</div>
</template>

<script setup>
import MessagesBarProfileComponent from './MessagesBarProfileComponent.vue';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useMessagesStore } from '@/stores/Messages';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const { getChats } = useMessagesStore();
const $router = useRouter();
const $route = useRoute();

let { loading, hasMoreData, notArchivedChats } = storeToRefs(useMessagesStore());

const scrollDiv = ref(null);
const windowWidth = ref(window.innerWidth);
const showMessagesText = ref(true);

// Function to update window width
const updateWidth = () => {
windowWidth.value = window.innerWidth;
showMessagesText.value = !(windowWidth.value > 576 && windowWidth.value < 1000);
};

// Listen for window resize
onBeforeMount(() => {
hasMoreData = true;
window.addEventListener('resize', updateWidth);
updateWidth();
});

// Cleanup on unmount
onUnmounted(() => {
window.removeEventListener('resize', updateWidth);
});

const handleClick = (id) => {
$router.push({ name: 'messagesChat', params: { chatId: id } });
};
</script>

<style scoped>
@media (min-width: 1000px){
    .col-size{
        width: 400px;
    }
    .mt-5-md{
        margin-top: 0.5rem;
    }
}

@media (max-width: 576px){
    .d-on-sm-n{
        display: none;
    }
    .col-size-100{
        width: 100%;
    }
  
}

@media (min-width: 576px) and (max-width: 1000px) {
    .hide-on-md-again {
        display: none !important;
    }
}

@media (min-width: 576px) {
    .hide-up-m{
        display: none;
    }
}

.sticky-title{
    background-color: #201032;
}


@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 75px;
  }
}

.col {
  background-color: #160429;
}

.background-color-col{
    background-color: #160429;
}
.icon {
  color: #F0E4FF;
  font-size: 70px;
}
</style>
