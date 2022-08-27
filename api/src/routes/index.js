const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipes.js");
const recipe = require("./recipe.js");
const diets = require("./diets.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes); //crea las rutas y las vincula con sus respectivos archivos
router.use("/recipe", recipe);
router.use("/diets", diets);

module.exports = router;
