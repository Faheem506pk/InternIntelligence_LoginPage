import React, { useState } from "react";
import { Mail, X } from "lucide-react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";

interface ForgotPasswordProps {
  showForgotPassword: boolean;
  setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  showForgotPassword,
  setShowForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      try {
        await sendPasswordResetEmail(auth, email);
        setShowForgotPassword(false);
        toast.success("Password reset email sent! Please check your inbox.");
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
    <div>
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-md m-4 animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Reset Password
              </h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
