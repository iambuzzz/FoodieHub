import React from "react";
import { Link } from "react-router-dom";

const Grocery = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-6 py-10 md:py-16 text-center bg-gray-50">
            {/* Main Illustration/Icon */}
            <div className="relative mb-8">
                {/* Shopping Cart Icon */}
                <svg
                    className="w-32 h-32 sm:w-40 sm:h-40 text-green-500 mx-auto animate-bounce-slow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                {/* Clock/Time Icon (small, absolute position) */}
                <div className="absolute -top-4 -right-4 sm:top-0 sm:-right-0 bg-white rounded-full p-2 shadow-lg transform rotate-12">
                    <svg
                        className="w-10 h-10 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in">
                Grocery Store{" "}
                <span className="text-green-600">Coming Soon!</span>
            </h1>

            {/* Subtitle/Message */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8 animate-fade-in-delay">
                We're working hard to bring you a fantastic online grocery
                shopping experience. Get ready for fresh produce, pantry
                staples, and much more, delivered right to your doorstep!
            </p>

            {/* Call to Action */}
            <Link
                to="/"
                className="px-8 py-3 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 animate-slide-up"
            >
                Explore Restaurants Instead
            </Link>

            {/* Small print */}
            <p className="text-sm text-gray-400 mt-10 animate-fade-in-delay-2">
                Stay tuned for updates!
            </p>
        </div>
    );
};

export default Grocery;
