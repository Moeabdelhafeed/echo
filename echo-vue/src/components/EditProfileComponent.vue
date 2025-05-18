<template>
<div
    @click="closeForm"
    class="dvh-100 w-100 position-absolute d-flex justify-content-center align-items-center bg-blurry z-3"
>
    <div class="p-5 editform position-absolute d-flex rounded-5 justify-content-center z-5" @click.stop>
    <form class="text-center" @submit.prevent="handleSubmit">
        <div class="d-flex justify-content-center">
        <div class="profile-container" :class="{ profileborder: $route.name === 'profile' }">
            <img :src="user.profile_image" alt="Profile Image" />
        </div>
        </div>

        <p v-if="profileErrors.profile_image" class="text-danger text-center mt-3">{{ profileErrors.profile_image[0] }}</p>

        <!-- Custom File Input Section -->
        <div class="d-flex justify-content-center mt-3">
        <input class="" type="file" id="fileInput" name="profile_image" accept="image/*" @change="handleFileChange" />
        <label for="fileInput" class="file-label rounded-5 py-3">
            <span class="file-text m-3 ">Choose an Image</span>
            <span class="file-text m-3 file-name">No file chosen</span>
        </label>
        </div>

        <div class="d-flex justify-content-center mt-3">
        <i @click="handleRemoveImage" class="bi bi-trash-fill mx-2 icons"></i>
        </div>

        <div class="mt-3">
        <input
            v-model="formData.name"
            placeholder="Enter your new name"
            type="text"
            class="formcontrol w-100 rounded-5"
        />
        </div>
        <p v-if="profileErrors.name" class="text-danger ms-3 mt-3">{{ profileErrors.name[0] }}</p>

        <div class="mt-3">
        <input
            v-model="formData.bio"
            placeholder="Enter your new bio"
            type="text"
            class="formcontrol w-100 rounded-5"
        />
        </div>
        <p v-if="profileErrors.bio" class="text-danger ms-3 mt-3">{{ profileErrors.bio[0] }}</p>

        <div class="mt-3 text-center">
        <button type="submit" class="smallbtn activebtn border-0 rounded-5 p-3" style="width: 200px;">
            Edit Profile
        </button>
        </div>
    </form>
    </div>
</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['removeform']);
const { user, profileErrors } = storeToRefs(useAuthStore());
const { sendChanges, removeImage, setImage } = useAuthStore();

const formData = ref({ name: user.value.name, bio: user.value.bio });
const imageFormData = new FormData();

watch(user, (newUser) => {
formData.value.name = newUser.name;
formData.value.bio = newUser.bio;
});

const handleFileChange = (event) => {
const selectedFile = event.target.files[0];
if (selectedFile) {
    imageFormData.append('image', selectedFile);
    const fileName = selectedFile.name ? selectedFile.name : 'No file chosen';
    document.querySelector('.file-name').textContent = fileName;
}
};

const handleSubmit = async () => {
try {
    const success = await sendChanges(formData.value);
    if (success && imageFormData.has('image')) {
    const imageSetSuccess = await setImage(imageFormData);
    if (imageSetSuccess) emit('removeform');
    } else if (success) {
    emit('removeform');
    }
} catch (error) {
    console.error('Error submitting form:', error);
}
};

const handleRemoveImage = async () => {
try {
    const success = await removeImage();
    if (success) {
    emit('removeform');
    }
} catch (error) {
    console.error('Error removing image:', error);
}
};

const closeForm = () => {
profileErrors.value = {};
formData.value.name = user.value.name;
formData.value.bio = user.value.bio;
emit('removeform');
};
</script>

<style scoped>
.formcontrol {
border: 1px solid #f0e4ff;
background-color: #7c6e8b;
height: 50px;
padding-left: 15px;
padding-right: 65px;

}



.editform {
background-color: #201032;
}

.z-5 {
z-index: 5;
}

.bg-blurry {
background: rgba(0, 0, 0, 0.4);
backdrop-filter: blur(10px);
}

input[type="file"] {
display: none;
}

.file-label {
display: inline-block;
color: white;
cursor: pointer;
transition: background-color 0.3s;
border: 1px solid #f0e4ff;
background-color: #7c6e8b;
}

.file-label:hover {
background-color: #584a66;
}

.file-name {
color: #f0e4ff;
}

.icons {
color: rgba(255, 255, 255, 0.479);
font-size: 25px;
cursor: pointer;
}

.icons:hover {
color: #f0e4ff;
transition: 0.3s;
}

.bg-background {
background-color: #160429;
}
</style>
