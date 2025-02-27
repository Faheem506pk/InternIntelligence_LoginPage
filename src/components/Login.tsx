import React, { useState, useEffect } from "react";
import {
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Building,
  LogIn,
  UserPlus
} from "lucide-react";
import ForgotPassword from "./ForgotPassword";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore"; // Firestore methods

import Dashboard from "./Dashboard";
import GlassmorphismInput from "./GlassmorphismInput";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    phone?: string;
    auth?: string;
  }>({});

  useEffect(() => {
    console.log("Checking Firebase connection...");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User Status:", user ? "Logged In" : "Not Logged In");
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!name) {
        newErrors.name = "Full name is required";
      }
      if (!phone) {
        newErrors.phone = "Phone number is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Choose persistence based on "Remember Me"
        const persistenceType = rememberMe
          ? browserLocalPersistence // Keeps user logged in even after browser is closed
          : browserSessionPersistence; // Logs out when the tab is closed

        await setPersistence(auth, persistenceType);

        if (isLogin) {
          // **Sign in user**
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User logged in:", user);
        } else {
          // **Register user**
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          // **Update profile name**
          await updateProfile(user, { displayName: name });

          // **Store user data in Firestore**
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            phone,
            company,
            createdAt: new Date(),
          });

          console.log("User registered:", user);
        }

        // **Reset form fields**
        setErrors({});
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
        setCompany("");

        // Redirect to Dashboard or another page
        window.location.href = "/dashboard";
      } catch (error: any) {
        console.error("Firebase Auth Error:", error.code, error.message);
        setErrors({ auth: error.message });
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setCompany("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (user) {
    return <Dashboard user={user} />;
  }

  return (
    <div className="bg-auth-container">
      <div className="absolute inset-0">
        <div className="bg-blur"></div>
        <div className="bg-blur"></div>
        <div className="bg-blur"></div>
      </div>

      {/* Main Form */}
      <div className="max-w-md w-full space-y-8 glass-card p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl animate-fadeIn relative z-10">
        <div className="text-center mb-[40px]">
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center">
            {isLogin ? (
              <User className="h-6 w-6 text-indigo-600" />
            ) : (
              <UserPlus className="h-6 w-6 text-indigo-600" />
            )}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 animate-slideDown">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-2 mb-8 text-sm text-gray-600 animate-slideUp">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          {errors.auth && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {errors.auth}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div className="animate-slideRight">
                  <div className="relative">
                    <GlassmorphismInput
                      label="Full Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<User size={18} className="text-indigo-600" />}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="animate-slideLeft">
                  <div className="relative">
                    <GlassmorphismInput
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      icon={<Phone size={18} className="text-indigo-600" />}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="animate-slideRight">
                  <div className="relative">
                    <GlassmorphismInput
                      label="Company (optional)"
                      type="text"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      icon={<Building size={18} className="text-indigo-600" />}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="animate-slideLeft">
              <div className="relative">
                <GlassmorphismInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={18} className="text-indigo-600" />}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="animate-slideRight">
              <div className="relative">
                <GlassmorphismInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={18} className="text-indigo-600" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {showPassword ? (
                        <Eye size={18} />
                        
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  }
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between animate-fadeIn">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {isLogin && (
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Forgot password?
              </button>
            )}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 animate-slideUp"
          >
            
            {isLogin ? "Sign in" : "Create account"}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;