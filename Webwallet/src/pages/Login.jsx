import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LL from "../assets/login.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Handle successful login (e.g., save token to localStorage or context)
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        // Navigate to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-[#F3F4F6] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full max-w-3xl h-full">
        {/* Right Side - Login Form */}
        <div className="w-full  p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#681351] mb-6 text-center">
            Welcome
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Sign if you already have an account
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-pink-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#681351] text-white py-3 rounded-md hover:bg-pink-500 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <a href="#" className="text-[#681351] hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
