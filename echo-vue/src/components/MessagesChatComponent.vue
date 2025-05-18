<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMessagesStore } from '@/stores/Messages';
import MessagesChatInfoSidebarComponent from './MessagesChatInfoSidebarComponent.vue';
import { set, useInfiniteScroll, useScroll, useThrottle, useWebNotification } from '@vueuse/core';
import echo from '@/plugins/echo';
import { useAuthStore } from '@/stores/auth';
import ChatBubbleComponent from './ChatBubbleComponent.vue';
import ChatBubbleOtherComponent from './ChatBubbleOtherComponent.vue';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)
const repliedMessage = ref(null)
const scrollDiv = ref(null);
const bottomMarker = ref(null);
const isScrollEnabled = ref(false);
const isTyping = ref(false);
const amItyping = ref(false);
let typingTimeout = null;
const seen = ref(false);
const isChatOpen = ref(false);
const $route = useRoute();
const $router = useRouter();
const addedHeight = ref(null);

const { getChat, initialGetMessages, getMessages, sendMessage, addNewMessage , addNewChat, typing, notTyping, removeMessage, seenMessage, groupMessages, seenMessageWithTime } = useMessagesStore();
let { chat, loadingMessages, hasMoreDataMessages, groupedMessages, messages } = storeToRefs(useMessagesStore());
const message = ref('');
const inputRef = ref(null);
const {user} = storeToRefs(useAuthStore());
const formRef = ref(null);
const lastMessageTime = ref(null);

const unseenMessages = ref([]);

const handleReplyTo = (message) => {
  repliedMessage.value = message;
  inputRef.value.focus();
  setTimeout(() => {
    
    adjustInputHeight()
  }, 0);
  
}
const handleCancelReply = () =>{
  repliedMessage.value = null;
  setTimeout(() => {
    
    adjustInputHeight()
  }, 0); 
}

const lastMessageTimeFun =() =>{
  if(messages.value.length > 0){
    lastMessageTime.value = dayjs(messages.value[messages.value.length - 1].updated_at).fromNow();
  }
}


const seenAllMessages = () => {
  if(isChatOpen.value && unseenMessages.value.length > 0 ){
    seenMessage(unseenMessages.value, chat.value.id).then(() => {
      unseenMessages.value = [];
      
    })
  }
}

function scrollToBottom() {
  if (bottomMarker.value) {
    bottomMarker.value.scrollIntoView({ behavior:'smooth' });
  }
}






const handleTyping = () => {
  if (!amItyping.value) {
    if (chat.value?.users?.[0]) {
  typing(chat.value.users[0].id, chat.value.id);
}// Emit "typing" only once per session
    amItyping.value = true;
  }

  clearTimeout(typingTimeout); // Reset timeout on every keystroke

  typingTimeout = setTimeout(() => {
    notTyping(chat.value.users[0].id, chat.value.id); // Emit "notTyping" after inactivity
    amItyping.value = false; // Reset typing state
  }, 2000);
};

let infoFill = ref(false);



// Store the column width in a reactive reference
const columnWidth = ref(0);



// Dynamically adjust the width of the element based on the column width
const elementWidth = ref('calc(px)');
const colRef = ref(null); // Use ref here for the column element

watch(colRef, () => {
  updateWidth();
})

const updateWidth = () => {
  if (colRef.value) {
      columnWidth.value = colRef.value.offsetWidth;
      elementWidth.value = `calc(${columnWidth.value}px)`;
  }
};

const handleTabChange = () => {
  if (document.hidden) {
    isChatOpen.value = false;
  } else {
    isChatOpen.value = true;
    getUnseenMessage();
    seenAllMessages();
    checkSeen();
  }
};


const handleKeyUp = (event) => {
if (event.key === 'Enter' && !event.shiftKey) {
  event.preventDefault(); 
  submitForm(); 
}
};

const submitForm = () => {
if (message.value.trim() === '') return;
inputRef.value.focus();


sendMessage(message.value, chat.value.id, repliedMessage.value ).then(() => {

  seen.value = false;
  scrollToBottom();
  isTyping.value = false;
  setTimeout(() => {
    lastMessageTimeFun()

    adjustInputHeight();
  }, 0)
})
repliedMessage.value = null
message.value = '';

};


