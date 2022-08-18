const { Router } = require("express");
const router = Router();
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

		const newRecipe = await Recipe.create({              //crea la receta en db
			name,
			healthScore,
			summary,
			image,
			instructions,
			createdInDb,
		});

		const dbDiet = await Diet.findAll({                 //encuentra la receta que coincida 
			where: { name: diets },                         //con el nombre que llega por body
		});

		newRecipe.addDiet(dbDiet);
		res.send("Recipe created succesfully");
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
