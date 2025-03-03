# Login App with Firebase Authentication

## Overview
This is a beautifully designed login and signup application built with React, Vite, Tailwind CSS, and Firebase. The app features smooth animations and essential authentication functionalities, including:

- Sign Up
- Sign In
- Remember Me
- Forgot Password (Password Reset via Email)
- Firebase Authentication & Firestore Database
- Glassmorphism UI with Elegant Animations

## Technologies Used
- **React** (Frontend Framework)
- **Vite** (Fast Build Tool)
- **Tailwind CSS** (Styling)
- **Firebase** (Authentication & Firestore)
- **Lucide React** (Icons)
- **React Router DOM** (Navigation)
- **React Hot Toast** (Notifications)
- **MUI Joy UI** (Additional UI Components)

## Installation
### 1. Clone the Repository
```sh
git https://github.com/Faheem506pk/InternIntelligence_LoginPage
cd InternIntelligence_LoginPage
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Firebase Configuration
Create a `.env` file in the root directory and add your Firebase configuration keys:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```sh
npm run dev
```

## Project Structure
```
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── bg.jpg               # Background Image
│   ├── components/
│   │   ├── Login.tsx               # Login Page Component
│   │   ├── GlassmorphismInput.tsx  # Custom Input Component
│   │   ├── ForgotPassword.tsx      # Reset Password Component
│   │   ├── Dashboard.tsx           # User Dashboard Component
│   ├── App.tsx                     # Main App Component
│   ├── firebase.ts                  # Firebase Initialization
├── public/
├── .env                            # Firebase Keys (Not Committed)
├── package.json                    # Dependencies & Scripts
└── README.md                        # Documentation
```

## Features
### Authentication (Firebase Auth)
- User Sign Up & Sign In
- Persistent Login (Remember Me Feature)
- Forgot Password (Password Reset Email)
- Firestore Database Integration

### UI & UX
- **Glassmorphism Design** for a modern, sleek look.
- **Animated Inputs** that dynamically adjust based on focus.
- **Responsive Design** using Tailwind CSS.

## Deployment
To build and deploy the project, run:
```sh
npm run build
```
Then deploy the generated `dist` folder using your preferred hosting service (Netlify, Vercel, Firebase Hosting, etc.).

## License
This project is open-source and available under the [MIT License](LICENSE).