const showInfo = () => {
infoFill.value = !infoFill.value;
};



watch(message, () => {
adjustInputHeight();
});


const adjustInputHeight = () => {
if (inputRef.value) {
  inputRef.value.style.height = 'auto'; 
      
      inputRef.value.style.height = `${inputRef.value.scrollHeight}px`;
}
if(window.innerWidth > 576){
  const remainingScroll = Math.round(colRef.value.scrollHeight - colRef.value.scrollTop - colRef.value.clientHeight - addedHeight.value.scrollHeight + formRef.value.scrollHeight - 119);
  addedHeight.value.style.height = `${formRef.value.scrollHeight +11 }px`;
  if(remainingScroll < 0){
    scrollToBottom()
  }
}else{
  const remainingScroll = Math.round(colRef.value.scrollHeight - colRef.value.scrollTop - colRef.value.clientHeight - addedHeight.value.scrollHeight + formRef.value.scrollHeight - 119);
  addedHeight.value.style.height = `${formRef.value.scrollHeight +81 }px`;
  if(remainingScroll < 0){
    scrollToBottom()
  }
}

};


useInfiniteScroll(
  colRef, async () => {
    console.log('working')
    if (!loadingMessages.value && messages.value.length >= 30 && hasMoreDataMessages.value && isScrollEnabled.value) {
      
      await getMessages(chat.value.id);
      
    }
  },
  {
    direction: 'top',
    distance: 0, 
  }
);


const checkSeen = () => {
  const checkSeenMessages = messages.value
    .filter(message => !message.seen && message.user_id === user.value.id) 
    .map(message => message.id);

  
  if(checkSeenMessages.length > 0){
    seen.value = false;
  }else{
    seen.value = true;
  }
}
const getUnseenMessage = () =>{
  unseenMessages.value = messages.value
    .filter(message => !message.seen && message.user_id !== user.value.id) 
    .map(message => message.id);
}



onMounted( async () => {
await nextTick(() => {
  lastMessageTimeFun()
    updateWidth();
    window.addEventListener('resize', () => {
      adjustInputHeight();     
});

echo.private( `user.${user.value.id}`)
    .listen('.friend.delete', (event) => {
      if(event.sender.id == chat.value.users[0].id){
        

        chat.value.is_friend = false;
      }
            })


});


document.addEventListener("visibilitychange", handleTabChange);


isChatOpen.value = true;




echo.private(`user.${user.value.id}`).listen('.message.sent', (event) => {
  addNewMessage(event.message, chat.value).then(() => {
    isTyping.value = false;
    getUnseenMessage()
    seenAllMessages();
    checkSeen();
    scrollToBottom();
  })
  if(event.chat){
    addNewChat(event.chat)
  }
}).listen('.typing' , (event) => {

  if(event.sender.id == chat.value.users[0].id){
    isTyping.value = true;
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }
}).listen('.typing.not' , (event) => {
  if(event.sender.id == chat.value.users[0].id){
    isTyping.value = false;

  }
}).listen('.message.delete' , (event) => {
   getUnseenMessage()
}).listen('.message.seen' , (event) => {
  seen.value = true;
  setTimeout(() => {
    
    seenMessageWithTime(event.last_message).then(() => {
      adjustInputHeight();
      lastMessageTimeFun();
    })

  }, 0);
})

hasMoreDataMessages.value = true;





getChat($route.params.chatId).then(async (s) => {
  if (!s) {
    $router.push({ name: 'messages' });
  }
  initialGetMessages(chat.value.id).then((s) => {
    getUnseenMessage();
    lastMessageTimeFun();
    seenAllMessages();
    checkSeen();
    setTimeout(()=>{
      scrollToBottom();
    }, 0)
    
    setTimeout(() => {

      isScrollEnabled.value = true;
    }, 2000)
  });
});




window.addEventListener('resize', updateWidth);
});

