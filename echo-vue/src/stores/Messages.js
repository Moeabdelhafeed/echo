import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { useRoute, useRouter } from 'vue-router';

export const useMessagesStore = defineStore('messagesStore', {
  state() {
    return {
      chats: [],
      loadingMessages: false,
      hasMoreDataMessages: false,
      notArchivedChats: [],
      groupedMessages: [],
      messages: [],
      chat: [],
      loading: false,
      errors: {},
      hasMoreData: false,
      isChatOpen: false,
      count_unseen_chats: 0,
      newMessage: false,
      newReq : false,
      newFriend: false,
    };
  },
  actions: {
    async getArchivedChats() {
      this.notArchivedChats = this.chats.filter(chat => chat.is_archived === false);
    },
    async outSideTyping(chat_id){
     const chat =  this.chats.find(chat => chat.id === chat_id)
      chat.is_typing = true;
    }
    ,
    async outSideNotTyping(chat_id){
     const chat =  this.chats.find(chat => chat.id == chat_id)
      chat.is_typing = false;
    }
    ,


    async getChats() {
      
      this.loading = true;
      const res = await fetch('/api/chats', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({
          skip: this.chats.length,
          take: 10,
        }),
      });

      const data = await res.json();

      if (data.length === 0) {
        this.hasMoreData = false;
        this.loading = false;
        return;
      }

      if (res.ok) {
        this.loading = false;
        this.chats.push(...data.chats);
        this.chats = [...new Set(this.chats)];
       
        this.getArchivedChats(); // Call this once after updating the chats
      }
    },
    async getUnreadChats(){

      this.count_unseen_chats = this.notArchivedChats.filter(chat => chat.count_unseen > 0).length
    },

    async typing(friend_id, chat_id){
      const res = await fetch(`/api/messages/typing`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({
          friend_id: friend_id,
          chat_id: chat_id,
        }),
      })
    },
    async notTyping(friend_id, chat_id){
      const res = await fetch(`/api/messages/nottyping`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({
          friend_id: friend_id,
          chat_id: chat_id,
        }),
      })
    },

    async addNewChat(chat) {
      
      const { user } = useAuthStore();
      let exists = this.chats.find(r => r.id === chat.id);
      if (!exists) {
        chat.users = chat.users.filter(r => r.id !== user.id);
        this.chats.unshift(chat);
      } else {
        exists.count_unseen = chat.count_unseen
       exists.is_archived = false;
      }
      this.getArchivedChats();
      this.getUnreadChats();
    },

    async getChat(id) {
      this.chat = [];
      const res = await fetch(`/api/chat/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({
          chat_id: id,
        }),
      });

      const data = await res.json();
      const { user } = useAuthStore();
      

      if (res.ok) {
        console.log('a7a');
        this.chat = data.chat;
        this.chat.users = this.chat.users.filter(u => u.id !== user.id);
        this.getArchivedChats(); // Call this after setting the chat
        return true;
      } else {
        this.router.push({ name: 'messages' });
        return false;
      }
    },

    async deleteChat(id) {
      const res = await fetch(`/api/chat/delete`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'DELETE',
        body: JSON.stringify({
          chat_id: id,
        }),
      });
      if (res.ok) {
        const chat = this.chats.find(r => r.id === id);
        chat.count_unseen = 0;
        chat.is_archived = true;
       
       this.router.push({ name: 'messages' });
        this.getArchivedChats(); // Call after updating chat
      }
    },
    async initialGetChats() {
      this.chats = []; // Reset chats
      this.notArchivedChats = []; // Reset not archived chats
      this.getChats().then(() => {

        this.getArchivedChats();
        this.getUnreadChats();
      });
    },

    

    async removeChat(id) {
      const chat = this.chats.find(r => r.id === id);
      chat.is_archived = true;
      this.getArchivedChats(); 
      this.getUnreadChats();// Always call this after modifying chats
    },

    async getMessages(id) {
      this.loadingMessages = true;
      const res = await fetch(`/api/messages/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({
          chat_id: id,
          skip: this.messages.length,
          take: 30,
        }),
      });

      const data = await res.json();
      
      if (data.messages.length === 0) {
        this.hasMoreDataMessages = false;
        this.loadingMessages = false;
        return;
      }

      if (res.ok) {
        this.loadingMessages = false;
        const newMessages = data.messages.filter(
          m => !this.messages.find(r => r.id === m.id)
        );
        this.messages.unshift(...newMessages);
        this.groupMessages();
      }
    },

    async initialGetMessages(id) {
      this.messages = [];
      this.groupedMessages = [];
      await this.getMessages(id);
      this.groupMessages();

      
    },

    async sendMessage(message, chatid, repliedMessage) {
      const requestBody = {
        chat_id: chatid,
        message: message,
      };
      
      if (repliedMessage) {
        requestBody.replyed_to = repliedMessage.id;
      }
      
      const res = await fetch(`/api/messages/send`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
  

      const data = await res.json();

      if (res.ok) {
        let exists = this.messages.find(msg => msg.id === data.message.id);
        let chatExists = this.chats.find(chat => chat.id === data.chat?.id);
      
        console.log(data.chat);
        if (!exists) {
          this.messages.push(data.message);

          if (this.router.currentRoute.params.chatId == chatExists.id){
            this.chat.last_message = data.message;
          }
          chatExists.last_message = data.message
          this.groupMessages();
        }
      
        if (data.chat && !chatExists) {  
          this.chats.push(data.chat);
          this.getArchivedChats();
        } else if (chatExists) {
          chatExists.updated_at = data.chat.updated_at;
          chatExists.is_archived = false;
          this.chats = this.chats.filter(chat => chat.id !== chatExists.id);
          this.chats.unshift(chatExists);
          this.getArchivedChats();
          

        }
      }
      
    },

    async addNewMessage(message, chat) {
      const { user } = useAuthStore();
      let chatMessage = this.chats.find(c => c.id === message.chat_id);

      let exists = this.messages.find(m => m.id === message.id) || false;

      if (!exists && message.chat_id == chat.id) {
        this.messages.push(message);
        chatMessage.count_unseen += 1;
      }
      
      if (chatMessage) {
        chatMessage.last_message = message;
        this.chats = this.chats.filter(c => c.id !== chatMessage.id);
        this.chats.unshift(chatMessage);
        this.groupMessages();
      }
      this.groupMessages();
      this.getArchivedChats();
      this.getUnreadChats();
    },

    groupMessages() {
        const grouped = {};
  
        this.messages.forEach((message) => {
          const date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(message.created_at)); // Format the date
  
          if (!grouped[date]) {
            grouped[date] = [];
          }
          grouped[date].push(message);
        });
  
        this.groupedMessages = Object.keys(grouped).map((date) => ({
          date,
          messages: grouped[date],
        }));
      },

      async deleteMessage(messageId, chatId) {
        const res = await fetch(`/api/messages/delete`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          method: 'DELETE',
          body: JSON.stringify({
            message_id: messageId,
            chat_id: chatId
          }),
        });

        
        const data = await res.json();
        if (res.ok) {
          this.messages = this.messages.filter(msg => msg.id!== messageId);
          const chat = this.chats.find(c => c.id === chatId);
          if(data.was_deleted){
            this.removeChat(chat.id)
          }else{

            chat.updated_at = data.updated_at
          }
          
            const res = await fetch(
              `/api/messages/lastmessage`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'POST',
                body: JSON.stringify({
                  chat_id: chat.id
                }),
              }
            )
            const d = await res.json();
            chat.last_message = d.message;

          this.chats = this.chats.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
          this.getArchivedChats();
          this.groupMessages();
        }
      },

      async removeMessage(message, updated_at, was_deleted) {
       

        let chatMessage = this.chats.find(c => c.id === message.chat_id);

        
  
        let exists = this.messages.find(m => m.id === message.id);
        if (exists) {
          this.messages = this.messages.filter(m => m.id !== message.id);
          
        }

    
          const res = await fetch(
            `/api/messages/lastmessage`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              method: 'POST',
              body: JSON.stringify({
                chat_id: chatMessage.id
              }),
            }
          )
          const data = await res.json();
          if(was_deleted){
            this.removeChat(chatMessage.id)
            $this.router.push({name: 'messages'})
          }else{

            chatMessage.last_message = data.message;
  
          if(message.seen == false){

            chatMessage.count_unseen -= 1;
          }
          chatMessage.updated_at = updated_at;
          this.chats = this.chats.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
          this.groupMessages();
          this.getArchivedChats();
          console.log(this.chats);
   
          }
          this.getUnreadChats();
      },

      async seenMessage(messageIds, chatId){
        let chat = this.chats.find(c => c.id === chatId);
        const res = await fetch(`/api/messages/seen`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          method: 'POST',
          body: JSON.stringify({
            message_id: messageIds,
            chat_id: chatId,
          }),
        });
        
        const data = await res.json();

        if (res.ok) {
          chat.count_unseen = 0;
          this.getArchivedChats();
          console.log('message got seen')
          this.getUnreadChats();
        }
      },
      async seenMessageWithTime( last_message){
        console.log(`seen ${last_message.updated_at}`)
     
        const chat = this.chats.find((c) => c.id === last_message.chat_id );
        chat.last_message = last_message
        this.getArchivedChats();

        if($this.router.currentRoute.params.chatId == last_message.chat_id) {
          const m = this.messages.find((m) => m.id == last_message.id)
          const mIndex = this.messages.findIndex((m) => m.id == last_message.id);
          if (mIndex !== -1) {
            this.messages[mIndex] = { ...this.messages[mIndex], updated_at: last_message.updated_at };
          }

          console.log(`seen ${m.updated_at}`)
          
        this.groupMessages()
        }
      }
  
  },
});
