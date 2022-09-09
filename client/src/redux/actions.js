import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_BY_TITLE = "GET_RECIPES_BY_TITLE";
export const GET_DIETS = "GET_DIETS";
export const GET_DETAIL = "GET_DETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

//mediante las actions se genera la conexión front y back
export function getRecipes() {
	return async function (dispatch) {
		try {
			var json = await axios.get("http://localhost:3001/recipes");
			return dispatch({
				type: GET_RECIPES,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getRecipesByTitle(payload) {
	return async function (dispatch) {
		try {
			var json = await axios.get(
				`http://localhost:3001/recipes?title=${payload}`
			);
			return dispatch({
				type: GET_RECIPES_BY_TITLE,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getDiets() {
	return async function (dispatch) {
		try {
			var json = await axios.get("http://localhost:3001/diets");
			return dispatch({
				type: GET_DIETS,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`http://localhost:3001/recipes/${id}`);
			return dispatch({ type: GET_DETAIL, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function postRecipe(payload) {
	return async function (dispatch) {
		try {
			const response = await axios.post(
				"http://localhost:3001/recipe",
				payload
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	};
}

export function filterRecipesByDiet(payload) {
	return {
		type: FILTER_BY_DIET,
		payload,
	};
}

export function orderByTitle(payload) {
	return {
		type: ORDER_BY_TITLE,
		payload,
	};
}

export function orderByScore(payload) {
	return {
		type: ORDER_BY_SCORE,
		payload,
	};
}

export function cleanDetail() {
	return {
		type: CLEAN_DETAIL,
	};
}


