import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;

const echo = new Echo({
    broadcaster: 'pusher',
    key: PUSHER_KEY,
    cluster: 'eu',
    forceTLS: true,
    encrypted: true,   
    authEndpoint: '/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            
        },
    }
});

export default echo;

