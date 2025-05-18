import router from '@/router';
import {defineStore} from 'pinia'
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', {
    state(){
        return {
            user: null,
            errors: {},
            profileErrors: {}

        }
    },
    actions: {
        async authenticate(apiRole, formData ){
            const res = await fetch(`/api/${apiRole}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                
            })

            const data = await res.json();
            

            if (res.ok && !data.errors) {
                this.user = data.user;
                localStorage.setItem('token', data.token);
                this.errors = {};
                this.router.push({name: 'home'})
            }else{
                this.errors = data.errors;
            }
        },
        async logout(){
            const res = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            
            if(res.ok){
                
                this.user = null;
                localStorage.removeItem('token');
                this.router.push({name: 'login'});
                
            }
        },
        async getUser(){
            if(localStorage.getItem('token')){
                const res = await fetch('api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                })
                const data = await res.json();
            

                if(res.ok){
                    this.user = data;

                }else{
                    this.user = null;
                }
            } 
        },
         async sendChanges(FormData){
            const res = await fetch('/api/profile/editprofile' , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormData),
                method: 'POST',
            })

            
            const data =  await res.json()
        
            if (res.ok){
               
                this.user.name = data.name
                this.user.bio = data.bio
                this.profileErrors = {}
                return true;
            }else{
                
                this.profileErrors = data.errors
                return false;
            }
        },
        async removeImage(){
            const res = await fetch('/api/profile/removeimage', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            })

            const data = await res.json();

            if (res.ok){
                this.user.profile_image = data.image;
            
                return true;
            }else{
                this.profileErrors = data.errors;
                return false;
            }
        }, async setImage(imageFormData){
            const res = await fetch('/api/profile/setimage', {
                headers: {
                
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    
                },
                method: 'POST',
                body: imageFormData,
            })

            const data = await res.json();
            
            if (res.ok){
                
                this.user.profile_image = data.image;
                return true;
            }else{
               
                this.profileErrors = data.errors;
                return false;
            }
        },
        async getUserWithId(id){
            const res = await fetch(`/api/user/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
        
            const data = await res.json()
            
            if (res.ok) {
                return data;
            }
        }

        
    }
})