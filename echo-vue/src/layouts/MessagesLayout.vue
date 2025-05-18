<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import DefaultLayout from './DefaultLayout.vue';
import MessagesBarComponent from '@/components/MessagesBarComponent.vue';


</script>

<template>
  
<div class="row m-0 p-0 g-0 ">
    <DefaultLayout>
        <MessagesBarComponent />
        <slot :key="$route.fullPath" />
    </DefaultLayout>

</div>



</template>

<style>

</style>