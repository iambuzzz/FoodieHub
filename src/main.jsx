import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./App";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Account from "./components/Account";
import { lazy, Suspense } from "react";
import "./index.css";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "/", element: <Body /> },
            {
                path: "/about",
                element: (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <About />
                    </Suspense>
                ),
            },
            { path: "/contact", element: <Contact /> },
            {
                path: "/grocery",
                element: (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Grocery />
                    </Suspense>
                ),
            },
            { path: "/restaurants/:resId", element: <RestaurantMenu /> },
            { path: "/cart", element: <Cart /> },
            { path: "/login", element: <Login /> },
            { path: "/account", element: <Account /> },
        ],
        errorElement: <Error />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={appStore}>
            <RouterProvider router={appRouter} />
        </Provider>
    </StrictMode>
);
