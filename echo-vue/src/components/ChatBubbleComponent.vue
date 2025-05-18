<template>
  
  <div @mouseenter="showHover = true" 
  @mouseleave="showHover = false" class="message-container text-strat ">

  
    <div 
      
      
      class="mt-2 bubble w-auto d-inline-block   text-wrap position-relative d-flex align-items-center justify-content-center "
    >


    <div v-if="showHover" class="dropdown position-relative d-flex align-items-center">

      <i v-if="isFriend" @click.prevent="replyTo(message)" type="button" role="button"  style="right:45px;" class="bi  translate-middle-y top-50 bi-reply-fill color-white-hover position-absolute"></i>
      <i @click.prevent type="button" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="right:15px;" class="bi  translate-middle-y top-50 bi-three-dots color-white-hover position-absolute"></i>
  <ul class="dropdown-menu rounded-4  ">
    
    <li class=" no-hover dropdown-item text-white-50" style="font-size: 13px;">
        {{ formatTime(message.created_at) }}
    </li>
      
  <li v-if="isFriend" @click.stop="deleteMessage(message.id, message.chat_id)"  class="text-danger rounded-3  dropdown-item cursor-pointer d-flex align-items-center">
    <i class="bi bi-trash text-danger me-2 cursor-pointer " ></i> Unsend
  </li>

  </ul>
</div>
<div class="w-100">

<div v-if="message.reply_to" class="reply-preview reply-text text-white-50   " :class="{'sender' : message.reply_to.user_id == user.id, 'reciever' : message.reply_to.user_id != user.id}" >
  <span class="text-white" v-if="user.id == message.reply_to.user_id">
    You: 
  </span>
  <span class="text-white" v-else>

  {{ reciever}}:
  </span>
  
  <br>
  <span  >

  {{ message.reply_to.content }}
  </span>
  <span class="reply-text">

  </span>
</div>
<div class="m-3" :class="{'mt-2' : message.reply_to}" >

      {{ message.content }}
</div>
</div>
    </div>

 
      

  </div>
</template>

<script setup>
import timeFunction from '@/plugins/timeFunction';
import { useAuthStore } from '@/stores/auth';
import { useMessagesStore } from '@/stores/Messages';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

defineProps({
  message: {
    type: Object,
    required: true,
  },
  isFriend: {
    type: Boolean,
    required: true,
  },
  sender:{
    type: Boolean,
    required: true,
  },
  reciever:{
    type: Boolean,
    required: true,
  },
 
});

const emit = defineEmits([
    'replyTo'
])

const replyTo = (message) =>{
    emit('replyTo', message)
}


const showHover = ref(false);
const { deleteMessage } = useMessagesStore();
const {user} = storeToRefs(useAuthStore())

const { formatTime } = timeFunction();
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.bubble {
  border-radius: 20px;
  word-wrap: break-word;
  word-break: break-word; /* Ensures long words break */
  overflow-wrap: break-word; /* Alternative for better support */
  max-width: 60%;
  background-color: #45147a;
  position: relative;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu{

  background-color: #270b46;
}

.dropdown-item {
  padding: 10px 12px; /* Ensure padding is inside the dropdown */
  margin: 4px 6px; /* Reduce margins to prevent overflow */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align text and icon properly */
  border-radius: 8px; /* Keep styling consistent */
  transition: background 0.2s ease-in-out;
  width:92%;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.color-white-hover{
  color: rgba(255, 255, 255, 0.473);
}

.color-white-hover:hover{
  color: white;
  transition: 0.3s;
}


.bubble.hovered {
  background-color: #270b46;
  color: #270b46;
}

.trash-icon {
  font-size: 1.5rem; /* Make it more visible */

  color: white;
  cursor: pointer;
}

.sender{
  border-left: 4px solid #beaad6;
  
}

.reciever{
  border-left: 4px solid #8d37e9;
}
.reply-preview {
  background-color: rgba(0, 0, 0, 0.205);
  color: #f0e4ff;
  width: calc(inherit - 20px);
  overflow: hidden;
  border-radius: 10px;
  white-space: nowrap;
 
  margin: 10px 10px 0px 10px;
  padding: 10px;
  
}


.reply-text {
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
