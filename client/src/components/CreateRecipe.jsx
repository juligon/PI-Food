import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import style from "./CreateRecipe.module.css";

let validateTitle = /^[a-zA-Z\s]+$/;
export function validate(input) {
	let errors = {};

	if (!input.title) errors.title = "The recipe's title is required";
	if (input.title.length > 50) errors.title = "Title is too large";
	if (!validateTitle.test(input.title)) errors.title = "Numbers or special characters are not allowed";
	if (!input.summary) errors.summary = "Summary is required";
	if (input.summary.length > 500) errors.summary = "Summary can not exceed 500 characters"
	if (!input.image.includes("https")) errors.image = "Invalid URL";
	if (input.healthScore.length === 0) errors.healthScore = 'Health score is not valid';
	if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = "Health score must be a number between 1 and 100";
	if (input.healthScore.toString().includes('.')) errors.healthScore = 'Health score must be an integer';
	if (!input.instructions) errors.instructions = "Instructions are required";
	if (input.instructions.length > 1500) errors.instructions = "Instructions can not exceed 1500 characters";
	if (!input.diets.length) errors.diets = "Al least one diet's type is required";
	return errors;
}

export default function CreateRecipe() {
	const dispatch = useDispatch();
	const history = useHistory();
	const diets = useSelector((state) => state.diets);
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		title: "",
		summary: "",
		image: "",
		healthScore: 0,
		diets: [],
		instructions: "",
	});

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	useEffect(() => {
		setErrors(validate(input));
	}, [input]);

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value, //toma el valor del input y lo pasa al estado
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	}

	function handleSelect(e) {
		if (!input.diets.includes(e.target.value)) { //evita que se repita la dieta seleccionada
			setInput({
				...input,
				diets: [...input.diets, e.target.value], //me trae lo que ya había en el estado y le agrega el value
			});
		};
	}

	function handleDelete(e) {
		setInput({
			...input,
			diets: input.diets.filter((d) => d !== e),
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (Object.keys(errors).length === 0 && input.diets.length > 0) {//Object.keys devuelve un array de todas las propiedades del objeto
			dispatch(postRecipe(input));                                 //si no hay errores y las dietas son mayor a 0
			alert("Recipe successfully created");
			setInput({
				title: "",
				summary: "",
				image: "",
				healthScore: 0,
				diets: [],
				instructions: "",
			});
			history.push("/home"); //redirige al home
		} else {
			alert("All fields must be completed")
		}
	}

	return (
		<div className={style.container}>
			<Link to="/home">
				<button className={style.button}>Go back!</button>
			</Link>
			<form onSubmit={(e) => handleSubmit(e)} className={style.form}>
				<div>
					<h3 className={style.h3}>Create your recipe!</h3>
					<label className={style.label}>Title: </label>
					<input
						type="text"
						name="title"
						onChange={(e) => handleChange(e)}
						value={input.title}
						className={style.input}
					/>
					{errors.title && <p>{errors.title}</p>}
				</div>
				<div>
					<label className={style.label}>Summary: </label>
					<textarea
						type="textarea"
						name="summary"
						onChange={(e) => handleChange(e)}
						value={input.summary}
						className={style.input}
					/>
					{errors.summary && <p>{errors.summary}</p>}
				</div>
				<div>
					<label className={style.label}>Image: </label>
					<input
						type="text"
						name="image"
						onChange={(e) => handleChange(e)}
						value={input.image}
						placeholder="image URL"
						className={style.input}
					/>
					{errors.image && <p>{errors.image}</p>}
				</div>
				<div>
					<label className={style.label}>Health Score: </label>
					<input
						type="number"
						name="healthScore"
						onChange={(e) => handleChange(e)}
						value={input.healthScore}
						className={style.input}
					/>
					{errors.healthScore && <p>{errors.healthScore}</p>}
				</div>
				<div>
					<label className={style.label}>Intructions: </label>
					<textarea
						type="textarea"
						name="instructions"
						onChange={(e) => handleChange(e)}
						value={input.instructions}
						className={style.textarea}
					/>
					{errors.instructions && <p>{errors.instructions}</p>}
				</div>
				<label className={style.label}>Select diets </label>
				<select onChange={(e) => handleSelect(e)} className={style.select}>
					{diets.map((d, index) => (
						<option key={index} value={d.name}>
							{d.name}
						</option>
					))}
				</select>
				{errors.diets && <p>{errors.diets}</p>}
				<ul className={style.ul}>
					<li className={style.li}>
						{input.diets.map((e) => e[0].toUpperCase() + e.slice(1) + ", ")}
					</li>
				</ul>
				{input.diets.map((e) => (
					<div>
						<p className={style.p} key={e}>
							{e}
						</p>
						<button onClick={() => handleDelete(e)} className={style.delete}>
							X
						</button>
					</div>
				))}
				<button type="submit" className={style.btnForm}>
					Create recipe
				</button>
			</form>
		</div>
	);
}
