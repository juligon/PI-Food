import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getRecipes } from "../actions/index"

export default function Home() {
	const dispatch = useDispatch();                           //despacha las actions
	const allRecipes = useSelector((state) => state.recipes); //almacena en la constante todo lo que haya en el estado recipes

	useEffect(() => {           //trae todas las recetas del estado cuando se monta el componente
		dispatch(getRecipes());
	}, [dispatch]);               //el componente se monta siempre y cuando suceda un dispatch

	function handleClick(e) {    //resetea las recetas
		e.preventDefault();      //previene que se recargue la página
		dispatch(getRecipes());
	}

	return (
		<div>
			<h1>The Hunger App</h1>
			<Link to="/recipe">Create recipe</Link>
			<div>
				<select>
					<option value="asc">A to Z</option> {/*necesito el value para aplicar la logica y que la accion la entienda*/}
					<option value="desc">Z to A</option>
				</select>
				<select>
					<option value="max"> HealthScore: Máx </option>
					<option value="min"> HealthScore: Min </option>
				</select>
				<select>
					<option value="all"> All diets</option>
					<option value="gluten free"> Gluten free</option>
					<option value="dairy free"> Dairy free</option>
					<option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
					<option value="vegan"> Vegan</option>
					<option value="paleolithic"> Paleolithic</option>
					<option value="primal"> Primal</option>
					<option value="whole 30"> Whole 30</option>
					<option value="pescatarian"> Pescatarian</option>
					<option value="ketogenic"> Ketogenic</option>
					<option value="fodmap friendly"> Fodmap friendly</option>
				</select>
			</div>
			<div>
				{allRecipes?.map((e) => {
					return (
						<Card key={e.id} name={e.title} diets={e.diets} image={e.image} />
					);
				})}
			</div>
			<button
				onClick={(e) => {
					handleClick(e);
				}}
			>
				RESET
			</button>
		</div>
	);
}
