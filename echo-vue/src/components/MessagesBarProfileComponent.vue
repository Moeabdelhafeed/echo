<template>
    <div v-if="chat" class="d-flex align-items-center p-4  pointer position-relative  " :class="[$route.params.chatId == chat.id ? 'bg' : '']">
        
        <div  class="profile-container profile   "  :class="[$route.name ==='profile' ? 'profileborder' : '']">
            <img     :src="chat.users[0].profile_image" alt="">
            </div>
            <div>

            <p style="width:200px" class="mb-0  ms-3 text-truncate hide-on-md show-on-sm" >{{ chat.users[0].name }}</p>
            
            <div v-if="chat.last_message && !chat.is_typing" >

            <p  class="mb-0  hide-on-md show-on-sm text-truncate ms-3  " :class="{'text-white' : chat.count_unseen > 0, 'text-white-50' : chat.count_unseen == 0}" style="max-width:200px">  <span v-if="chat.last_message.user_id == user.id"> you: </span>  {{ chat.last_message.content }} <span v-if="chat.last_message.user_id != user.id"> <br> {{ lastMessageTime }}</span> <span v-if="chat.last_message.user_id == user.id && chat.last_message.seen == false"> <br>  you sent {{ lastMessageTime }} </span> <span  v-if="chat.last_message.user_id == user.id && chat.last_message.seen == true"> <br> seen {{ lastMessageSeen }}</span> </p>
            </div>
            <div v-if="chat.is_typing" >
                <p  class="mb-0  hide-on-md show-on-sm text-truncate ms-3 text-white-50" style="max-width:200px">  Typing... </p>
            </div>

            
            
            
            </div>
    
                <span v-if="chat.count_unseen > 0"  class=" hide-on-md show-on-sm position-absolute end-0 me-3  rounded-5 p-2" style="font-size:10px;background-color:#f0e4ff;color:#160429;">{{ chat.count_unseen}} </span>
           
       </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

dayjs.extend(relativeTime)

const props = defineProps({
    chat: {
        type: Object,
        required: true
    }
    
})

const lastMessageTime = ref(null)
const lastMessageSeen = ref(null)

const {user} = useAuthStore();

const $route = useRoute();


onMounted(() => {
    lastMessageTime.value = computed(() => {
        
     return dayjs(props.chat.last_message.created_at).fromNow()
    })
    lastMessageSeen.value = computed(() => {
        
        return dayjs(props.chat.last_message.updated_at).fromNow()
       })
})


</script>

<style  >

.bg{
  background-color: #7C6E8B ;
  transition: 0.3s;
}
.profile{
    height: 50px;
    width: 50px;
    cursor: pointer;
}


.pointer{
    cursor: pointer;
}

@media (max-width: 1000px){
    .hide-on-md{
        display: none;
    }
    
}
@media (max-width: 576px){
    .show-on-sm{
        display: block;
    }
    
}

</style>