onBeforeUnmount(() => {
window.removeEventListener('resize', updateWidth);




document.removeEventListener("visibilitychange", handleTabChange);

isChatOpen.value = false;
});


</script>

<template>
  <div  :key="$route.params.chatId" v-if="chat.length !== 0" ref="colRef" class="overflow-auto position-relative messagebar border border-start-0 border-bottom-0 border-top-0 col dvh-100">
    <div    class="bg-background border  align-items-center d-flex border-start-0 border-end-0 border-top-0 position-sticky top-0 z-3 sticky-title">
      <i  class="bi bi-arrow-left text-white ms-3 d-sm-none" style="font-size:25px" @click="$router.push({name:'messages'})"></i>

      <img 
      @click="$router.push({name: 'profile', params: {id : chat.users[0].id}})"
 
  v-if="chat.length !== 0" 
  :src="chat.users[0].profile_image" 
  alt="" 
  style="cursor: pointer;" 
  class="ms-3 rounded-circle img img-fluid" 
  width="45px" 
  height="45px" 
  :style="{
    borderRadius: '50%',
    objectFit: 'cover',
    width: '45px',
    height: '45px'
  }" 
/>
      <div @click="$router.push({name: 'profile', params: {id : chat.users[0].id}})" class="p-4 ps-3">

      <h5 v-if="chat.length !== 0" class="cursor-pointer fw-bold  mb-0 chat-title  me-4">{{ chat.users[0].name }}</h5>
      </div>
      <i @click="showInfo"  @click.stop :class="[infoFill ? 'bi-info-circle-fill' : '', !infoFill ? 'bi-info-circle' : '']" class="bi textcolor icon position-absolute end-0 me-4"></i>
    </div>

    <div v-if="chat.messages && chat.messages.length === 0 && loadingMessages  == false "  class="d-flex justify-content-center m-4 align-items-center">
  there are no messages
</div>

<div v-if="loadingMessages" class="d-flex justify-content-center m-4 align-items-center">
  loading messages...
</div>



    <div ref="scrollDiv"  class=" scroll flex-column  position-relative   bottom-0 pb-7 p-4">
      <div v-for="(group, index) in groupedMessages"  :key="index">
        <div class="text-center text-secondary my-2">
        <small>{{ group.date }}</small>
      </div>


      <div v-for="(message, index) in group.messages" :key="index">
        <div v-if="message.sender.id === user.id">

        <ChatBubbleComponent @replyTo="handleReplyTo" :message="message" :isFriend="chat.is_friend " :sender="user" :reciever="chat.users[0].name" />
        </div>
        <div v-else>
          <ChatBubbleOtherComponent @replyTo="handleReplyTo" :message="message" :isFriend="chat.is_friend"  :sender="chat.users[0].name" :reciever="user" />
        </div>
       
      </div>


     
      </div>
      
<div v-if="messages.length > 0 ">

      <div v-if="seen &&  messages[messages.length - 1].user_id == user.id"  class="d-flex justify-content-end mt-1 me-2 text-white-50">
    
  seen {{ lastMessageTime }} 
</div>
      <div v-if="!seen &&  messages[messages.length - 1].user_id == user.id"  class="d-flex justify-content-end mt-1 me-2 text-white-50">
    
   sent {{ lastMessageTime }} 
</div>
</div>

      <div v-if="isTyping" class="mt-2  w-auto d-inline-block p-3 rounded-5 bubble ">
        <div class="ticontainer">
  <div class="tiblock">
    <div class="tidot"></div>
    <div class="tidot"></div>
    <div class="tidot"></div>
  </div>
</div>
      </div>
      <div class=" height-6 " ref="addedHeight" >
      </div>
      <div ref="bottomMarker" ></div>
    </div>



    <div v-if="chat.is_friend" class="bg-background w-100 align-items-center d-flex position-fixed bottom-0 z-3 sticky-title ">
      
      <form ref="formRef" @submit.prevent @submit="submitForm()" class=" p-4 bg-background " :style="{ width: elementWidth }">
        <div v-if="repliedMessage" class="reply-preview d-flex align-items-center px-3 py-2  mb-3 rounded-3" :class="{'sender': repliedMessage.sender.id == user.id, 'reciever' :  repliedMessage.sender.id != user.id}">
  <div class="reply-text flex-grow-1 text-truncate" >
    <span v-if="repliedMessage.sender.id != user.id">{{ repliedMessage.sender.name }}:</span>
    <span v-else>You:</span>
     <br> {{ repliedMessage.content }}
  </div>
  <i @click="handleCancelReply" class="bi bi-x-circle ms-2 text-danger reply-cancel"></i>
