// Dashboard.tsx
import React from "react";
import { UserCircle, LogOut } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 backdrop-blur-3xl flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl animate-fadeIn relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <UserCircle className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {user.displayName || "User"}!
          </h2>
          <p className="mt-2 text-gray-600">{user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
