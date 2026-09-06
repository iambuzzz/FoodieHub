import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
            },
        };
        //console.log(this.props.name + "Child Constructor");
    }

    async componentDidMount() {
        //console.log(this.props.name + "Child Component Did Mount");
        // Api call

        const data = await fetch("https://api.github.com/users/akshaymarch7");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        //console.log(json);
    }

    componentDidUpdate() {
        //console.log("Component Did Update");
    }

    componentWillUnmount() {
        //console.log("Component Will Unmount");
    }

    render() {
        console.log(this.props.name + "Child Render");

        const { name, location, avatar_url } = this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @akshaymarch7</h4>
            </div>
        );
    }
}

export default UserClass;

/****
 *
 * --- MOUNTING ----
 *
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML Dummy >
 * Component Did MOunt
 *      <API Call>
 *      <this.setState> -> State variable is updated
 *
 * ---- UPDATE
 *
 *      render(APi data)
 *      <HTML (new API data>)
 *      ccomponentDid Update
 *
 *
 *
 *
 */
// import { useContext } from "react";
// import { CDN_URL } from "../utils/constants";
// import UserContext from "../utils/UserContext";

// const RestaurantCard = (props) => {
//     const { resData } = props;
//     const { loggedInUser } = useContext(UserContext);

//     // Destructure properties from resData
//     const {
//         cloudinaryImageId,
//         name,
//         avgRating,
//         cuisines,
//         costForTwo,
//         sla, // Contains deliveryTime
//         aggregatedDiscountInfoV3, // Contains discount information
//     } = resData;

//     // Join cuisines with a comma and space, truncate if too long
//     const displayCuisines =
//         cuisines.join(", ").length > 40
//             ? cuisines.join(", ").substring(0, 40) + "..."
//             : cuisines.join(", ");

//     // Ensure avgRating is displayed consistently
//     const displayAvgRating = avgRating ? `${avgRating} stars` : "N/A";
//     const displayCostForTwo = costForTwo ? `${costForTwo}` : "N/A";

//     return (
//         // <div
//         //     data-testid="resCard"
//         //     // Card container styling
//         //     className="m-4 w-[300px] h-[300px] bg-white rounded-2xl  hover:scale-95 transition-transform duration-200 flex flex-col"
//         // >
//         //     {/* Image Container - Now holds the offer label */}
//         //     <div className="relative w-full h-[180px] mb-3">
//         //         <img
//         //             className="w-full h-full object-cover rounded-2xl"
//         //             alt="res-logo"
//         //             src={CDN_URL + cloudinaryImageId}
//         //         />

//         //         {/* Offer/Discount Label - MOVED & RESTYLED */}
//         //         {aggregatedDiscountInfoV3 &&
//         //             aggregatedDiscountInfoV3.header && (
//         //                 <div className="absolute bottom-0 left-0 right-0 p-2 rounded-2xl bg-gradient-to-t from-black/90 to-transparent">
//         //                     <span className="text-white text-xl  font-bold mx-1">
//         //                         {aggregatedDiscountInfoV3.header}{" "}
//         //                         {aggregatedDiscountInfoV3.subHeader}
//         //                     </span>
//         //                 </div>
//         //             )}
//         //     </div>

//         //     {/* Restaurant Info */}
//         //     <div className="flex flex-col flex-grow px-3 pb-3">
//         //         <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
//         //             {name}
//         //         </h3>
//         //         <h4 className="text-gray-600 text-sm mb-2">
//         //             {displayCuisines}
//         //         </h4>

//         //         {/* Rating and Delivery Info - Pushed to bottom with mt-auto */}
//         //         <div className="flex items-center text-sm font-semibold text-gray-700">
//         //             {/* 1. Show Rating (only if avgRating exists) */}
//         //             {avgRating ? (
//         //                 <span
//         //                     className={`flex items-center ${
//         //                         avgRating >= 4
//         //                             ? "text-green-600"
//         //                             : "text-orange-500"
//         //                     }`}
//         //                 >
//         //                     <span className="mr-1 text-base">★</span>
//         //                     {avgRating}
//         //                 </span>
//         //             ) : null}

//         //             {/* 2. Show Dot (only if rating AND delivery/cost exists) */}
//         //             {avgRating && (sla?.deliveryTime || costForTwo) ? (
//         //                 <span className="mx-2 text-gray-400">·</span>
//         //             ) : null}

//         //             {/* 3. Show Delivery Time (only if it exists) */}
//         //             {sla?.deliveryTime ? (
//         //                 <span className="text-gray-700">
//         //                     {sla.deliveryTime} mins
//         //                 </span>
//         //             ) : null}

//         //             {/* 4. Show Dot (only if delivery AND cost exists) */}
//         //             {sla?.deliveryTime && costForTwo ? (
//         //                 <span className="mx-2 text-gray-400">·</span>
//         //             ) : null}

//         //             {/* 5. Show Cost for Two (only if it exists) */}
//         //             {costForTwo ? (
//         //                 <span className="text-gray-700">
//         //                     {displayCostForTwo}
//         //                 </span>
//         //             ) : null}
//         //         </div>
//         //     </div>

//         //     {/* Hidden User Info (kept for consistency with previous code) */}
//         //     <h4 className="text-xs text-gray-400 mt-2 hidden">
//         //         User : {loggedInUser}
//         //     </h4>
//         // </div>
//         <div className="w-50 h-50 bg-white rounded-2xl flex"></div>
//     )
// }; 

// // Higher Order Component for Promoted Label (styling adjusted)
// export const withPromtedLabel = (RestaurantCard) => {
//     return (props) => {
//         return (
//             <div className="relative">
//                 <label className="absolute top-6 left-6 bg-black text-white text-xs px-2 py-1 rounded-md z-10">
//                     Promoted
//                 </label>
//                 <RestaurantCard {...props} />
//             </div>
//         );
//     };
// };

// export default RestaurantCard;
