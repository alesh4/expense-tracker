import React, { useState } from "react";

function TopBar(props){
    const[hasPrevious, setPrevious] = useState(props.hasPrevious);
    const[title, setTible] = useState("Workout App");
    return(
        <div className="flex w-full items-center justify-center bg-indigo-200 z-10 h-10 md:h-24" style={{maxWidth:"1280px"}}>
        {hasPrevious && 
            <div> display back </div>
        }
        <div className="text-2xl md:text-6xl">{title}</div>
        </div>
        
    )
}
export default TopBar;