import { useDispatch, useSelector } from "react-redux";
// Import removeItem as well
import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
    const dispatch = useDispatch();

    // 1. Read the cart items from the Redux store
    const cartItems = useSelector((store) => store.cart.items);

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
    };

    return (
        <div>
            {items.map((item) => {
                // 2. Check the quantity for *this specific item*
                const itemQuantity =
                    cartItems[item.card.info.id]?.quantity || 0;

                return (
                    <div
                        data-testid="foodItems"
                        key={item.card.info.id}
                        className="py-1 my-2 border-gray-200 border-b-2 text-left flex justify-between"
                    >
                        {/* --- Left Side (Details) --- */}
                        <div className="w-9/12 pr-4 pb-2">
                            {/* Veg/Non-Veg Icon */}
                            {item.card.info.itemAttribute?.vegClassifier ===
                            "VEG" ? (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
                                    className="w-4 h-4 mb-1"
                                    alt="Veg"
                                />
                            ) : item.card.info.itemAttribute?.vegClassifier ===
                              "NONVEG" ? (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/1200px-Non_veg_symbol.svg.png"
                                    className="w-4 h-4 mb-1"
                                    alt="Non-Veg"
                                />
                            ) : null}

                            {/* Item Name */}
                            <div className="font-semibold text-gray-800 text-base">
                                <span>{item.card.info.name}</span>
                            </div>

                            {/* Price */}
                            <div className="py-1 mb-1 text-sm">
                                {item.card.info.price &&
                                item.card.info.defaultPrice &&
                                item.card.info.price !==
                                    item.card.info.defaultPrice ? (
                                    <>
                                        <span className="text-gray-500 line-through mr-2">
                                            ₹{item.card.info.defaultPrice / 100}
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            ₹{item.card.info.price / 100}
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-semibold text-gray-800">
                                        ₹
                                        {item.card.info.price
                                            ? item.card.info.price / 100
                                            : item.card.info.defaultPrice / 100}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-500 h-8 overflow-hidden">
                                {item.card.info.description}
                            </p>
                        </div>

                        {/* --- Right Side (Image & Button) --- */}
                        <div className="lg:w-3/12 w-4/12 sm:p-4 py-4 flex flex-col items-center">
                            {/* Image */}
                            {item.card.info.imageId && (
                                <img
                                    src={CDN_URL + item.card.info.imageId}
                                    className="w-full h-28 object-cover rounded-lg"
                                />
                            )}

                            {/* --- THIS IS THE UPDATED BUTTON LOGIC --- */}
                            <div
                                className={`relative z-10 ${
                                    item.card.info.imageId ? "-mt-4" : "mt-2"
                                }`}
                            >
                                {itemQuantity === 0 ? (
                                    // 3. If quantity is 0, show "ADD" button
                                    <button
                                        className="px-6 py-0.5 rounded-lg bg-white text-green-600 shadow-lg font-bold border border-gray-200 transition-transform duration-150 ease-in-out active:scale-95 active:bg-gray-100"
                                        onClick={() => handleAddItem(item)}
                                    >
                                        ADD
                                    </button>
                                ) : (
                                    // 4. If quantity > 0, show +/- selector
                                    <div className="flex items-center justify-between w-24 px-1 py-0.5 rounded-lg bg-white text-green-600 shadow-lg font-bold border border-gray-200">
                                        <button
                                            className="text-lg text-gray-500 font-bold transition-transform duration-150 ease-in-out active:scale-95 px-2"
                                            onClick={() =>
                                                handleRemoveItem(item)
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="text-lg text-green-600">
                                            {itemQuantity}
                                        </span>
                                        <button
                                            className="text-lg text-green-600 font-bold transition-transform duration-150 ease-in-out active:scale-95 px-2"
                                            onClick={() => handleAddItem(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* --- END OF UPDATED BUTTON LOGIC --- */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ItemList;
