<template> 
<div ref="scrollDiv" class="  bg-background overflow-auto position-relative messagebar border border-start-0 border-bottom-0 border-top-0  col dvh-100  ">
    <div class=" position-sticky   top-0 z-3 sticky-title ">
    <h5 class="  fw-bold p-4 mb-0">Friend Requests</h5>
</div>

<div v-if="requests">

       <FriendsRequestProfileComponent v-for="request in requests" :key="request.id" :request="request" />
        <div class="mb-6 d-sm-none">

        </div>
</div>

<div v-if="loading" class="d-flex justify-content-center m-4 align-items-center">
    loading requests...
  </div>

  <div v-if="requests.length === 0 && loading  == false "  class="d-flex justify-content-center m-4 align-items-center">
    there are no requests
</div>

</div>
</template>

<script setup>
import MessagesBarProfileComponent from './MessagesBarProfileComponent.vue';
import FriendsRequestProfileComponent from './FriendsRequestProfileComponent.vue';
import { useFriendsStore } from '@/stores/Freinds';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const {getRequests, getInitialRequests} = useFriendsStore();
let {loading, hasMoreData, requests} = storeToRefs(useFriendsStore()); 
const scrollDiv = ref(null)

onMounted(()=>{
    hasMoreData = true;
    getInitialRequests();
})



useInfiniteScroll(
    scrollDiv,
    async () => {
        if(requests.length >= 10 && hasMoreData){
            await getRequests();
        }
    },
    {distance:0,}
)

</script>

<style scoped>



.col{
    background-color: #160429;
}


.sticky-title{
    background-color: #160429;
}



</style>