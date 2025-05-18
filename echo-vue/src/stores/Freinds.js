import router from '@/router';
import {defineStore, storeToRefs} from 'pinia'
import { useAuthStore } from './auth';
import { useMessagesStore } from './Messages';

export const useFriendsStore = defineStore('friendsStore', {
    state(){
        return {
            friends: [],
            requests: [],
            loading: false,
            errors: {},
            hasMoreData: false
        }
    },
    actions: {
        async createFriend(friend){
            const res = await fetch('/api/friends/create', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    'friend_id' : friend, 
            }),
            });

            const data = await res.json();

            if (res.ok){
                return true;   
            }
        },
        async deleteReq(friend){
            const res = await fetch('/api/friends/requests/delete', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'DELETE',
                body: JSON.stringify({
                    'friend_id' : friend, 
            }),
            });

            const data = await res.json();

            if (res.ok){
                return true;   
            }
        },
        async rejectReq(friend){
            const res = await fetch('/api/friends/requests/reject', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'DELETE',
                body: JSON.stringify({
                    'friend_id' : friend, 
            }),
            });
            if (res.ok){
               this.requests = this.requests.filter(req => req.id !== friend)
                return true;   
            }
        },
        async getFriends(){
            this.loading = true;
            const res = await fetch('/api/friends', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    skip: this.friends.length,
                    take: 10,
                }),
            });

            const data = await res.json();

            if(data.length == 0) {
                this.hasMoreData = false;
                this.loading = false;
                return;
            }

            if (res.ok){
                this.loading = false;
                const newFriends = data.friends.filter(friend => 
                    !this.friends.some(existingFriend => existingFriend.id === friend.id)
                );
        
                // Push only the unique friends to the `friends` array
                this.friends.push(...newFriends);
                
            }
        },
        async getRequests(){
            this.loading = true;
            const res = await fetch('/api/friends/requests', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    skip: this.requests.length,
                    take: 10,
                }),
            });

            const data = await res.json();

            if(data.length == 0) {
                this.hasMoreData = false;
                this.loading = false;
                return;
            }

            if (res.ok){
                this.loading = false;
                const newRequests = data.requests.filter(request => 
                    !this.requests.some(existingRequest => existingRequest.id === request.id)
                );
        
                // Push only the unique requests to the `requests` array
                this.requests.push(...newRequests);
                
            }
        },
        async getInitialRequests(){
            this.requests = []
            this.getRequests();
        },
        async getInitialFriends(){
            this.friends = []
            this.getFriends();
        },
        async acceptReq(friend){
            const {newFriend} = storeToRefs(useMessagesStore())
            const res = await fetch('/api/friends/requests/accept', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    'friend_id' : friend, 
            }),
            });
            const data = await res.json();
            if (res.ok){
                newFriend.value = true;
                setTimeout(() => {
                    newFriend.value = false;
                } ,2000)

               this.requests = this.requests.filter(req => req.id !== friend)
                return true;   
            }
        },
        async removeFriend(friend){
            const res = await fetch('/api/friends/remove', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'DELETE',
                body: JSON.stringify({
                    'friend_id' : friend, 
            }),
            });

            const data = await res.json();

            if (res.ok){
                this.friends = this.friends.filter(f => f.id!== friend);
                return true;   
            }
        },
        async addNewReq(sender){
        
            let exists = this.requests.find(r => r.id == sender.id);
            if (!exists){
                this.requests.unshift(sender);
            }
        },
        async addNewFriend(sender){
                    
            let exists = this.friends.find(r => r.id == sender.id);
            if (!exists){
                this.friends.unshift(sender);
        }
    },
        async removeReqWeb(sender){
            this.requests = this.requests.filter(req => req.id !== sender.id)
        },
        async removeFriendWeb(sender){
            
            this.friends = this.friends.filter(f => f.id !== sender.id)

        }
    }
})