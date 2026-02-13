# Eventrix - Event Management System

## How to Run This Project

Welcome! If you have received this project as a ZIP file, follow these steps to get it running on your local machine.

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher) - [Download Here](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download Community Server](https://www.mongodb.com/try/download/community)

### 2. Initial Setup

**Important:** You need to install dependencies for both the **Frontend** and the **Backend**.

#### A. Install Backend Dependencies
1. Open a terminal.
2. Navigate to the `server` folder:
   ```bash
   cd server
   npm install
   ```

#### B. Install Frontend Dependencies
1. Open a new terminal (or go back to the root folder).
2. Navigate to the main project folder (if not already there):
   ```bash
   cd ..
   npm install
   ```

### 3. Environment Configuration

You need to set up the configuration keys for the app to work.

#### Backend Configuration
1. Go to the `server` folder.
2. Create a new file named `.env`.
3. Copy the contents from `.env.example` into `.env`.
4. Update the values in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/eventrix` or your Atlas URL).
   - `JWT_SECRET`: Enter any random secret text (e.g., `mysecretkey123`).
   - `GOOGLE_CLIENT_ID`: (Optional) Required only if you want to test Google Login.

#### Frontend Configuration
1. Go to the root folder.
2. Create a new file named `.env`.
3. Copy the contents from `.env.example` into `.env`.
4. Update the values in `.env`:
   - `VITE_API_URL`: Your backend API URL (e.g., `http://localhost:5001/api`). **Important:** It must end with `/api`.
   - `VITE_GOOGLE_CLIENT_ID`: (Optional) Get this from Google Cloud Console. If you leave it as the placeholder, Google Sign-In will not work, but manual login will still function.

### 4. Running the Application

You need to run the **Backend** and **Frontend** in two separate terminals.

#### Terminal 1: Start Backend (Server)
```bash
cd server
npm run dev
```
*You should see "Server is running on port 5001" and "Connected to MongoDB".*

#### Terminal 2: Start Frontend (Client)
```bash
# In the root folder
npm run dev
```
*You should see "Local: http://localhost:5173/".*

### 5. Access the App
Open your browser and visit: **http://localhost:5173**

---

### Troubleshooting
- **Black Screen?** Check the console (F12) for errors.
- **Login fails?** Ensure the Server is running and connected to MongoDB.
- **Port already in use?** If port 5001 or 5173 is taken, close other node processes or change the port in `.env` and `vite.config.js`.
