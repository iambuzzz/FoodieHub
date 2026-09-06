import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { loggedInUser } = useContext(UserContext);

    const {
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwo,
        sla,
        aggregatedDiscountInfoV3,
    } = resData;

    const displayCuisines =
        cuisines.join(", ").length > 30
            ? cuisines.join(", ").substring(0, 30) + "..."
            : cuisines.join(", ");

    const displayAvgRating = avgRating ? `${avgRating} stars` : "N/A";
    const displayCostForTwo = costForTwo ? `${costForTwo}` : "N/A";

    return (
        <div
            data-testid="resCard"
            // --- YEH HAI FIX ---
            // "m-4" yahaan se HATA diya hai. Ab spacing 'Body.jsx' se control hogi.
            // "w-full" add kiya hai taaki yeh grid cell ki poori width le.
            className="w-full h-[300px] bg-white rounded-2xl hover:scale-[1.02] transition-transform duration-200 flex flex-col overflow-hidden"
        >
            {/* Image Container */}
            <div className="relative w-full h-[180px] rounded-2xl">
                <img
                    className="w-full h-full object-cover rounded-2xl"
                    alt="res-logo"
                    src={CDN_URL + cloudinaryImageId}
                />
                {aggregatedDiscountInfoV3 &&
                    aggregatedDiscountInfoV3.header && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 rounded-2xl bg-gradient-to-t from-black/90 to-transparent">
                            <span className="text-white text-xl font-bold mx-1">
                                {aggregatedDiscountInfoV3.header}{" "}
                                {aggregatedDiscountInfoV3.subHeader}
                            </span>
                        </div>
                    )}
            </div>

            {/* Restaurant Info */}
            <div className="flex flex-col flex-grow px-3 py-3">
                <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                    {name}
                </h3>
                <h4 className="text-gray-600 text-sm h-8 overflow-hidden">
                    {displayCuisines}
                </h4>
                <div className="flex items-center text-sm font-semibold text-gray-700">
                    {avgRating ? (
                        <span
                            className={`flex items-center ${
                                avgRating >= 4
                                    ? "text-green-600"
                                    : "text-orange-500"
                            }`}
                        >
                            <span className="mr-1 text-base">★</span>
                            {avgRating}
                        </span>
                    ) : null}
                    {avgRating && (sla?.deliveryTime || costForTwo) ? (
                        <span className="mx-2 text-gray-400">·</span>
                    ) : null}
                    {sla?.deliveryTime ? (
                        <span className="text-gray-700">
                            {sla.deliveryTime} mins
                        </span>
                    ) : null}
                    {sla?.deliveryTime && costForTwo ? (
                        <span className="mx-2 text-gray-400">·</span>
                    ) : null}
                    {costForTwo ? (
                        <span className="text-gray-700">
                            {displayCostForTwo}
                        </span>
                    ) : null}
                </div>
            </div>
            <h4 className="text-xs text-gray-400 mt-2 hidden">
                User : {loggedInUser}
            </h4>
        </div>
    );
};

// Higher Order Component
export const withPromtedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div className="relative">
                <label className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md z-10">
                    Promoted
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;
