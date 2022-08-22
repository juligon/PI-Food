import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getRecipes,
	getDiets,
	filterRecipesByDiet,
	orderByTitle,
	orderByScore,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Home() {
	const dispatch = useDispatch(); //despacha las actions
	const allRecipes = useSelector((state) => state.recipes); //almacena en la constante todo lo que haya en el estado recipes
	//const diets = useSelector((state) => state.diets);
	const [orderTitle, setOrderTitle] = useState("");
	const [orderScore, setOrderScore] = useState("");

	//paginado
	const [currentPage, setCurrentPage] = useState(1); //creo un estado local, le paso la pagina actual y la seteo para que arranque en 1
	const [recipesPerPage, setRecipesPerPage] = useState(9); //un segundo estado local, le paso la cantidad de recetas por pagina (9)
	const indexOfLastRecipe = currentPage * recipesPerPage; // 9
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
	const currentRecipes = allRecipes.slice(
		indexOfFirstRecipe,
		indexOfLastRecipe
	);
	//esta constante se guarda las recetas que se renderizan por pagina
	//el slice divide el array de todas las recetas desde el indice de la primera receta hasta el indice de la ultima
	//cada pagina debe contener 9 recetas

	const pagination = (pageNumber) => {
		//setea la pagina en el numero que vaya clickeando
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		//trae todas las recetas del estado cuando se monta el componente
		dispatch(getRecipes());
		//dispatch(getDiets());
	}, [dispatch]); //el componente se monta siempre y cuando suceda un dispatch

	function handleClick(e) {
		//resetea las recetas
		e.preventDefault(); //previene que se recargue la página
		dispatch(getRecipes());
	}

	function handleFilterByDiet(e) {
		e.preventDefault();
		dispatch(filterRecipesByDiet(e.target.value));
	}

	function handleSortByTitle(e) {
		e.preventDefault();
		dispatch(orderByTitle(e.target.value));
		setCurrentPage(1);
		setOrderTitle(`In order ${e.target.value}`); //cuando setea la pagina se modifica el estado local y se renderiza
	}

	function handleSortByScore(e) {
		e.preventDefault();
		dispatch(orderByScore(e.target.value));
		setCurrentPage(1);
		setOrderScore(`In order ${e.target.value}`);
	}

	return (
		<div>
			<h1>The Hunger App</h1>
			<Link to="/recipe">Create recipe</Link>
			<SearchBar />
			<div>
				<select onChange={(e) => handleSortByTitle(e)}>
					<option value="asc">A to Z</option>{" "}
					{/*necesito el value para aplicar la logica y que la accion la entienda*/}
					<option value="desc">Z to A</option>
				</select>
				<select onChange={(e) => handleSortByScore(e)}>
					<option value="max"> HealthScore: Máx to Min </option>
					<option value="min"> HealthScore: Min to Máx </option>
				</select>
				<select onChange={(e) => handleFilterByDiet(e)}>
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
				<button
					onClick={(e) => {
						handleClick(e);
					}}
				>
					Reset recipes
				</button>
				<Pagination
					key={1}
					recipesPerPage={recipesPerPage}
					allRecipes={allRecipes.length}
					pagination={pagination}
				/>
			</div>
			<div>
				{currentRecipes?.map((e) => {
					return (
						<Card key={e.id} title={e.title} diets={e.diets} image={e.image} />
					);
				})}
			</div>
		</div>
	);
}
