const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { getApiRecipes, getAllRecipes } = require("../controllers/recipes");
const { Recipe, Diet } = require("../db");

router.get("/", async (req, res) => {
	const { name } = req.query;
	try {
		const allRecipes = await getAllRecipes();
		if (name) {
			const recipe = await allRecipes.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase())
			);
			recipe.length
				? res.json(recipe)
				: res.status(404).send("Recipe not found");
		} else {
			res.json(allRecipes);
		}
	} catch (error) {
		console.log(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
        const { id } = req.params;
		const allRecipes = await getAllRecipes();
		if (id) {
			const recipeId = await allRecipes.filter((e) => e.id == id);
			recipeId.length
				? res.json(recipeId)
				: res.status(404).send("Recipe not found");
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
