# Recipe-Realm
Recipe Realm is a content platform where users can discover, search and contribute delicious recipes. Built with modern web technologies, it offers a seamless experience for both recipe enthusiasts and contributors with features like real-time updates and secure user authentication.

## Key Features

### Secure Authentication System
* JWT-based authentication
* Protected routes for authorized users
* Secure password hashing using bcrypt
* Session management

### Recipe Management
* Create, edit, and delete recipes
* Search functionality

### User Features
* Custom user profiles
* Recipe portfolios showcasing submitted recipes

### Modern UI/UX
* Responsive design for mobile and desktop devices
* Intuitive navigation and loading states

## Tech Stack

### Frontend
* React - UI library for building user interfaces
* React Router - Routing library for navigation
* Vite - Build tool and development server

### Backend
* Node.js - Runtime environment for the backend
* Express.js - Web framework for building APIs
* MongoDB - NoSQL database for storing user and recipe data
* JWT - JSON Web Tokens for user authentication
* bcrypt - Library for password hashing

### Clone and Install
```bash
git clone https://github.com/bhavyas06/Recipe-Book.git
cd recipe-realm
npm install
```

### Development Setup
Backend
```bash
  cd Backend
  node server.js
```

Frontend
```bash
  cd FrontEnd
  npm run dev
```

### Project Structure
```bash
Recipe-Book/
├── Backend/                # Backend source code
│   ├── middleware/         # Authentication and other middleware
│   ├── models/             # MongoDB models (User, Recipe)
│   └── routes/             # API routes for the frontend
└── FrontEnd/               # Frontend source code
    ├── util/               # helper functions
    ├── public/             # Static assets like images and icons
    └── src/
        ├── components/     # Reusable React components (Navbar, RecipeCard, etc.)
        ├── pages/          # React page components (Home, RecipeDetail, etc.)
        └── routes/         # React Router route definitions
```

### Application Flow
## Authentication
* User registration with email verification
* JWT-based authentication for secure login and session management
* Protected routes for logged-in users (e.g., user profile, recipe creation)
## Recipe Management
* Users can create, edit, and delete recipes
* Recipe search functionality 
## User Interactions
* Upvote recipes to improve their visibility
