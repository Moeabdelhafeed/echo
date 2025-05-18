import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import LoginView from '@/views/Auth/LoginView.vue';
import { useAuthStore } from '@/stores/auth';
import MessagesView from '@/views/Messages/MessagesView.vue';
import MessagesChatView from '@/views/Messages/MessagesChatView.vue';
import FriendsView from '@/views/Friends/FriendsView.vue';
import FriendsRequestsView from '@/views/Friends/FriendsRequestsView.vue';
import SearchView from '@/views/Friends/SearchView.vue';
import ProfileView from '@/views/Profile/ProfileView.vue';
import { storeToRefs } from 'pinia';
import { useFriendsStore } from '@/stores/Freinds';
import { useMessagesStore } from '@/stores/Messages';



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {name: 'messages'},
      meta: {
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView,
      meta: {
        requiresAuth: true,
        layout: 'messages',
      },
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsView,
      meta: {
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/friends/requests',
      name: 'friendsRequests',
      component: FriendsRequestsView,
      meta: {
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/:id',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresAuth: false,
        layout: 'auth',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false,
        layout: 'auth',
      },
    },
    {
      path: '/messages/:chatId', 
      name: 'messagesChat',
      component: MessagesChatView,
      meta: {
        requiresAuth: true,
        layout: 'messages',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/',
    },
  ],
});




router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const {getRequests} = useFriendsStore();
  const {getChats} = useMessagesStore();
  await authStore.getUser();
  authStore.errors = {};

  if (authStore.user && to.meta.requiresAuth === false) {
    return { path: '/' };
  }

  if (to.meta.requiresAuth === true) {
    if (to.name !== 'friendsRequests'){
      getRequests();
    }
  }


  if (!authStore.user && to.meta.requiresAuth === true) {
    return { path: '/login' };
  }
  
});

export default router;
