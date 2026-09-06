import { useEffect, useState } from "react"; // Added useState
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { setCart, clearCart } from "./cartSlice";

const useFirestoreCartSync = () => {
    const cartItemsMap = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const auth = getAuth();
    const db = getFirestore();

    // currentUserId needs to be state to trigger effects that depend on it
    const [currentUserId, setCurrentUserId] = useState(null);
    // isAuthLoading helps us know when Firebase Auth has finished its initial check
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // --- Firebase Auth State Listener ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                setCurrentUserId(user.uid);
            } else {
                // User is logged out
                setCurrentUserId(null); // Explicitly set to null
                dispatch(clearCart()); // Clear Redux cart immediately on actual logout
            }
            setIsAuthLoading(false); // Auth state has been determined
        });

        return () => unsubscribe(); // Clean up the listener when component unmounts
    }, [auth, dispatch]); // Dependencies: auth instance and dispatch for clearing cart

    // --- Load Cart from Firestore ---
    // This effect runs when currentUserId changes (after login/logout) and when auth state settles
    useEffect(() => {
        if (isAuthLoading) {
            return; // Wait until auth state is known
        }

        // If no user is logged in, ensure the local Redux cart is empty
        if (!currentUserId) {
            dispatch(setCart({})); // Clear Redux cart if no user is authenticated
            return;
        }

        const userCartRef = doc(db, "users", currentUserId);

        const fetchCartFromFirestore = async () => {
            try {
                const docSnap = await getDoc(userCartRef);
                if (docSnap.exists() && docSnap.data().cart) {
                    const fetchedCart = docSnap.data().cart;
                    dispatch(setCart(fetchedCart)); // Populate Redux store with fetched data
                } else {
                    // If user document exists but no cart, or doc doesn't exist,
                    // initialize an empty cart in Firestore for this user.
                    await setDoc(userCartRef, { cart: {} }, { merge: true });
                    dispatch(setCart({})); // Ensure Redux cart is also empty
                }
            } catch (error) {
                console.error(
                    "useFirestoreCartSync: Error fetching cart from Firestore:",
                    error
                );
            }
        };

        fetchCartFromFirestore();
    }, [currentUserId, db, dispatch, isAuthLoading]); // Dependencies: currentUserId, db, dispatch, isAuthLoading

    // --- Save Cart to Firestore (Debounced) ---
    // This effect runs whenever cartItemsMap changes AND a user is logged in AND auth state settled
    useEffect(() => {
        if (isAuthLoading) {
            return; // Don't save while auth state is being determined
        }
        if (!currentUserId) {
            return; // Don't save if no user is logged in
        }

        // IMPORTANT: Ensure cartItemsMap is not empty before attempting to save
        // (This prevents overwriting a real cart with an empty one if Redux got cleared incorrectly)
        // However, if the user explicitly clears the cart, we want to save an empty object.
        // The check for `Object.keys(cartItemsMap).length === 0` should only be done if you want to skip saving empty carts
        // For a full sync, it should save whatever Redux state currently holds.

        const saveCartToFirestore = async () => {
            const userCartRef = doc(db, "users", currentUserId);
            try {
                // Ensure cartItemsMap is the latest value from Redux
                await updateDoc(userCartRef, {
                    cart: cartItemsMap, // Save the entire Redux cart items map
                });
            } catch (error) {
                console.error(
                    "useFirestoreCartSync: Error saving cart to Firestore:",
                    error
                );
            }
        };

        // Debounce: Wait a short period after the last change before saving to Firestore
        const handler = setTimeout(() => {
            // Only save if the cartItemsMap isn't empty, unless it's a deliberate clearCart action.
            // For a full sync, we should always save what's in Redux.
            saveCartToFirestore();
        }, 500); // Adjust debounce time as needed (e.g., 500ms)

        return () => {
            clearTimeout(handler); // Clear timeout if cartItemsMap changes again before save
        };
    }, [cartItemsMap, currentUserId, db, isAuthLoading]); // Dependencies: Redux cart state, user ID, db, auth loading state
};

export default useFirestoreCartSync;
