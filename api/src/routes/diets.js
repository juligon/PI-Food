const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { getDiets } = require("../controllers/diets");
const { Diet } = require("../db");


router.get("/diets", async (req, res) => {
    try {
        let dBDiets = await Diet.findAll();
        res.json(dBDiets)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router