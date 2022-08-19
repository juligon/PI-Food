import React from "react";

export default function Card({ name, diets, image }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{diets}</h5>
            <img src={image} alt="Image not found" width="200px" height="250px" />
       </div> 
    )
}