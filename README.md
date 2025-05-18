
# Echo Chat App

**Echo** is a real-time chat application built using **Laravel** and **Vue.js**. It allows users to add friends, send messages, reply to messages, and delete both messages and friends. The app uses **Pusher** for real-time broadcasting and communication.

## 🗂️ Project Structure

This project is divided into two main folders:

- **`echo`** – Laravel Backend
- **`echo-vue`** – Vue Frontend

The project is served from the `public/` folder of the Laravel project.

---

## ⚙️ Features

- ✅ Add Friends  
- 💬 Send and Receive Messages in Real-Time  
- 🔁 Reply to Messages  
- ❌ Delete Messages  
- 👋 Remove Friends  
- 🔐 User Authentication 
- ⚡ Real-Time Messaging with **Pusher**

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

5. Build the frontend:

   ```bash
   npm run build
   ```

   This will generate the compiled assets in the Laravel `public/` folder (as the project is already set up for integration with Laravel).

---

## 🚀 Running the App

Make sure both the Laravel server and the Vue dev server (or built assets in `public/`) are running properly. If you're using built assets:

- Laravel will serve the Vue frontend from its `public/` folder.
- Visit `http://127.0.0.1:8000` to use the app.

---

## 🔑 Pusher Setup

You must create a [Pusher account](https://pusher.com/) and create an app to get:

- `PUSHER_APP_ID`
- `PUSHER_APP_KEY`
- `PUSHER_APP_SECRET`
- `PUSHER_APP_CLUSTER`

Add these to both `.env` files.

---

## 🧠 Notes

- Make sure to allow broadcasting in Laravel (`config/broadcasting.php`)
- If using Laravel Echo and Pusher, make sure your frontend has access to `laravel-echo`, `pusher-js`, and correct authorization settings.

---

## 📜 License

This project is licensed under the MIT License.
