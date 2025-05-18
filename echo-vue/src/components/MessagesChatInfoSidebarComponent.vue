<script setup>
import { useMessagesStore } from '@/stores/Messages';
import { useRouter } from 'vue-router';


const emit = defineEmits([
    'hideInfo'
])

const hideInfo = () =>{
    emit('hideInfo')
}

const props = defineProps({
    chat: {
        type: Object,
        required: true
    }
})

const $router = useRouter();

const {deleteChat} = useMessagesStore();

const handleDeleteChat = async () => {

    deleteChat(props.chat.id).then(() =>{})
}
</script>

<template>

   <div class="overflow-auto end-0 z-3  position-absolute  messagebar border border-end-0  border-bottom-0 border-top-0 col-auto info-sidebar  dvh-100  " >
    <div  class=" bg-background border align-items-center d-flex w-100  border-end-0 border-top-0 position-sticky  top-0 z-3 sticky-title ">
    <h5 class="  fw-bold p-4 mb-0  chat-title ">details</h5>
    <i @click="hideInfo" class="bi bi-info-circle-fill   textcolor icon position-absolute end-0 me-4 "></i>
</div>
<div class=" position-absolute bottom-0 w-100 ">
                <button @click="handleDeleteChat()" class="btn btn-outline-danger border-0 p-3 rounded-0 w-100 ">
                    delete chat
                </button>
            </div>
</div>
</template>


<style scoped>

.bg-background{
    background-color: #160429;
}
.chat-title {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

.col-auto{
    background-color: #160429;
}

.icon{
   color:#F0E4FF;
   font-size: 20px;
   cursor: pointer;

   
}
.info-sidebar{
    width: 30%;
    min-width: 250px;
}


</style>