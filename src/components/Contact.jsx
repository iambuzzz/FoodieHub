import React, { useEffect, useRef } from "react";

// Icons for contact details
const MailIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
    </svg>
);
const PhoneIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
    </svg>
);
const LocationIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

// --- YEH HAI NYA ICON ---
const InstagramIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.4 7.5v9a2.9 2.9 0 01-2.9 2.9h-9a2.9 2.9 0 01-2.9-2.9v-9a2.9 2.9 0 012.9-2.9h9a2.9 2.9 0 012.9 2.9z"
        />
    </svg>
);
// --- END NYA ICON ---

const Contact = () => {
    // 1. Create a ref to access the form DOM element
    const formRef = useRef(null);

    // 2. Add an effect that listens for the 'pageshow' event
    useEffect(() => {
        const handlePageShow = (event) => {
            // --- CHANGE ---
            // Removed 'event.persisted' check.
            // Just reset the form every time the page is shown.
            // On fresh load, it resets an empty form (no harm).
            // On 'back' navigation, it resets the filled-in cached form.
            if (formRef.current) {
                // If it is, reset the form
                formRef.current.reset();
            }
        };

        // Add the event listener
        window.addEventListener("pageshow", handlePageShow);

        // Clean up the listener when the component unmounts
        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []); // The empty array [] means this effect runs only once

    return (
        <div className="min-h-[calc(100vh-160px)] bg-white pt-12 pb-4 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Get in Touch
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        We'd love to hear from you! Send us a message or find
                        our details below.
                    </p>
                </div>

                {/* Main Content: Grid ko 3-column rakha */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
                    {/* Contact Details - Yeh ab pehle aa gaya hai (Left side) */}
                    <div className="space-y-8 lg:col-span-1 col-span-2 bg-transparent p-8 rounded-2xl shadow-[0_0_20px_5px_rgba(34,197,94,0.2)] md:flex md:flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 md:mt-0">
                            Our Information
                        </h2>

                        {/* Email */}
                        <div className="flex items-start">
                            <div className="shrink-0 bg-green-100 p-3 rounded-full">
                                <MailIcon />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Email
                                </h3>
                                <p className="text-gray-600">
                                    support@foodiehub.com
                                </p>
                                <p className="text-gray-600">
                                    careers@foodiehub.com
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start">
                            <div className="shrink-0 bg-green-100 p-3 rounded-full">
                                <PhoneIcon />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Phone
                                </h3>
                                <p className="text-gray-600">+91 01234 56789</p>
                                <p className="text-gray-600">
                                    (Mon-Fri, 9am - 6pm)
                                </p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start">
                            <div className="shrink-0 bg-green-100 p-3 rounded-full">
                                <LocationIcon />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Address
                                </h3>
                                <p className="text-gray-600">
                                    123 Foodie Street, Tech Park
                                </p>
                                <p className="text-gray-600">
                                    Bangalore, Karnataka - 560100
                                </p>
                            </div>
                        </div>

                        {/* --- YEH HAI NYA SECTION --- */}
                        {/* Instagram */}
                        <div className="flex items-start">
                            <div className="shrink-0 bg-green-100 p-3 rounded-full">
                                <InstagramIcon />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Instagram
                                </h3>
                                <p className="text-gray-600">
                                    @foodiehub_official
                                </p>
                            </div>
                        </div>
                        {/* --- END NYA SECTION --- */}
                    </div>

                    {/* Contact Form - Yeh ab baad mein hai (Right side) aur 2 column ki jagah lega */}
                    <div className="bg-transparent lg:col-span-2 col-span-2 p-8 rounded-2xl shadow-[0_0_20px_5px_rgba(34,197,94,0.2)] md:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Send us a message
                        </h2>
                        {/* --- CHANGE HERE --- */}
                        {/* 1. Added action and method to the form tag */}
                        <form
                            ref={formRef} // 3. Attach the ref to the form
                            action="https://formspree.io/f/xgvpznqr"
                            method="POST"
                            className="space-y-6"
                        >
                            {/* 2. Added hidden input for redirection after submit */}
                            <input
                                type="hidden"
                                name="_next"
                                value="https://funplace.onrender.com/index.php?submitted=true"
                            />

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="John Doe"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required // Added required for good practice
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required // Added required for good practice
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message" // This name attribute is correct
                                    rows={4}
                                    placeholder="Your message..."
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required // Added required for good practice
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-bold bg-green-500 hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        {/* --- END OF CHANGES --- */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
