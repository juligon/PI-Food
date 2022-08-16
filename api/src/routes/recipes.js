const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { getApiRecipes, getAllRecipes } = require("../controllers/recipes");
const { Recipe } = require("../db");

router.get("/recipes", async (req, res) => {
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes();
        if (name) {
            let recipe = await allRecipes.filter((e) =>
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

router.post("/recipes", async (req, res) => {
	try {
		const {
			name,
			summary,
			healthScore,
			image,
			instructions,
			createdInDb,
			diet,
        } = req.body;
        
		const newRecipe = await Recipe.create({
			name,
			summary,
			healthScore,
			image,
			instructions,
			createdInDb,
        });

        let dbDiet = await diet.findAll({
            where: {name:diet}
        })

        newRecipe.addDiet(dbDiet);
        res.send('Recipe created succesfully')

    } catch (error) {
        console.log(error);
    }
});

router.get("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allRecipes = await getAllRecipes();
        if (id) {
            let recipeId = await allRecipes.filter(e => e.id === id);
            recipeId.length ? res.json(recipeId) : res.status(404).send('Recipe not found');
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
