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

const getDiets = async () => {
	/*const findDiets = await Diet.findAll();
	if (findDiets.length) {
		return findDiets;
	}
	const diets = [
		"gluten free",
		"dairy free",
		"ketogenic",
		"vegetarian",
		"lacto vegetarian",
		"ovo vegetarian",
		"vegan",
		"pescetarian",
		"paleo",
		"primal",
		"low fodmap",
		"whole 30",
	];*/

	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY01}&addRecipeInformation=true&number=${100}`
	);
	
	const diets = await apiUrl.data.results?.map((e) => e.diets).flat();

	diets.forEach((e) => {
		Diet.findOrCreate({
			where: { name: e },
		});
	});

	return await Diet.findAll();
};

module.exports = { getDiets };
