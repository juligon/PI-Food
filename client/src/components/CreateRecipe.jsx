import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";

function validate(input) {
	let errors = {};
	if (!input.title) {
		errors.title = "The recipe's title is required";
	} else if (!input.summary) {
		errors.summary = "Summary is required";
	} else if (input.healthScore > 100) {
		errors.healthScore = "Health score must be lower than 100";
	}
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

	function handleChange(e) {
		setInput({
			...input,
			[e.target.title]: e.target.value, //toma el valor del input y lo pasa al estado
		});
		setErrors(
			validate({
				...input,
				[e.target.title]: e.target.value,
			})
		);
	}

	function handleSelect(e) {
		setInput({
			...input,
			diets: [...input.diets, e.target.value], //me trae lo que ya había en el estado y le agrega el value
		});
	}

	function handleDelete(e) {
		setInput({
			...input,
			diets: input.diets.filter((d) => d !== e),
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(postRecipe(input));
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
	}

	return (
		<div>
			<Link to="/home">
				<button>Go back!</button>
			</Link>
			<h1>Create your recipe</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Recipe's title:</label>
					<input
						type="text"
						value={input.title}
						name="title"
						onChange={(e) => handleChange(e)}
					/>
					{errors.title && <p>{errors.title}</p>}
				</div>
				<div>
					<label>Summary:</label>
					<textarea
						type="text"
						value={input.summary}
						name="summary"
						onChange={(e) => handleChange(e)}
					/>
					{errors.summary && <p> {errors.summary}</p>}
				</div>
				<div>
					<label>Image:</label>
					<input
						type="text"
						value={input.image}
						name="image"
						placeholder="URL image"
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Health Score:</label>
					<input
						type="number"
						value={input.healthScore}
						name="healthScore"
						onChange={(e) => handleChange(e)}
					/>
					{errors.healthScore && <p> {errors.healthScore}</p>}
				</div>
				<div>
					<label>Intructions:</label>
					<textarea
						type="text"
						value={input.instructions}
						name="instructions"
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<label>Select diets </label>
				<select onChange={(e) => handleSelect(e)}>
					{diets.map((d) => (
						<option value={d.name}>{d.name}</option>
					))}
				</select>
				<ul>
					<li>{input.diets.map((e) => e.toUpperCase() + ", ")}</li>
				</ul>
				{input.diets.map((e) => (
					<div>
						<p>{e}</p>
						<button onClick={() => handleDelete(e)}>X</button>
					</div>
				))}
				<button type="submit">Create recipe</button>
			</form>
		</div>
	);
}
