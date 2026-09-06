import { useEffect, useState } from "react";
import Shimmer from "./Shimmer"; // Assuming you have a Shimmer component

// GitHub Icon
const GithubIcon = () => (
    <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.5.499.09.682-.217.682-.483 0-.237-.008-.865-.013-1.693-2.782.602-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.527 2.341 1.086 2.91.831.092-.645.35-1.083.636-1.332-2.22-.251-4.555-1.11-4.555-4.942 0-1.091.39-1.984 1.029-2.685-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.818c.851 0 1.73.115 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.701 1.028 1.594 1.028 2.685 0 3.841-2.338 4.687-4.566 4.935.359.307.678.915.678 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.18.577.688.482C19.137 20.195 22 16.44 22 12.017 22 6.484 17.523 2 12 2z"
            clipRule="evenodd"
        />
    </svg>
);

const About = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetchGithubData();
    }, []);

    const fetchGithubData = async () => {
        try {
            // !!! --- IMPORTANT --- !!!
            // !!! REPLACE "YOUR_GITHUB_USERNAME" WITH YOUR ACTUAL GITHUB USERNAME !!!
            const response = await fetch(
                "https://api.github.com/users/iambuzzz"
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error("Failed to fetch GitHub data:", error);
            // Handle error, maybe set userInfo to a default error object
        }
    };

    // Loading State
    if (!userInfo) {
        return (
            <div className="min-h-[calc(100vh-160px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Shimmer />
            </div>
        );
    }

    // Data Destructuring (once userInfo is available)
    const {
        name,
        login,
        avatar_url,
        bio,
        followers,
        following,
        html_url,
        public_repos,
    } = userInfo;

    return (
        <div className="min-h-[calc(100vh-160px)] bg-white pt-12 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* --- About This Project Section --- */}
                <div className="bg-white p-8 rounded-2xl mb-10 text-center shadow-[0_0_20px_5px_rgba(34,197,94,0.2)]">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        About <span className="text-green-500">FoodieHub</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        This application is a food delivery web app built with
                        React, demonstrating modern frontend technologies,
                        component-based architecture, and routing.
                    </p>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            Key Technologies Used:
                        </h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                React
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                                Redux Toolkit
                            </span>
                            <span className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full">
                                Tailwind CSS
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                                React Router
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- Developer Profile Section --- */}
                <div className="bg-white p-8 rounded-2xl shadow-[0_0_20px_5px_rgba(34,197,94,0.2)] flex flex-col items-center md:flex-row md:items-start md:gap-10">
                    {/* Image and Stats */}
                    <div className="shrink-0 flex flex-col items-center md:w-1/3">
                        <img
                            src={avatar_url}
                            alt={name}
                            className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-md border-4 border-green-200"
                        />
                        <div className="flex gap-6 mt-4">
                            <div className="text-center">
                                <span className="text-2xl font-bold text-gray-800">
                                    {followers}
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Followers
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-gray-800">
                                    {following}
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Following
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-gray-800">
                                    {public_repos}
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Repos
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bio and Info */}
                    <div className="grow text-center md:text-left mt-6 md:mt-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {name}
                        </h2>
                        <a
                            href={html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-green-600 hover:underline"
                        >
                            @{login}
                        </a>
                        <p className="text-md text-gray-600 mt-4">
                            {bio ||
                                "This FoodieHub developer is hard at work! (Bio not set on GitHub)"}
                        </p>

                        <a
                            href={html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 py-3 px-6 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105"
                        >
                            <GithubIcon />
                            View GitHub Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