</div>

        <div class="position-relative w-100">
          
          <button type="submit" class="btn rounded-circle  iconcircle2 me-2 position-absolute end-0 d-flex align-items-center justify-content-center">
            <i class="bi bi-send-fill"></i>
          </button>
          <textarea
            ref="inputRef"
            @input="handleTyping"
            v-model="message"
            placeholder="message..."
            class="formcontrol align-content-center w-100 rounded-5 py-2  "
            rows="1"

            style="resize: none;" 
            @keyup="handleKeyUp"
          />
        </div>
      </form>
    </div>

    <div v-else class="bg-background border p-4 justify-content-center align-items-center d-flex position-fixed bottom-0 mb-6" :style="{ width: elementWidth }">
     this user is not your friend
    </div>

  </div>

  <MessagesChatInfoSidebarComponent :chat="chat" @hideInfo="infoFill = !infoFill" v-if="infoFill" />
</template>

<style scoped>

.downbtn{
  background-color: #3b1168;
  width: 50px;
  height: 50px;

}

.bubble {
    background-color: #200b36;
}

.chat-title {
white-space: nowrap;
width: 200px;
overflow: hidden;
text-overflow: ellipsis;
}



.tiblock {
    align-items: center;
    display: flex;
    gap: 2px;
    height: 17px;
}

.ticontainer .tidot {
    background-color: #ffffff81;
}

.tidot {
  width: 8px;
  height: 8px;
  
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
}

@keyframes mercuryTypingAnimation {
  0% {
    transform: translateY(0px);
  }
  28% {
    transform: translateY(-5px);
  }
  44% {
    transform: translateY(0px);
  }
}


/* Delays for smooth bouncing effect */
.tidot:nth-child(1) {
  animation-delay: 200ms;
}
.tidot:nth-child(2) {
  animation-delay: 300ms;
}
.tidot:nth-child(3) {
  animation-delay: 400ms;
}

.icon {
color: #f0e4ff;
font-size: 20px;
cursor: pointer;
}

.formcontrol {
border: 1px solid #f0e4ff;
background-color: #7c6e8b;
height: auto;
min-height: 65px; /* Ensure it starts with a minimum height */
padding-left: 20px;
padding-right: 65px;
box-sizing: border-box;
resize: none; /* Prevent manual resizing */
overflow-y: auto; /* Allow scrolling when the content exceeds the max height */
max-height: 200px; /* Limit the height to a maximum of 200px */
white-space: pre-wrap; /* Ensure that the text wraps */

}

.reply-preview {
  background-color: rgba(255, 255, 255, 0.1);
  color: #f0e4ff;
  max-width: 100%;
  overflow: hidden;
}

.sender{
  border-left: 4px solid #beaad6;
  
}

.reciever{
  border-left: 4px solid #8d37e9;
}

.reply-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reply-cancel {
  cursor: pointer;
  font-size: 18px;
}

.reply-cancel:hover {
  color: #ff6b6b;
}


.pb-7 {
padding-bottom: 150px;
}

.height-6{
  height: 130px;
}

@media (max-width: 576px) {
.pb-7 {
  padding-bottom: 160px;
}


.height-6{
  height: 200px;
}
}

.iconcircle2 {
width: 50px;
height: 50px;
background-color: #F0E4FF;
top: 46%;
transform: translateY(-50%);
}

.iconcircle2:hover {
background-color: #beaad6;
cursor: pointer;
transition: 0.3s;
}

.messagebar {
box-sizing: border-box;
overflow: scroll;
}

.scroll {
height: calc(100% - 75px);

}

.bg-background {
background-color: #160429;
}


</style>
