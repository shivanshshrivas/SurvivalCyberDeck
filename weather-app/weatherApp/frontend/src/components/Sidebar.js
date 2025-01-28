import { useState } from "react";


export default function Sidebar () {

    const [isHovered, setIsHovered] = useState(false);

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }

    return (
        <div 
            className={`sidebar bg-gray-800 text-white p-4 flex flex-col items-start justify-start ${isHovered ? 'max-w-[200px]':'max-w-[60px]'} duration-300 ease-in-out h-screen absolute left-0 top-0`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}    
            >
            
            <h1 className="font-poppins text-left text-xl">Weather App</h1>
            <p className="font-roboto text-left text-sm">© Creators of Cyberdeck</p>
            <p>
                Home
            </p>
            <p>
                Weather
            </p>
        </div>
    );
}