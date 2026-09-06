// src/components/Cart.jsx (SIMPLIFIED)
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice"; // No need for setCart here
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

// Firebase imports (NO LONGER NEEDED IN CART.JSX)
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Helper function to calculate total
const calculateTotal = (items) => {
    let total = 0;
    Object.values(items).forEach((item) => {
        const price =
            item.itemData.card.info.price ||
            item.itemData.card.info.defaultPrice;
        total += (price / 100) * item.quantity;
    });
    return total.toFixed(2);
};

// Simple SVG for Empty Cart
const EmptyCartIcon = () => (
    <svg
        className="w-24 h-24 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
    </svg>
);

const DustbinIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);

const Cart = () => {
    const cartItemsMap = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    // The user's authentication status is handled by useFirestoreCartSync or a global context.
    // For displaying the login message, you'd ideally get auth state from a context.
    // For now, let's assume if cartItemsMap is empty, and user *should* be logged in,
    // this logic would be better placed where auth state is directly available.
    // However, if the useFirestoreCartSync clears the cart on logout,
    // then cartItemsMap being empty implicitly means either no items or user logged out.

    // A more robust check for "user not logged in" might involve checking firebase auth state directly
    // here if not handled globally, or checking `currentUserId` from a shared context.
    // For this simplified Cart.jsx, we assume the `useFirestoreCartSync` hook handles
    // loading the right data or clearing the cart based on auth state.
    // So, if the cart is empty, we assume it's legitimately empty or the user needs to add items.

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
    };

    if (Object.keys(cartItemsMap).length === 0) {
        // Check length of keys for an empty object
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center p-10 pb-24 md:pb-10">
                <EmptyCartIcon />
                <h1 className="text-2xl font-bold mb-2 mt-6 text-gray-700">
                    Your cart is empty
                </h1>
                <p className="text-gray-500 mb-6">
                    You can go to the home page to view more restaurants.
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                    See Restaurants
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-6 md:pt-8 md:pb-8">
            <div className="w-full max-w-3xl mx-auto p-4">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Your Cart
                        </h1>
                        <button
                            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                            onClick={handleClearCart}
                        >
                            <DustbinIcon />
                            Clear Cart
                        </button>
                    </div>
                    <div className="mb-6 grow">
                        {Object.values(cartItemsMap).map(
                            ({ itemData, quantity }) => {
                                const itemInfo = itemData.card.info;
                                return (
                                    <div
                                        key={itemInfo.id}
                                        className="flex items-center py-4 border-b border-gray-100 last:border-b-0"
                                    >
                                        {itemInfo.imageId && (
                                            <img
                                                src={CDN_URL + itemInfo.imageId}
                                                alt={itemInfo.name}
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-2 sm:mr-4 shrink-0"
                                            />
                                        )}
                                        <div className="grow min-w-0">
                                            <h2 className="font-semibold text-gray-800 truncate">
                                                {itemInfo.name}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                ₹
                                                {(itemInfo.price ||
                                                    itemInfo.defaultPrice) /
                                                    100}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-2">
                                            <button
                                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-all active:scale-95"
                                                onClick={() =>
                                                    handleRemoveItem(itemData)
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="font-bold w-6 sm:w-8 text-center text-base sm:text-lg text-green-600">
                                                {quantity}
                                            </span>
                                            <button
                                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition-all active:scale-95"
                                                onClick={() =>
                                                    handleAddItem(itemData)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <div className="shrink-0 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-semibold text-gray-700">
                                To Pay
                            </span>
                            <span className="text-2xl font-bold text-gray-900">
                                ₹{calculateTotal(cartItemsMap)}
                            </span>
                        </div>
                        <button className="w-full mt-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-lg shadow-md hover:shadow-lg">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
