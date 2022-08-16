const { Recipe, Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, SPOONACULAR_URL } = process.env;

const getApiRecipes = async () => {
	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);
	const apiRecipes = await apiUrl.data.map((e) => {
		return {
			id: e.id,
			name: e.name,
			summary: e.summary,
			image: e.image,
			healthScore: e.healthScore,
			diets: e.diets.map((d) => d),
			instructions: e.instructions,
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
    getAllRecipes
};
