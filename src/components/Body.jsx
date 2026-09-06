import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import mockData from "../utils/mockdata.json";

// Search Icon SVG Component (remains the same)
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const CrossIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500 hover:text-gray-700" // Added color and hover
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]); // Master list
    const [filteredRestaurant, setFilteredRestaurant] = useState([]); // List shown on UI
    const [searchText, setSearchText] = useState("");
    const { loggedInUser } = useContext(UserContext); // Keep if used later

    const [isTopRatedFiltered, setIsTopRatedFiltered] = useState(false);

    const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filteredData = listOfRestaurants;
        if (searchText) {
            filteredData = filteredData.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        if (isTopRatedFiltered) {
            filteredData = filteredData.filter((res) => res.info.avgRating > 4.5);
        }
        setFilteredRestaurant(filteredData);
    }, [searchText, isTopRatedFiltered, listOfRestaurants]);

    const fetchData = () => {
        const data = mockData;
        const allCards = data?.data?.cards || [];
        const restaurantCard = allCards.find(
            (card) => card?.card?.card?.id === "restaurant_grid_listing_v2"
        );
        const restaurantsArray =
            restaurantCard?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants || [];
        setListOfRestaurants(restaurantsArray);
    };

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return <h1>...Offline...</h1>;

    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="min-h-screen bg-white">
            {/* Filter Section - Sticky Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-row flex-wrap items-center justify-between gap-4">
                        {/* Container for Search and Toggle */}
                        <div className="flex flex-row items-center gap-4 w-full ">
                            {/* 1. Search Bar Container */}
                            <div className="relative flex-grow w-full">
                                <input
                                    type="text"
                                    data-testid="searchInput"
                                    placeholder="Search restaurants..."
                                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm shadow-sm"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    {searchText ? (
                                        <button
                                            type="button"
                                            onClick={() => setSearchText("")}
                                            className="focus:outline-none"
                                            aria-label="Clear search"
                                        >
                                            <CrossIcon />
                                        </button>
                                    ) : (
                                        <SearchIcon />
                                    )}
                                </div>
                            </div>
                            {/* 2. IOS-STYLE TOGGLE */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-lg font-medium text-green-500 whitespace-nowrap">
                                    4.5☆
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsTopRatedFiltered(
                                            !isTopRatedFiltered
                                        )
                                    }
                                    className={`${
                                        isTopRatedFiltered
                                            ? "bg-green-500"
                                            : "bg-gray-200"
                                    } relative inline-flex flex-shrink-0 h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                                    role="switch"
                                    aria-checked={isTopRatedFiltered}
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                        aria-hidden="true"
                                        className={`${
                                            isTopRatedFiltered
                                                ? "translate-x-5"
                                                : "translate-x-0"
                                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Restaurant Count - YE NEECHE AAGYA STICKY KE BAHAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-5">
                <div className="text-sm text-gray-600 whitespace-nowrap flex-shrink-0 w-full sm:w-auto text-left sm:text-left px-1">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                        {filteredRestaurant.length}
                    </span>{" "}
                    restaurants
                </div>
            </div>

            {/* Restaurant Cards Grid (Remains the same) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
                {filteredRestaurant.length === 0 ? (
                    <div className="text-center py-16 sm:py-20">
                        <div className="text-5xl sm:text-6xl mb-4">🔍</div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                            No restaurants found
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mb-4">
                            Try adjusting your search or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchText("");
                                setIsTopRatedFiltered(false);
                            }}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
                        >
                            Clear Search & Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredRestaurant.map((restaurant) => (
                            <Link
                                key={restaurant?.info.id}
                                to={"/restaurants/" + restaurant?.info.id}
                                className="block transition-transform hover:scale-105 duration-200"
                            >
                                {restaurant?.info.promoted ? (
                                    <RestaurantCardPromoted
                                        resData={restaurant?.info}
                                    />
                                ) : (
                                    <RestaurantCard
                                        resData={restaurant?.info}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
