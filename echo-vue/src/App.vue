<script setup>
import { useRoute } from 'vue-router';

import DefaultLayout from './layouts/DefaultLayout.vue';
import MessagesLayout from './layouts/MessagesLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';

const $route = useRoute();

const getLayoutComponent = (layout) => {
  switch (layout) {
    case 'default':
      return DefaultLayout;
    case 'messages':
      return MessagesLayout;
    case 'auth':
      return AuthLayout;
    default:
      return DefaultLayout;
  }
};
</script>


<template>
  <component 
    :is="getLayoutComponent($route.meta.layout)" 
    v-bind="layoutProps"
  >
    <RouterView />
  </component>
  
</template>


<style scoped>
</style>
