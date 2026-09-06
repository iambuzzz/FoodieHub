import { useState } from "react"; // Import hooks here
import ItemList from "./ItemList";
// We no longer need forwardRef, useRef, or useEffect

// This component now manages its own state
// We only need the 'data' prop
const RestaurantCategory = ({ data }) => {
    // This component now has its OWN state to track if it's open or not
    const [isOpen, setIsOpen] = useState(false);

    // We have removed the ref and scrolling logic
    // const categoryRef = useRef(null);

    const handleClick = () => {
        // It just toggles its own state
        setIsOpen(!isOpen);
    };

    // We have removed the useEffect for scrolling

    return (
        // We have removed the ref from this div
        <div>
            {/* Header */}
            <div className="lg:w-8/12 sm:w-9/12 w-9/10 mx-auto my-4 bg-gray-50 shadow-lg sm:p-4 p-3">
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span>
                    {/* The arrow now depends on the local 'isOpen' state */}
                    <span>{isOpen ? "⌃" : "⌄"}</span>
                </div>

                {/* The list now renders based on the local 'isOpen' state */}
                {isOpen && <ItemList items={data.itemCards} />}
            </div>
        </div>
    );
};

export default RestaurantCategory;
