<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isSmallScreen = ref(window.innerWidth < 576);

// Function to update the state when resizing
const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 576;
};

// Attach event listener on mount and remove on unmount
onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div 
    v-if="!isSmallScreen"
    class="col dvh-100 d-flex flex-column align-items-center bg justify-content-center text-center p-5">
    
    <i class="bi mb-3 rounded-circle bi-chat icon"></i>
    <h3>Start messaging your friends</h3> 

    <div class="mb-6"></div>
  </div>
</template>

<style scoped>
@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 75px;
  }
}

.col {
  background-color: #160429;
}

.icon {
  color: #F0E4FF;
  font-size: 70px;
}
</style>
