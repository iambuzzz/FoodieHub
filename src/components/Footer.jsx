import React from "react";
import { Link } from "react-router-dom";

// Logo component (Aap apne Header se import kar sakte hain, ya yahan use kar sakte hain)
const Logo = () => (
    <div className="flex items-center space-x-2">
        {/* Aapka LOGO_URL yahan daal sakte hain */}
        <img
            src="https://placehold.co/48x48/ffffff/166534?text=FH" // Placeholder logo (White BG, Green Text)
            alt="FoodieHub Logo"
            className="w-12 h-12 rounded-full"
        />
        <span className="text-2xl font-bold text-white">FoodieHub</span>
    </div>
);

// Social Media Icons
const FacebookIcon = () => (
    <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
);
const InstagramIcon = () => (
    <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);
const TwitterIcon = () => (
    <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.441 1.63 4.48 3.96 4.938-.493.135-.936.198-1.407.198-.31 0-.612-.03-.91-.086.617 2.053 2.408 3.46 4.613 3.501-1.613 1.27-3.64 2.021-5.786 2.021-.36 0-.714-.021-1.065-.062 2.089 1.348 4.58 2.123 7.24 2.123 8.7 0 13.467-7.201 13.467-13.467 0-.204-.005-.407-.013-.61a9.61 9.61 0 002.349-2.435z" />
    </svg>
);

const Footer = () => {
    return (
        <div className="bg-white pt-12">
            <footer className="bg-green-900 text-green-100 md:pt-12 md:pb-8 pt-8 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Section: Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                        {/* Column 1: App Info & Social */}
                        {/* Logo/Info text-left hai */}
                        <div className="space-y-4 flex flex-col md:items-center md:text-center">
                            <Logo />
                            <p className="text-sm text-green-50">
                                Your favorite foods, delivered fast to your
                                door. The best restaurants at your fingertips.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    <FacebookIcon />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    <InstagramIcon />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    <TwitterIcon />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Company */}
                        {/* --- YEH HAI FIX --- */}
                        {/* Column div ko items-center (center) kiya */}
                        <div className="flex flex-col md:items-center">
                            <h5 className="text-white font-bold text-lg mb-4">
                                Company
                            </h5>
                            {/* List ko text-left (left align) kiya */}
                            <ul className="space-y-3 text-left">
                                <li>
                                    <Link
                                        to="/about"
                                        className="hover:text-white transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="hover:text-white transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/grocery"
                                        className="hover:text-white transition-colors"
                                    >
                                        Grocery
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: For Restaurants */}
                        {/* --- YEH HAI FIX --- */}
                        <div className="flex flex-col md:items-center">
                            <h5 className="text-white font-bold text-lg mb-4">
                                For Restaurants
                            </h5>
                            {/* List ko text-left (left align) kiya */}
                            <ul className="space-y-3 text-left">
                                <li>
                                    <Link
                                        to="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Partner with Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        App for Partners
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Legal */}
                        {/* --- YEH HAI FIX --- */}
                        <div className="flex flex-col md:items-center">
                            <h5 className="text-white font-bold text-lg mb-4">
                                Legal
                            </h5>
                            {/* List ko text-left (left align) kiya */}
                            <ul className="space-y-3 text-left">
                                <li>
                                    <Link
                                        to="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* "Download our app" wala poora section yahaan se HATA diya gaya hai */}

                    {/* Bottom Section: Copyright */}
                    <div className="border-t-1 border-e-gray-400 pt-8 text-center text-sm text-green-200">
                        <p>
                            &copy; {new Date().getFullYear()} FoodieHub. All
                            rights reserved.
                        </p>
                        <p className="mt-1">Designed by You</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
