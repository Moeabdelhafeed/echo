<template>

  <div class="container p-5 m-auto w-auto my-5 rounded-3" style="max-width:500px">
    <form @submit.prevent="authenticate('register', formData)">
      
      <!-- Name Input -->
      <div class="mb-3 position-relative">
        <div class="rounded-circle iconcircle position-absolute d-flex align-items-center justify-content-center">
          <i class="bi bi-person-fill"></i>
        </div>
        <input autofocus autocomplete="name" v-model="formData.name" placeholder="Enter Your Name" type="text" class="formcontrol w-100 rounded-5">
      </div>
      <p v-if="errors.name" class="text-danger ms-3 ">{{ errors.name[0] }}</p>
      
      <!-- Email Input -->
      <div class="mb-3 position-relative">
        <div class="rounded-circle iconcircle position-absolute d-flex align-items-center justify-content-center">
          <i class="bi bi-envelope-fill"></i>
        </div>
        <input  autocomplete="email" v-model="formData.email" placeholder="Enter Your Email" type="email" class="formcontrol w-100 rounded-5">
      </div>
      <p v-if="errors.email" class="text-danger ms-3 ">{{ errors.email[0] }}</p>
      
      <!-- Password Input -->
      <div class="mb-3 position-relative">
        <div class="rounded-circle iconcircle position-absolute d-flex align-items-center justify-content-center">
          <i class="bi bi-lock-fill"></i>
        </div>
        <input  autocomplete="new-password" placeholder="Enter A Password" v-model="formData.password" type="password" class="formcontrol w-100 rounded-5">
      </div>
      <p v-if="errors.password" class="text-danger ms-3 ">{{ errors.password[0] }}</p>
      
      <!-- Confirm Password Input -->
      <div class="mb-3 position-relative">
        <div class="rounded-circle iconcircle position-absolute d-flex align-items-center justify-content-center">
          <i class="bi bi-lock-fill"></i>
        </div>
        <input autocomplete="new-password" placeholder="Confirm Password" v-model="formData.password_confirmation" type="password" class="formcontrol w-100 rounded-5">
      </div>
      
      <button type="submit" class="smallbtn activebtn border-0 rounded-5 p-3 w-100 mt-4">Register</button>
    </form>
  </div>

</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

let formData = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
</script>

<style scoped>

</style>
