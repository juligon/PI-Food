const { Router } = require("express");
const router = Router();
const { getDiets } = require("../controllers/diets");

router.get("", async (req, res) => {
	try {
		const diets = await getDiets();
		res.json(diets);
	} catch (error) {
		res.status(404).send("Something went wrong!");
	}
});

module.exports = router;
