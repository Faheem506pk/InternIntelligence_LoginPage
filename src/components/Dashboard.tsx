import React from "react";
import { User, LogOut } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-auth-container">
      {/* Floating Blur Elements */}
      <div className="absolute inset-0">
        <div className="bg-blur"></div>
        <div className="bg-blur animation-delay-2000"></div>
        <div className="bg-blur animation-delay-4000"></div>
      </div>

      {/* Dashboard Card */}
      <div className="glass-card w-full max-w-md p-6 sm:p-8 text-center relative z-10 animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-semibold text-white mt-4">
            Welcome, {user.displayName || "User"}!
          </h2>
          <p className="text-white">{user.email}</p>
        </div>

        {/* Logout Button */}
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
