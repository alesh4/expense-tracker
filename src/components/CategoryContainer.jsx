import React from "react";

function CategoryContainer({category, value}){
    //think we are going to need description, category, value, date
    let mobile = window.innerWidth > 500 ? true : false;
    return(
        <div className="w-full">
            <h3>
            {category}
            </h3>
            <h5>
            {value}
            </h5>
        </div>
        
    )
}
export default CategoryContainer