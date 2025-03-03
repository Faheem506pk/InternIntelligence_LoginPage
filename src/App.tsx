import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { HelmetProvider } from 'react-helmet-async';
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
    <Router>
   
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        
        {/* Redirect to login if no route matches */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;