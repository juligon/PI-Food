const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getDiets = async () => {
	const apiUrl = await axios.get(
		`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);
	const apiDiets = await apiUrl.data.map((e) => e.diets).flat();
	apiDiets.forEach((e) => {
		Diet.findOrCreate({
			where: { name: e },
		});
	});
};

module.exports = getDiets;
