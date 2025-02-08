import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "../feature/authentication/authSlice";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticate, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.isLoggedIn) {
      dispatch(loginSuccess(storedUser));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      if (isLogin) {
        const existingUser = users.find(
          (user) =>
            user.username === trimmedUsername && user.password === trimmedPassword
        );
  
        if (existingUser) {
          existingUser.isLoggedIn = true;
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("user", JSON.stringify(existingUser));
          dispatch(loginSuccess(existingUser));
          navigate("/dashboard");
        } else {
          dispatch(loginFailure("Invalid credentials"));
        }
      } else {
        if (!trimmedUsername || !trimmedEmail || trimmedPassword.length < 8) {
          dispatch(signupFailure("Invalid details"));
          return;
        }
  
        const userExists = users.some(
          (user) =>
            user.username === trimmedUsername || user.email === trimmedEmail
        );
  
        if (userExists) {
          dispatch(signupFailure("User already exists"));
        } else {
          const newUser = {
            username: trimmedUsername,
            email: trimmedEmail,
            password: trimmedPassword,
            id: Date.now(),
            isLoggedIn: false,
          };
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          dispatch(signupSuccess(newUser));
          setIsLogin(true);
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error handling localStorage data:", error);
      dispatch(loginFailure("Something went wrong"));
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-white text-sm underline hover:text-gray-200 transition-all duration-300"
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
