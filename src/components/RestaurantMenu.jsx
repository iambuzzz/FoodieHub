import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
// We no longer need useState, useEffect, useRef, or createRef here
// They are moving to the child component

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    // We no longer need showIndex, categoryRefs, or the useEffect
    // for scrolling. This component is now much simpler.

    if (resInfo === null) return <Shimmer />;

    const {
        name,
        cuisines,
        costForTwoMessage,
        avgRating,
        totalRatingsString,
        sla,
    } = resInfo?.cards[2]?.card?.card?.info || {}; // Safety fallback

    const categories =
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) =>
                c.card?.["card"]?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];

    return (
        <div className="text-center">
            <div className="header-info w-full max-w-4xl mx-auto mt-4 p-4 flex flex-col items-center  pb-4">
                <h1 className="font-bold text-4xl text-gray-900 mb-2">
                    {name}
                </h1>
                <div className="flex items-center text-md text-gray-700 space-x-4">
                    {/* Rating */}
                    {avgRating && (
                        <div className="flex items-center font-semibold">
                            <span className="text-green-600 mr-1">★</span>
                            <span>
                                {avgRating} ({totalRatingsString})
                            </span>
                        </div>
                    )}

                    {/* Cuisines */}
                    <span className="hidden sm:block">
                        {cuisines.join(", ")}
                    </span>

                    {/* Delivery Time */}
                    {sla?.slaString && <span>{sla.slaString}</span>}

                    {/* Cost for Two */}
                    <span>{costForTwoMessage}</span>
                </div>
            </div>
            {/* Now we just map and render the categories.
              We don't need to pass any state down.
            */}
            {categories.map((category, index) => (
                <RestaurantCategory
                    key={category?.card?.card.title}
                    data={category?.card?.card}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;
