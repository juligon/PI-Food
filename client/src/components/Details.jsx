import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../actions";

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch]);

    const myRecipe = useSelector((state) => state.details);

    return (
        <div>
            {myRecipe.length > 0 ? 
                <div>
                    <h3>{myRecipe[0].name && myRecipe[0].name}</h3>
                    <h5>Health Score: {myRecipe[0].healthScore && myRecipe[0].healthScore}</h5>
                    <h5>Summary: {(<p dangerouslySetInnerHTML={{__html: myRecipe[0].summary}}></p>)}</h5>
                    <img src={myRecipe[0].image} alt="Image not found" />
                    <h5>Diets: {myRecipe[0].diets &&
                        myRecipe[0].diets.map((e) => e.name.toUpperCase() + ", ")}
                    </h5>
                    <h5>Dish type: {myRecipe[0].dishTypes
                        ? myRecipe[0].dishTypes.map((d) => d)
                        : "Dish type not found"}
                    </h5>
                    <p>Intructions: {Array.isArray(myRecipe[0].steps)
                        ? myRecipe[0].steps.map((e) => e.steps.map((f) => f.step))
                        : myRecipe[0].steps}
                    </p>
                </div>  :
                    <p>Loading...</p>
                }
                <Link to="/home">
                    <button>GO BACK</button>
            </Link>
        </div>
    );
}