<template> 
<div ref="scrollDiv" class="  bg-background overflow-auto position-relative messagebar border border-start-0 border-bottom-0 border-top-0  col dvh-100  ">
    <div class=" position-sticky   top-0 z-3 sticky-title ">
    <h5 class="  fw-bold p-4 mb-0">Friends</h5>
</div>
<div v-if="friends">


        <FriendsProfileComponent v-for="friend in friends" :key="friend.id" :friend="friend" />
        <div class="mb-6 d-sm-none">

        </div>
</div>

<div v-if="friends.length === 0 && loading  == false "  class="d-flex justify-content-center m-4 align-items-center">
    there are no friends
</div>

<div v-if="loading" class="d-flex justify-content-center m-4 align-items-center">
    loading friends...
  </div>

</div>
</template>

<script setup>
import MessagesBarProfileComponent from './MessagesBarProfileComponent.vue';
import FriendsRequestProfileComponent from './FriendsRequestProfileComponent.vue';
import FriendsProfileComponent from './FriendsProfileComponent.vue';
import { useFriendsStore } from '@/stores/Freinds';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const {getFriends , getInitialFriends} = useFriendsStore();

let {loading, hasMoreData, friends} = storeToRefs(useFriendsStore());

const scrollDiv = ref(null);

onMounted(() => {
    hasMoreData = true;
    getInitialFriends();
})

useInfiniteScroll(
    scrollDiv,
    async () => {
        console.log('asdasd')
        if (friends.length >= 10 && hasMoreData){
            await getFriends();
        }
    },
    { distance: 0,}
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