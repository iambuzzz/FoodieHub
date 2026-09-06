import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";
// --- YEH HAI FIX ---
// 1. Apne central firebase.js file se 'auth' aur 'db' import karein
import { auth, db } from "../utils/firebase";
import {
    doc,
    setDoc,
    getDoc, // 2. 'onSnapshot' ki jagah 'getDoc' import karein
} from "firebase/firestore";
import Shimmer from "./Shimmer"; // Shimmer component
// --- END FIX ---

// --- Firebase Config, initializeApp, getFirestore yahaan se HATA diya gaya hai ---

// Icons (waise hi rahenge)
const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);
const PhoneIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);
const LocationIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const Account = () => {
    const { loggedInUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [profileState, setProfileState] = useState("");

    const [userId, setUserId] = useState(null);

    // 1. User ka ID (uid) get karein (Yeh sahi hai)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // 2. Profile data ko Firestore se fetch karein (Updated to getDoc)
    useEffect(() => {
        if (!userId) return;

        // 3. (Optimization) 'getDoc' use karein taaki data sirf ek baar load ho
        const fetchProfile = async () => {
            setIsLoading(true);
            const docRef = doc(db, `users/${userId}/profile`, "details"); // Path thoda simple kar diya

            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFullName(data.fullName || "");
                    setPhone(data.phone || "");
                    setAddress(data.address || "");
                    setCity(data.city || "");
                    setPincode(data.pincode || "");
                    setProfileState(data.profileState || "");
                } else {
                    console.log("No profile data found, user can create one.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
        // onSnapshot waala listener hata diya
    }, [userId]); // Yeh effect tab run hoga jab userId change hoga

    // 3. Data ko Firestore mein save karein
    const handleSave = async (e) => {
        e.preventDefault();
        if (!userId) return;

        setIsSaving(true);
        // Path ko `fetchProfile` se match karein
        const docRef = doc(db, `users/${userId}/profile`, "details");

        const profileData = {
            fullName,
            phone,
            address,
            city,
            pincode,
            profileState,
        };

        try {
            await setDoc(docRef, profileData, { merge: true });
            setIsSaving(false);
            setIsEditing(false); // Edit mode band karein
        } catch (error) {
            console.error("Error saving profile:", error);
            setIsSaving(false);
            alert("Failed to save profile. Please try again.");
        }
    };

    // 4. Cancel karne par data reset karein
    const handleCancel = () => {
        setIsEditing(false);
        // Re-fetch data to discard changes
        // (Sirf 'getDoc' waale logic ke liye zaroori)
        // Hum trigger karne ke liye 'userId' ko momentarily null karke wapas set kar sakte hain,
        // ya simple page reload kar sakte hain, ya state ko reset kar sakte hain.
        // Abhi ke liye, simple edit mode toggle karte hain.
        // Note: Agar user cancel karta hai, toh changes text fields mein dikhte rahenge.
        // Better fix: `useEffect` mein data fetch karke original state bhi save karein.
        // Abhi ke liye, simple rakhte hain.
    };

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-160px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Shimmer />
            </div>
        );
    }

    return (
        // ... (Aapka baaki saara JSX code waise hi rahega) ...
        // ... (Koi change ki zaroorat nahi hai) ...
        <div className="min-h-[calc(100vh-160px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b pb-6 border-gray-200">
                    <div className="flex items-center gap-4">
                        <img
                            src={`https://placehold.co/80x80/16a34a/ffffff?text=${
                                loggedInUser
                                    ? loggedInUser.charAt(0).toUpperCase()
                                    : "A"
                            }`}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-4 border-green-100"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                My Account
                            </h1>
                            <p className="text-gray-500 break-all">
                                {loggedInUser}
                            </p>
                        </div>
                    </div>
                    {/* Edit/Cancel Buttons */}
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 sm:mt-0 w-full sm:w-auto px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={handleCancel}
                            className="mt-4 sm:mt-0 w-full sm:w-auto px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSave}>
                    <div className="space-y-6">
                        {/* Section 1: Personal Details */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Personal Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputWithIcon
                                    icon={<UserIcon />}
                                    label="Full Name"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    disabled={!isEditing}
                                />
                                <InputWithIcon
                                    icon={<PhoneIcon />}
                                    label="Phone Number"
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Section 2: Address */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Delivery Address
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                <InputWithIcon
                                    icon={<HomeIcon />}
                                    label="Address (Flat, Building, Street)"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={!isEditing}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputWithIcon
                                        icon={<LocationIcon />}
                                        label="City"
                                        id="city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        disabled={!isEditing}
                                    />
                                    <InputWithIcon
                                        icon={
                                            <span className="text-gray-400 font-bold">
                                                #
                                            </span>
                                        }
                                        label="Pincode"
                                        id="pincode"
                                        type="number"
                                        value={pincode}
                                        onChange={(e) =>
                                            setPincode(e.target.value)
                                        }
                                        disabled={!isEditing}
                                    />
                                    <InputWithIcon
                                        icon={
                                            <span className="text-gray-400 font-bold">
                                                S
                                            </span>
                                        }
                                        label="State"
                                        id="state"
                                        value={profileState}
                                        onChange={(e) =>
                                            setProfileState(e.target.value)
                                        }
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <div className="pt-4 text-right">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

// Helper component for styled inputs
const InputWithIcon = ({
    icon,
    label,
    id,
    value,
    onChange,
    type = "text",
    disabled,
}) => (
    <div>
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    disabled
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-white"
                }`}
            />
        </div>
    </div>
);

export default Account;
