
# Echo Chat App

**Echo** is a real-time chat application built using **Laravel** and **Vue.js**. It allows users to add friends, send messages, reply to messages, delete messages and friends, track read recipients, and see typing indicators. The app uses **Pusher** for real-time broadcasting and communication.

👉 Check out the complete guide on Medium: [Echo Chat App — Real-Time Chat with Laravel, Vue.js & Pusher](https://medium.com/@almormohammad939/echo-chat-app-real-time-chat-with-laravel-vue-js-pusher-658c3f308d54)

## 🗂️ Project Structure

This project is divided into two main folders:

- **`echo`** – Laravel Backend  
- **`echo-vue`** – Vue Frontend

The project is served from the `public/` folder of the Laravel project, which already contains the compiled Vue assets.

---

## ⚙️ Features

- ✅ Add Friends  
- 💬 Send and Receive Messages in Real-Time  
- 🔁 Reply to Messages  
- ❌ Delete Messages  
- 👋 Remove Friends  
- 👀 Read Recipients for Messages  
- ⌨️ Typing Indicators in Chat  
- 🔐 User Authentication  
- ⚡ Real-Time Messaging with **Pusher**

---

## 🔑 Pusher Setup

You must create a [Pusher account](https://pusher.com/) and create an app to get:

- `PUSHER_APP_ID`  
- `PUSHER_APP_KEY`  
- `PUSHER_APP_SECRET`  
- `PUSHER_APP_CLUSTER`

Add these to both `.env` files.

---

## 📁 Laravel Folder: `echo`

This is the backend API built with Laravel.

### Setup

1. Navigate to the Laravel folder:

   ```bash
   cd echo
   ```

2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Configure the `.env` file:  
   - Set your **database** connection (MySQL)  
   - Configure your **Pusher** credentials:

     ```env
     BROADCAST_DRIVER=pusher
     PUSHER_APP_ID=your-app-id
     PUSHER_APP_KEY=your-app-key
     PUSHER_APP_SECRET=your-app-secret
     PUSHER_APP_CLUSTER=your-app-cluster
     ```

4. Install dependencies:

   ```bash
   composer install
   ```

5. Generate app key and run migrations:

   ```bash
   php artisan key:generate
   php artisan migrate
   ```

6. Serve the Laravel app:

   ```bash
   php artisan serve
   ```

---

## 🖼️ Vue Frontend: `echo-vue`

This is the frontend client built with Vue.js that interacts with the Laravel backend.

### Setup

1. Navigate to the Vue folder:

   ```bash
   cd echo-vue
   ```

2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Configure the `.env` file:  
   - Set the backend API base URL (usually Laravel's `http://127.0.0.1:8000`)  
   - Add your **Pusher** key and cluster:

     ```env
     VITE_PUSHER_APP_KEY=your-app-key
     VITE_PUSHER_APP_CLUSTER=your-app-cluster
     ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. **Important:** The compiled Vue frontend assets (the `dist` folder) are already located inside the Laravel `public/vue` directory. Therefore, **you only need to run `npm run build` if you make any new changes to the Vue frontend.** Otherwise, no additional setup is required for the frontend.

6. To build the frontend (only when you make changes):

   ```bash
   npm run build
   ```

7. After building, the `dist` folder will be added automatically to the `public/vue` folder in Laravel, so Laravel can serve the compiled Vue frontend assets seamlessly.

---

## 🚀 Running the App

Make sure both the Laravel server and the Vue frontend assets are properly set up:

- Since the Vue app is already built and placed inside the Laravel `public/vue` folder, you can just run the Laravel server and visit:

  ```
  http://127.0.0.1:8000
  ```

  to use the app right away.

- If you want to run the Vue frontend in development mode (for live reloading and faster development), you can run inside the `echo-vue` folder:

  ```bash
  npm run dev
  ```

  This will run the Vue dev server separately. In this mode, you'll typically access the frontend via the Vue dev server URL (usually `http://localhost:5173` or similar), and API calls will hit your Laravel backend running separately.

---

## 📜 License

This project is licensed under the MIT License.
