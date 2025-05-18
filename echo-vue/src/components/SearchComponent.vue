<template> 
<div 
  class="bg-background overflow-auto position-relative messagebar border border-start-0 border-bottom-0 border-top-0 col dvh-100" 
  ref="scrollDiv"
>
  <div class="position-sticky top-0 z-3 sticky-title">
    <h5 class="fw-bold p-4 mb-0">find new friends</h5>
  </div>
  <div class="m-4 position-relative">
    <input
      autofocus
      autocomplete="email"
      v-model="search"
      placeholder="Enter the name"
      type="email"
      class="formcontrol w-100 rounded-5"
    />
  </div>
  <div v-if="users">
    <SearchProfileComponent @changePending="handelChangePending" v-for="user in users" :key="user.id" :user="user" />
    <div class="mb-6 d-sm-none">

    </div>

    <div v-if="loading" class="d-flex justify-content-center m-4 align-items-center">
    loading users...
  </div>
  </div>
</div>

</template>

<script setup>
import MessagesBarProfileComponent from './MessagesBarProfileComponent.vue';
import FriendsRequestProfileComponent from './FriendsRequestProfileComponent.vue';
import SearchProfileComponent from './SearchProfileComponent.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useDebounceFn, useInfiniteScroll } from '@vueuse/core';

const users = ref([])
const search = ref('')
const loading = ref(false)
const scrollDiv = ref(null)
const hasMoreData = ref(true)

onMounted(()=>{
    fetchUsers('')
})

useInfiniteScroll(
  scrollDiv,
  async () => {
    if (users.value.length >= 10 && hasMoreData.value){
      await fetchUsers(search.value);
    }
  },
  { distance: 0 }
);

const fetchUsers = async (s) => {
    
    loading.value = true 

    const res = await fetch('/api/searchusers' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ 
            search: s,
            skip: users.value.length,
            take: 10
        })
    })

    const data = await res.json()
    if (data.length == 0){
        hasMoreData.value = false
        loading.value = false
        return  
    }

    if (res.ok){
        loading.value = false

        users.value.push(...data)
        
    }
}

const debouncedFetchUsers = useDebounceFn((s) => {
    users.value = []
    hasMoreData.value = true
    fetchUsers(s);
}, 300);

watch(search , (newValue) => {
    debouncedFetchUsers(newValue);
})





</script>

<style scoped>



.col{
    background-color: #160429;
}


.sticky-title{
    background-color: #160429;
}


.formcontrol{
    border: 1px solid #F0E4FF;
  background-color: #7C6E8B;
  height: 65px;
  padding-left: 20px;
  padding-right: 65px;

} 


.iconcircle1 {
    width: 50px; /* Adjust size as needed */
    height: 50px; /* Make it circular */
    background-color: #F0E4FF; /* Background color for circle */
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Align center */
   
}


</style>