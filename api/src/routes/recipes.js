const { Router } = require("express");
const router = Router();
const { getAllRecipes, getApiRecipes, getDbRecipes } = require("../controllers/recipes");

router.get("/", async (req, res) => { //get a / trae todas las recetas
	const { title } = req.query; //si se pasa title por query trae la receta específica
	try {
		const allRecipes = await getAllRecipes();
		if (title) {
			const recipe = await allRecipes.filter(
				(e) => e.title.toLowerCase().includes(title.toLowerCase()) //para compararlos paso ambos a lower case
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
			const recipeId = await allRecipes.filter((e) => e.id == id);  //filtra el id que llega por params
			recipeId.length
				? res.json(recipeId)
				: res.status(404).send("Recipe not found");
		}
	} catch (error) {
		console.log(error);
	}
});


module.exports = router;
