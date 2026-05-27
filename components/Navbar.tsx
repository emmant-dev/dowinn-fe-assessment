"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-6 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            Project Manager
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* User email (will add logic later) */}
          <span className="hidden sm:inline text-sm text-gray-600 sm:max-w-32 md:max-w-none truncate">
            {userId}
          </span>

          {/* Logout button (will add onclick later) */}
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
