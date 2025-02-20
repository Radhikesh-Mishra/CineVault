# 🎬 Cine Vault

Cine Vault is a web application where users can explore and search for movies, view detailed movie information, and manage their favorite movie list. The platform provides an intuitive and seamless experience for movie enthusiasts.

## 🚀 Features

- Search for movies
- View movie details including:
  - Movie title
  - Plot
  - Actors
  - Runtime
  - Language
  - Country
  - IMDb ratings
- Register or log in to create a personalized movie list
- Add or remove movies from your favorite list
- View and manage your favorite movies in the dashboard

## 🛠️ Tech Stack

### Frontend:
- React.js
- Vite
- Bootstrap

### Backend:
- Node.js with Express.js
- MongoDB (for user, movie, and favorite list data)
- JWT for authentication

## 📦 Installation

### Prerequisites:
Ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (if running locally)

### Steps to Run Locally:
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/cine-vault.git
   cd cine-vault
   ```

2. **Setup environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Start the backend and frontend:**
   ```sh
   npm run dev
   ```

5. **Visit the application:**
   Open your browser and go to `http://localhost:5173`

## 📜 API Endpoints

### Authentication:
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a token

### Movies:
- `GET /api/movies` - Fetch all movies
- `GET /api/movies/:id` - Get a specific movie

### Favorites:
- `POST /api/favorites` - Add a movie to favorites
- `DELETE /api/favorites/:id` - Remove a movie from favorites
- `GET /api/favorites/:userId` - Fetch user's favorite movies

### Some images of Cine Vault:
- Home
 ![image](https://github.com/user-attachments/assets/45d279fe-f7cc-4447-b53b-3cd2ed6bc0e5)
- Dashboard
 ![image](https://github.com/user-attachments/assets/b2919588-3d9a-43ac-ae3e-6b8976397765)
-  Clicking on a Movie
 ![image](https://github.com/user-attachments/assets/81284ea1-b6e6-4c4c-b4c9-86b8bc4a4529)
- Login and Register
 ![image](https://github.com/user-attachments/assets/860727c4-07a4-4320-917b-696015800ce2)
 ![image](https://github.com/user-attachments/assets/fff71d42-f2ed-4b5f-99f6-f3a56817f31e)



