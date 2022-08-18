const { Recipe, Diet } = require("../db");
require("dotenv").config();
const axios = require("axios");
const {
	SPOONACULAR_URL,
	API_KEY,
	API_KEY01,
	API_KEY02,
	API_KEY03,
	API_KEY04,
	API_KEY05,
} = process.env;

const getApiRecipes = async () => {           //trae las recetas de la api
	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY03}&addRecipeInformation=true&number=${100}`
	);
	const apiRecipes = await apiUrl.data.results?.map((e) => {        //axios trae la info en .data 
		return {                                                      //mapeo solo la info que necesito
			id: e.id,
			name: e.title,
			image: e.image,
			healthScore: e.healthScore,
			summary: e.summary,
			diets: e.diets.map((d) => d),                                       //es un array de diets
			instructions: e.analyzedInstructions[0]?.steps.map((s) => ({        //array de objetos
				number: s.number,                                               //mapeo cada paso con su respectivo 
				step: s.step,                                                   //numero y texto
			})),
		};
	});
	
	return apiRecipes;
};

const getDbRecipes = async () => {           //trae las recetas de la db
	return await Recipe.findAll({            
		include: {
			model: Diet,                     //incluye el modelo diet para generar la relación (n-->m)
			attributes: ["name"],            //mediante el atributo name
			through: {
				attributes: [],
			},
		},
	});
};

const getAllRecipes = async () => {                      //trae todas las recetas
	const apiRecipes = await getApiRecipes();
	const dbRecipes = await getDbRecipes();
	const allRecipes = apiRecipes.concat(dbRecipes);
	return allRecipes;
};

module.exports = {
	getApiRecipes,
	getDbRecipes,
	getAllRecipes,
};
