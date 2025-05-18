<template>

    <div class="container p-5 m-auto  my-5 rounded-3 w-auto" style="max-width:500px">
        <form @submit.prevent="authenticate('login', formData)">
            <div class="mb-3 position-relative">
                <div class="rounded-circle iconcircle position-absolute d-flex align-items-center justify-content-center">
            <i class="bi bi-envelope-fill"></i>
        </div>
                <input autofocus autocomplete="email" v-model="formData.email" placeholder="Enter Your Email" type="email" class="formcontrol  w-100 rounded-5 " >
            </div>
            <p v-if="errors.email" class="text-danger ms-3  ">{{ errors.email[0] }}</p>
            <div class="mb-3 position-relative">
                <div class="rounded-circle iconcircle position-absolute d-flex align-items-center justify-content-center">
            <i class="bi bi-lock-fill"></i>
        </div>
                <input  name="password"  autocomplete="current-password"  v-model="formData.password" placeholder="Enter Your Password" type="password" class="formcontrol rounded-5  w-100 " >
            </div>
            <p v-if="errors.password" class="text-danger ms-3 ">{{ errors.password[0] }}</p>

            <button type="submit" class="smallbtn activebtn border-0 rounded-5 mt-4 p-3 w-100" >Login</button>
        </form>
    </div>

</template>

<script setup>
import { ref } from "vue";
import {useAuthStore} from "@/stores/auth.js"
import { storeToRefs } from "pinia";

const {errors} = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();


let formData = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});
</script>

<style scoped>



</style>