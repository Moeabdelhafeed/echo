<script setup>
import MessagesBarComponent from '@/components/MessagesBarComponent.vue';
import MessagesChatComponent from '@/components/MessagesChatComponent.vue';
import MessagesChatInfoSidebarComponent from '@/components/MessagesChatInfoSidebarComponent.vue';
import { ref } from 'vue';
import ProfileBarComponent from '@/components/ProfileBarComponent.vue';
import ProfilePersonalComponent from '@/components/ProfilePersonalComponent.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const {user} = storeToRefs(useAuthStore());
const $route = useRoute();
</script>

<template>

<ProfilePersonalComponent v-if="$route.params.id == user.id" />

<ProfileBarComponent v-else/>
    
</template>


<style>



</style>