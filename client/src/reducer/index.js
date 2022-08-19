
const initialState = {
    recipes: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
			case "GET_RECIPES":
				return {
					...state,
					recipes: action.payload,            //almacena en mi estado recipes los datos
				};                                      //que traiga la accion GET_RECIPES
			default:
				return { ...state };
		} 
};