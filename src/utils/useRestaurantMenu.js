import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import resDetails from "../utils/resdetails.json";
const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 1. Build the full Swiggy URL
        // const swiggyURL = `${
        //     MENU_API + resId
        // }&catalog_qa=undefined&submitAction=ENTER`;

        // 2. Encode it for the proxy
        // const encodedURL = encodeURIComponent(swiggyURL);

        // 3. Build the full proxy URL
        // const proxyURL = `https://api.allorigins.win/raw?url=${encodedURL}`;
        // console.log(swiggyURL);
        // 4. Fetch the PROXY URL, not the Swiggy URL
        // const data = await fetch(swiggyURL);
        // const json = await data.json(); // This will work now
        const json = resDetails;
        const data = resDetails.allData.find(Item => Item.data.cards[2].card.card.info.id == resId);
        setResInfo(data.data);
    };

    return resInfo;
};

export default useRestaurantMenu;
