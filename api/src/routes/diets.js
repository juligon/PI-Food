const { Router } = require("express");
const router = Router();
const { getDiets } = require("../controllers/diets");
const { Diet } = require("../db");

router.get("/", async (req, res) => {
	try {
		const diets = await getDiets();
		res.json(diets);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
