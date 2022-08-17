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

const getApiRecipes = async () => {
	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY03}&addRecipeInformation=true&number=${100}`
	);
	const apiRecipes = await apiUrl.data.results?.map((e) => {
		return {
			id: e.id,
			name: e.title,
			image: e.image,
			healthScore: e.healthScore,
			summary: e.summary,
			diets: e.diets.map((d) => d),
			instructions: e.analyzedInstructions[0]?.steps.map((s) => ({
				number: s.number,
				step: s.step,
			})),
		};
	});
	
	return apiRecipes;
};

const getDbRecipes = async () => {
	return await Recipe.findAll({
		include: {
			model: Diet,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllRecipes = async () => {
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
