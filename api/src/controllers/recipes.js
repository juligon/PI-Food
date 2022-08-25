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
	API_KEY06,
	API_KEY07,
	API_KEY08,
	API_KEY09,
	API_KEY10,
	API_KEY11,
	API_KEY12,
	API_KEY13,
	API_KEY14,
	API_KEY15
} = process.env;

const getApiRecipes = async () => {
	//trae las recetas de la api
	try {
		const apiUrl = await axios.get(
			`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY15}&addRecipeInformation=true&number=${100}`
		);
		const apiRecipes = await apiUrl.data.results?.map((e) => {
			//axios trae la info en .data
			return {
				//mapeo solo la info que necesito
				id: e.id,
				title: e.title,
				image: e.image,
				healthScore: e.healthScore,
				summary: e.summary,
				diets: e.diets.map((f) => f), //es un array de diets
				dishTypes: e.dishTypes.map((f) => f),
				instructions: e.analyzedInstructions[0]?.steps.map((f) => ({
					//array de objetos
					number: f.number, //mapeo cada paso con su respectivo
					step: f.step, //numero y texto
				})),
			};
		});
		return apiRecipes;
	} catch (error) {
		console.log(error);
	}
};

const getDbRecipes = async () => {
	//trae las recetas de la db
	try {
		return await Recipe.findAll({
			include: {
				model: Diet, //incluye el modelo diet para generar la relación (n-->m)
				attributes: ["name"], //mediante el atributo name
				through: {
					attributes: [],
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const getAllRecipes = async () => {
	//trae todas las recetas
	try {
		const apiRecipes = await getApiRecipes();
		const dbRecipes = await getDbRecipes();
		const allRecipes = apiRecipes.concat(dbRecipes);
		return allRecipes;
	} catch (error) {
		console.log(error);
	}	
};

module.exports = {
	getApiRecipes,
	getDbRecipes,
	getAllRecipes,
};
