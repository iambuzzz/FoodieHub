import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        // We use an object (map) for faster lookups and quantity management
        // { "itemId1": { itemData: {...}, quantity: 2 }, "itemId2": ... }
        items: {},
    },
    reducers: {
        /**
         * Adds an item to the cart.
         * If the item already exists, it increases its quantity.
         * Payload: The full 'item' object (e.g., { card: { info: {...} } })
         */
        addItem: (state, action) => {
            const item = action.payload;
            const id = item.card.info.id;

            if (state.items[id]) {
                // If item already exists, increase quantity
                state.items[id].quantity += 1;
            } else {
                // If new item, add it to the cart with quantity 1
                state.items[id] = {
                    itemData: item,
                    quantity: 1,
                };
            }
        },

        /**
         * Removes one unit of an item from the cart.
         * If the quantity reaches 0, the item is removed from the cart.
         * Payload: The full 'item' object (the same as addItem)
         */
        removeItem: (state, action) => {
            const item = action.payload;
            const id = item.card.info.id;

            if (state.items[id]) {
                if (state.items[id].quantity > 1) {
                    // If quantity is more than 1, decrease it
                    state.items[id].quantity -= 1;
                } else {
                    // If quantity is 1, remove the item object from the map
                    delete state.items[id];
                }
            }
        },

        /**
         * Clears all items from the cart.
         * No payload needed.
         */
        clearCart: (state) => {
            state.items = {};
        },

        /**
         * Sets the entire cart state.
         * Payload: An object representing the items map from Firestore.
         */
        setCart: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions; // Export setCart

export default cartSlice.reducer;
