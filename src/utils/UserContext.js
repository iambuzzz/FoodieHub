import { createContext } from "react";

// Context ko create karein. Ismein user ki info (ya null) aur ek update function hoga.
const UserContext = createContext({
    loggedInUser: null, // Default value
    setUserName: () => {}, // Placeholder function
});

export default UserContext;
