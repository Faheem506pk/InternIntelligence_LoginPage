import React, { useState } from "react";
import { Mail, ArrowLeft, User } from "lucide-react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GlassmorphismInput from "./GlassmorphismInput";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent! Please check your inbox.");
        navigate("/login"); // Redirect to login after successful reset
      } catch (error: any) {
        setErrors({ email: error.message });
        toast.error(error.message);
      }
    } else {
      setErrors({ email: "Please enter a valid email" });
      toast.error("Please enter a valid email");
    }
  };

  return (
    <div className="bg-auth-container">
      <div className="absolute inset-0">
        <div className="bg-blur"></div>
        <div className="bg-blur"></div>
        <div className="bg-blur"></div>
      </div>

      {/* Main Form */}
      <div className="max-w-md w-full space-y-8 glass-card p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl animate-fadeIn relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-500 transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-[40px]">
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 animate-slideDown">
            Reset Password
          </h2>
          <p className="mt-2 mb-8 text-sm text-gray-600 animate-slideUp">
            Enter your email to receive a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleForgotPassword} className="mt-8 space-y-8">
          {errors.email && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {errors.email}
            </div>
          )}

          <div className="space-y-4">
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
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 animate-slideUp"
          >
           
            Send Reset Link
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;