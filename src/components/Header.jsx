import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

// Import Firebase Authentication
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// Make sure your Firebase app is initialized somewhere in your project, e.g., in index.js
// import { app } from '../path/to/your/firebase-config'; // If you have a separate firebase-config file

// Simple SVG Icons (remain the same)
const SettingsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
const AccountIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);
const AboutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
const ContactIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
    </svg>
);
const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);
const GroceryIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
    </svg>
);

const Header = () => {
    const onlineStatus = useOnlineStatus();
    const { setUserName } = useContext(UserContext);
    const navigate = useNavigate();
    const auth = getAuth();
    const [firebaseUser, setFirebaseUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
            if (user) {
                setUserName(user.displayName || user.email);
            } else {
                setUserName(null);
            }
        });
        return () => unsubscribe();
    }, [auth, setUserName]);

    const isLoggedIn = firebaseUser !== null;

    const totalItemCount = useSelector((store) => {
        const items = store.cart.items;
        return Object.values(items).reduce(
            (total, item) => total + item.quantity,
            0
        );
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            const isOutsideDesktop =
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target);
            const isOutsideMobile =
                mobileDropdownRef.current &&
                !mobileDropdownRef.current.contains(event.target);

            if (isOutsideDesktop && isOutsideMobile) {
                if (!event.target.closest("#mobile-settings-button")) {
                    setIsDropdownOpen(false);
                }
            }
        }
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            {/* Desktop Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                    {/* Left - Logo */}
                    <div className="flex items-center space-x-2">
                        <img
                            src={LOGO_URL}
                            alt="Logo"
                            className="w-12 h-12 rounded-full"
                        />
                        <span className="text-lg font-semibold text-gray-700">
                            FoodieHub
                        </span>
                    </div>

                    {/* Center - Navigation (Hidden on mobile) */}
                    <nav className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
                        <span className="flex items-center gap-1">
                            Online{" "}
                            <span
                                className={
                                    onlineStatus
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {onlineStatus ? "●" : "○"}
                            </span>
                        </span>
                        <Link
                            to="/"
                            className="hover:text-green-600 transition flex items-center gap-1"
                        >
                            <HomeIcon /> Home
                        </Link>
                        <Link
                            to="/grocery"
                            className="hover:text-green-600 transition flex items-center gap-1"
                        >
                            <GroceryIcon /> Grocery
                        </Link>
                        <Link
                            to="/cart"
                            className="relative hover:text-green-600 transition flex items-center gap-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span>Cart</span>
                            <span className="ml-1 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                {totalItemCount}
                            </span>
                        </Link>
                    </nav>

                    {/* Right - Settings, Login/Logout */}
                    <div className="flex items-center space-x-4">
                        {/* --- Settings Dropdown (Desktop) --- */}
                        <div
                            className="relative hidden md:block"
                            ref={dropdownRef}
                        >
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition"
                            >
                                <SettingsIcon />
                                <span>Settings</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-60 border border-gray-200 hidden md:block">
                                    <Link
                                        to="/account"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <AccountIcon className="mr-2" /> Account
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <AboutIcon className="mr-2" /> About Us
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <ContactIcon className="mr-2" /> Contact
                                        Us
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* --- End Settings Dropdown (Desktop) --- */}

                        {/* Login/Logout Section */}
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleLogout} // Call the handleLogout function
                                    className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                                    title="Logout"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition font-medium">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="flex items-center justify-around py-3 px-2">
                    <Link
                        to="/"
                        className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
                    >
                        <HomeIcon />
                        <span className="text-xs mt-1">Home</span>
                    </Link>
                    <Link
                        to="/grocery"
                        className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
                    >
                        <GroceryIcon />
                        <span className="text-xs mt-1">Grocery</span>
                    </Link>

                    <Link
                        to="/cart"
                        className="flex flex-col items-center text-gray-600 hover:text-green-600 transition relative"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>

                        {
                            <span className="absolute -top-1 -right-2 bg-green-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                                {" "}
                                {totalItemCount}
                            </span>
                        }
                        <span className="text-xs mt-1">Cart</span>
                    </Link>

                    {/* --- Mobile Login/Logout Button (REMOVED) --- */}

                    {/* Mobile Settings Button & Dropdown */}
                    <div className="relative" ref={mobileDropdownRef}>
                        <button
                            id="mobile-settings-button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition"
                        >
                            <SettingsIcon />
                            <span className="text-xs mt-1">Settings</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg py-1 z-60 border border-gray-200 md:hidden">
                                <Link
                                    to="/account"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <AccountIcon className="mr-2" /> Account
                                </Link>
                                <Link
                                    to="/about"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <AboutIcon className="mr-2" /> About Us
                                </Link>
                                <Link
                                    to="/contact"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <ContactIcon className="mr-2" /> Contact Us
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
