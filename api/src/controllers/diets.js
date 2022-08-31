const { Diet } = require("../db");
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
} = process.env;

const getDiets = async () => {
	try {
		const findDiets = await Diet.findAll();
		if (findDiets.length) {
			return findDiets;
		}
		const diets = [
			"gluten free",
			"dairy free",
			"paleolithic",
			"ketogenic",
			"lacto ovo vegetarian",
			"vegan",
			"pescatarian",
			"primal",
			"fodmap friendly",
			"whole 30",
		];

		/*const apiUrl = await axios.get(
			`${SPOONACULAR_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${100}`
		);

		const diets = await apiUrl.data.results?.map((e) => e.diets).flat();*/
		
		diets.forEach((e) => { //por c/elemento del array creo el tipo de dieta en db sin repetirse
			Diet.findOrCreate({
				where: { name: e },
			});
		});

		return await Diet.findAll();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getDiets };
