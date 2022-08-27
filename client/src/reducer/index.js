import {
	GET_RECIPES,
	GET_DIETS,
	GET_RECIPES_BY_TITLE,
	POST_RECIPE,
	GET_DETAILS,
	FILTER_BY_DIET,
	ORDER_BY_TITLE,
	ORDER_BY_SCORE,
} from "../actions";

const initialState = {
	recipes: [],
	allRecipes: [],
	details: [],
	diets: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload, //almacena en mi estado recipes los datos que traiga la accion GET_RECIPES
				allRecipes: action.payload,
			};
		case GET_RECIPES_BY_TITLE:
			return {
				...state,
				recipes: action.payload,
			};
		case GET_DIETS:
			return {
				...state,
				diets: action.payload,
			};
		case POST_RECIPE:
			return {
				...state,
			};
		case GET_DETAILS:
			return {
				...state,
				details: action.payload,
			};
		case FILTER_BY_DIET:
			const allRecipes = state.allRecipes; //copia del estado recipes que va a tener siempre todas las recetas
			const dietsFiltered =
				action.payload === "All"
					? state.allRecipes
					: allRecipes.filter((recipe) => recipe.diets.find(diet => {
						if(diet.name === action.payload) return recipe
					}));
			return {
				...state,
				recipes: dietsFiltered,
			};
		case ORDER_BY_TITLE:
			let orderByTitle =
				action.payload === "asc"
					? state.recipes.sort(function (a, b) {
							//sort-> compara dos valores y los ordena de menor a mayor o vicecersa
							if (a.title > b.title) return 1;
							if (b.title > a.title) return -1;
							return 0; //si son iguales
					  })
					: state.recipes.sort(function (a, b) {
							//si es descendente
							if (a.title > b.title) return -1;
							if (b.title > a.title) return 1;
							return 0;
					  });
			return {
				...state,
				recipes: orderByTitle,
			};
		case ORDER_BY_SCORE:
			let orderByScore =
				action.payload === "max"
					? state.recipes.sort(function (a, b) {
							if (a.healthScore > b.healthScore) return 1;
							if (b.healthScore > a.healthScore) return -1;
							return 0;
					  })
					: state.recipes.sort(function (a, b) {
							if (a.healthScore > b.healthScore) return -1;
							if (b.healthScore > a.healthScore) return 1;
							return 0;
					  });
			return {
				...state,
				recipes: orderByScore,
			};
		default:
			return { ...state };
	}
}

export default rootReducer;
