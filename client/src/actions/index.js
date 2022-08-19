import axios from "axios";

//mediante las actions se genera la conexión front y back
export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: "GET_RECIPES",
            payload: json.data
        })
    }
};