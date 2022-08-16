const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { getApiRecipes, getAllRecipes } = require("../controllers/recipes");
const { Recipe, Diet } = require("../db");

router.post("/", async (req, res) => {
	try {
		const {
			name,
			healthScore,
			summary,
			image,
			diets,
			instructions,
			createdInDb,
		} = req.body;

		const newRecipe = await Recipe.create({
			name,
			healthScore,
			summary,
			image,
			instructions,
			createdInDb,
		});

		const dbDiet = await Diet.findAll({
			where: { name: diets },
		});

		newRecipe.addDiet(dbDiet);
		res.send("Recipe created succesfully");
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
