<script setup>
import MessagesBarComponent from '@/components/MessagesBarComponent.vue';
import { ref, watch } from 'vue';
import MessagesChatInfoSidebarComponent from './MessagesChatInfoSidebarComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import EditProfileComponent from './EditProfileComponent.vue';
const edit = ref(false)


const { user} = storeToRefs(useAuthStore())
const {logout} = useAuthStore();

const handleLogout = () => {
    logout().then(() => {
        window.location.reload();
    })
}




</script>

<template>

<div class="overflow-auto position-relative messagebar col  dvh-100  ">
    <div class=" bg-background  align-items-center d-flex border-start-0 border-end-0 border-top-0 position-sticky  top-0 z-3 sticky-title ">
    <h5 class="  fw-bold p-4 mb-0 chat-title me-4 ">profile</h5>
</div>
<div class="d-flex justify-content-center">

<div  class="profile-container    "  :class="[$route.name ==='profile' ? 'profileborder' : '']">
            <img     :src="user.profile_image" alt="">
            </div>
</div>
            
            <div class="text-center text-wrap w-75 m-auto   mt-4">
                <h2 class="text-break h2 "> {{ user.name }}</h2>
                <h5 class="  text-white-50 text-break"> {{user.bio }}</h5>
                <button type="submit" @click="edit = true" class="smallbtn activebtn border-0 rounded-5 mt-4 p-3 " style="width: 200px;">Edit Profile</button>
            </div>
            
            <div class=" position-absolute bottom-0 w-100 mb-6">
                <button @click="handleLogout()" class="btn btn-outline-danger border-0 p-3 rounded-0 w-100 ">
                    log out
                </button>
            </div>
            

</div>

<EditProfileComponent v-if="edit" @removeform="edit = false" />


</template>


<style scoped>

.formcontrol{
    border: 1px solid #F0E4FF;
    background-color: #7C6E8B;
    height: 65px;
    padding-left: 15px;
    padding-right: 65px;
    width: 400px;

} 

.editform{
    background-color: #201032;
}

.z-5{
    z-index: 5;
}

.bg-blurry {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
}


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