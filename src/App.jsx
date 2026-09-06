import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import UserContext from "./utils/UserContext";
// Removed Redux Provider and appStore import from here as they moved to main.jsx
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "./index.css";
// CORRECTED IMPORT PATH: Assuming useFirestoreCartSync.js is in src/utils/
import useFirestoreCartSync from "./utils/useFirestoreCartSync";

const AppLayout = () => {
    const [userName, setUserName] = useState();

    useEffect(() => {
        setUserName("Ambuj Jaiswal");
    }, []);

    useFirestoreCartSync();

    return (
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="app">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </UserContext.Provider>
    );
};

export default AppLayout;
