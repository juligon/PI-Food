const { Recipe, Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const {
	SPOONACULAR_URL,
	API_KEY,
	API_KEY01,
	API_KEY02,
	API_KEY03,
	API_KEY04,
	API_KEY05,
} = process.env;

const getApiRecipes = async (amount = 100) => {
	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${100}`
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

const validateApiKey = async (amountRecipes) => {
	let API_KEY = process.env.API_KEY;
	let amountKeys = 6;
	for (let i = 1; i <= amountKeys; i++) {
		try {
			let apiUrl = await axios.get(
				`https://${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${amountRecipes}`
			);
			console.log("key actual", API_KEY);
			return apiUrl;
		} catch (error) {
			console.log("key vencida", API_KEY);
			API_KEY = process.env[`API_KEY${i}`];
		}
	}
};

module.exports = {
	getApiRecipes,
	getDbRecipes,
	getAllRecipes,
	validateApiKey,
};
