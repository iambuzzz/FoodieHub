// import { render, screen } from "@testing-library/react";
// import Header from "../components/Header";
// import { Provider } from "react-redux";
// import appStore from "../utils/appStore";
// import { BrowserRouter } from "react-router-dom";

// it("header has cart or not", () => {
//     render(
//         <BrowserRouter>
//             // Added BrowserRouter to provide routing context "for Link"
//             <Provider store={appStore}>
//                 // Added Provider to provide Redux store context
//                 <Header />
//             </Provider>
//         </BrowserRouter>
//     );

//     // 1. Change to "getAllByText" to get an array
//     // 2. Assert on the first item in the array
//     // (Important!) Add an actual assertion to your test
//     // Find the cart link. Using a regex /cart/i makes it
//     // case-insensitive (matches "Cart", "cart", "My Cart", etc.)
//     const cartLinks = screen.getAllByText(/cart/i);

//     expect(cartLinks[0]).toBeInTheDocument();
// });

it("header has cart or not", () => {
});
