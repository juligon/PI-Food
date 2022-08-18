const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("recipe", {
		id: {
			type: DataTypes.UUID,                //genera un id random de letras y numeros para que no se pise 
			defaultValue: DataTypes.UUIDV4,      //con los id de la api
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		summary: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		healthScore: {
			type: DataTypes.FLOAT,             //puede ser un numero entero o decimal
		},
		image: {
			type: DataTypes.STRING,            //la api la envía por string
		},
		instructions: {
			type: DataTypes.TEXT,
		},
		createdInDb: {                         //las recetas que cree el usuario y se almacenan en db van a contener 
			type: DataTypes.BOOLEAN,           //esta propiedad
			allowNull: false,
			defaultValue: true,
		},
	});
};
