import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Naye Firebase functions import karein
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup, // Google login ke liye
} from "firebase/auth";
// 2. 'auth' aur 'googleProvider' ko import karein
import { auth, googleProvider } from "../utils/firebase";

// Google Icon
const GoogleIcon = () => (
    <svg
        className="w-5 h-5 mr-2"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        />
        <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.223 0-9.64-3.34-11.303-7.918l-6.573 4.818C9.656 39.663 16.318 44 24 44z"
        />
        <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.01 35.898 44 30.298 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
    </svg>
);

// Logo component (Aapke purane code se)
const Logo = () => (
    <div className="flex flex-col items-center mb-6">
        <img
            src="https://placehold.co/80x80/16a34a/ffffff?text=FH"
            alt="FoodieHub Logo"
            className="w-20 h-20 rounded-full mb-2"
        />
        <span className="text-3xl font-bold text-center text-gray-800">
            Welcome to FoodieHub
        </span>
    </div>
);

// Icons (Aapke purane code se)
const MailIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
    </svg>
);
const LockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
    </svg>
);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();
    // 'auth' ab import ho raha hai

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            if (isLoginView) {
                // --- LOGIN LOGIC ---
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in successfully!");
                navigate("/");
            } else {
                // --- SIGN UP LOGIC ---
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("User created successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error("Firebase Error:", err.code, err.message);
            // ... (error handling waise hi hai)
            if (
                err.code === "auth/wrong-password" ||
                err.code === "auth/invalid-credential"
            ) {
                setError("Incorrect password or email. Please try again.");
            } else if (err.code === "auth/user-not-found") {
                setError("No account found with this email. Please Sign Up.");
            } else if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please Login.");
            } else {
                setError("Failed to login/signup. Please try again.");
            }
        }
    };

    // 3. Google Sign in ke liye naya function
    const handleGoogleSignIn = async () => {
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("User signed in with Google successfully!");
            navigate("/"); // Homepage par redirect
        } catch (err) {
            console.error("Google Sign-In Error:", err.code, err.message);
            setError("Failed to sign in with Google. Please try again.");
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError("");
    };

    return (
        <div className="min-h-[calc(100vh-160px)] bg-white flex items-center justify-center pt-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_0_20px_5px_rgba(34,197,94,0.2)] ">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src="https://placehold.co/80x80/16a34a/ffffff?text=FH"
                            alt="FoodieHub Logo"
                            className="w-20 h-20 rounded-full mb-2"
                        />
                        <span className="text-3xl font-bold text-gray-800">
                            {isLoginView ? "Welcome Back!" : "Create Account"}
                        </span>
                        <p className="text-gray-500">
                            {isLoginView
                                ? "Sign in to continue"
                                : "Join FoodieHub today"}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* ... (Email aur Password inputs waise hi) ... */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}
                        {isLoginView && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-green-600 hover:text-green-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-bold bg-green-500 hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {isLoginView ? "Sign in" : "Create Account"}
                            </button>
                        </div>
                    </form>

                    {/* --- NAYA SECTION: DIVIDER AUR GOOGLE BUTTON --- */}
                    <div className="mt-6">
                        

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                <GoogleIcon />
                                {isLoginView
                                    ? "Sign in with Google"
                                    : "Sign up with Google"}
                            </button>
                        </div>
                    </div>
                    {/* --- END NAYA SECTION --- */}
                </div>

                {/* Sign Up / Login Toggle Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {isLoginView
                            ? "Don't have an account?"
                            : "Already have an account?"}{" "}
                        <button
                            onClick={toggleView}
                            className="font-medium text-green-600 hover:text-green-500"
                        >
                            {isLoginView ? "Sign up now" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

