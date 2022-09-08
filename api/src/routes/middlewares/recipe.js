const { Router } = require("express");
const { Recipe, Diet } = require("../../db");
const router = Router();

router.post("", async (req, res) => {             
	try {
		const {
			title,
			healthScore,
			summary,
			image,
			diets,
			instructions,
			createdInDb,
		} = req.body;

		const newRecipe = await Recipe.create({ //crea la receta en db
			title,
			healthScore,
			summary,
			image,
			instructions,
			createdInDb,
		});

		const dbDiet = await Diet.findAll({ //encuentra la receta que coincida 
			where: { name: diets },  //con el nombre que llega por body
		});

		newRecipe.addDiet(dbDiet);
		res.send("Recipe succesfully created");
	} catch (error) {
		res.status(404).send("Something went wrong!");
	}
});

module.exports = router;
