import React, { useState, useEffect } from "react";
import { User, LogOut, Phone, Building, Mail } from "lucide-react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { doc, getDoc } from "firebase/firestore";

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            name: data.name || user.displayName || "User",
            email: data.email || user.email,
            phone: data.phone || "Not provided",
            company: data.company || "Not provided",
          });
        } else {
          // Fallback to auth user data if Firestore document doesn't exist
          setUserData({
            name: user.displayName || "User",
            email: user.email,
            phone: "Not provided",
            company: "Not provided",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-container">
      <Helmet>
        <title>Dashboard | {userData.name}</title>
      </Helmet>

      {/* Floating Blur Elements */}
      <div className="absolute inset-0">
        <div className="bg-blur"></div>
        <div className="bg-blur animation-delay-2000"></div>
        <div className="bg-blur animation-delay-4000"></div>
      </div>

      {/* Dashboard Card */}
      <div className="glass-card w-full max-w-md p-6 sm:p-8 text-center relative z-10 animate-fadeIn">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a]">
                Welcome, {userData.name}!
              </h2>
            </div>

            {/* User Details */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-3 text-[#1a1a1a]">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-left">Email</p>
                  <p className="text-left text-[#1a1a1a] truncate">{userData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3 text-[#1a1a1a]">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-left">Phone</p>
                  <p className="text-left text-[#1a1a1a]">{userData.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center text-[#1a1a1a]">
                <Building className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-left">Company</p>
                  <p className="text-left text-[#1a1a1a]">{userData.company}</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;