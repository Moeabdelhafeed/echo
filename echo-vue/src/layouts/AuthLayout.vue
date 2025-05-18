<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import gsap from 'gsap'

const route = useRoute();


let login = ref(route.name == 'login' ? true : false);


const switchfun = (switchfrom) => {
  if (switchfrom === 'login') {
    login.value = true;
  } else if (switchfrom === 'register') {
    login.value = false;
  }
  
}


const beforeEnter = (el) => {
      gsap.set(el, {
        opacity: 0,
        translateY: 50,
      })
    };

    const enter = (el) => {
      console.log('enter');

      gsap.to(el, {
        duration: 0.5,
        opacity: 1,
        translateY: 0,
        ease: 'power1.inOut',
      });
    };


    const leave = (el, done) => {
      console.log('leave');

      gsap.to(el, {
        duration: 0.5,
        opacity: 1,
        translateY: 50,
        opacity:0,
        ease: 'power1.inOut',
        onComplete: done,
      });
    };
</script>

<template>
  <div class="container  " style="max-width:400px;margin-top:100px;min-width:200px">
    <h1 class="m-4 text-center fw-bold">Echo.</h1>
    <div class="bigbtn rounded-5 p-2 row w-50 m-auto ">
      
      <RouterLink :to="{name: 'login'}" class="z-3 col text-center rounded-5 p-2  text-decoration-none " :class="{'activebtn' : login, 'smallbtn' : login, 'textcolor' : !login}" @click="switchfun('login')"><div>Login</div> </RouterLink>
      <RouterLink :to="{name: 'register'}" class="z-3 col text-center rounded-5 p-2  text-decoration-none  " :class="{'activebtn' : !login , 'smallbtn' : !login, 'textcolor' : login}"  @click="switchfun('register')" ><div>Register</div> </RouterLink>
    </div>
  </div>
    <transition appear mode="out-in" @before-enter="beforeEnter" @enter="enter"  @leave="leave">
      <slot />
    </transition>
</template>

<style scoped >
.col{
  background-color:#7C6E8B;
}
 .smallbtn{
    color: #F0E4FF;
    cursor: pointer;
    text-decoration: none;
  }

  .smallbtn:hover{
    background-color: #beaad6;
    transition: 0.3s;
  }
  .activebtn{
    cursor: pointer;
    text-decoration: none;
    color: #3B3146;
    background-color: #F0E4FF;
    transition: 0.3s;
  }
  .activebtn:hover{
    background-color: #beaad6;
    transition: 0.3s;
  }


</style>
