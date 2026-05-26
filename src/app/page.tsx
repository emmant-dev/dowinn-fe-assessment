// app/page.tsx (Login/Signup)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authAPI } from "../../lib/api";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        if (!userId || !email || !password) {
          setError("All fields required");
          setLoading(false);
          return;
        }
        // Signup
        await authAPI.signup(userId, email, password);
        // Login after signup
        const res = await authAPI.login(userId, password);

        // Check if login was successful ("ok" or has user_id)
        if (res.data.data === "ok" || res.data.data) {
          localStorage.setItem("userId", userId);
          router.push("/dashboard");
        } else {
          setError("Signup failed");
        }
      } else {
        // Login
        const res = await authAPI.login(userId, password);

        // Check response
        if (res.data.data === "invalid credential") {
          setError("Invalid user ID or password");
          setLoading(false);
          return;
        }

        if (res.data.data === "ok") {
          localStorage.setItem("userId", userId);
          router.push("/dashboard");
        } else {
          setError("Login failed");
        }
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {isSignup ? "Create Account" : "Login"}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {isSignup ? "Sign up to get started" : "Welcome back"}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="User ID"
            placeholder="your_user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {isSignup && (
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" variant="primary" disabled={loading}>
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
