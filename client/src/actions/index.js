import axios from "axios";

//mediante las actions se genera la conexión front y back
export function getRecipes() {
	return async function (dispatch) {
		var json = await axios.get("http://localhost:3001/recipes");
		return dispatch({
			type: "GET_RECIPES",
			payload: json.data,
		});
	};
};

export function getRecipesByName(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
            return dispatch({
                type: "GET_RECIPES_BY_NAME",
                payload: json.data
            })
		} catch (error) {
			console.log(error);
		}
    } 
};

export function getDiets() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/diets");
        return dispatch({
            type: "GET_DIETS",
            payload: json.data,
        })
    }
};

export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({ type: "GET_DETAIL", payload: json.data });
        } catch (error) {
            console.log(err);
        };
    };
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/recipe", payload);
        return response;
    }
}

export function filterRecipesByDiet(payload) {
    return {
        type: "FILTER_BY_DIET",
        payload
    }
};

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByScore(payload) {
	return {
		type: "ORDER_BY_SCORE",
		payload,
	};
}