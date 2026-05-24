"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">PM</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Project Manager</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* User email (will add logic later) */}
          <span className="text-sm text-gray-600">{userId}</span>

          {/* Logout button (will add onclick later) */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
