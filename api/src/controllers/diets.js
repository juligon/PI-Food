const { Diet } = require("../db");
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

const getDiets = async () => {
	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);
	const apiDiets = await apiUrl.data.results?.map((e) => e.diets).flat(Infinity);
	apiDiets.forEach((e) => {
		Diet.findOrCreate({
			where: { name: e },
		});
	});
};

module.exports = getDiets;
