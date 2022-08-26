import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import style from "./CreateRecipe.module.css";

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
						value={input.title}
						onChange={(e) => handleChange(e)}
						className={style.input}
					/>
					{errors.title && <p>{errors.title}</p>}
				</div>
				<div>
					<label className={style.label}>Summary: </label>
					<textarea
						type="textarea"
						name="summary"
						value={input.summary}
						onChange={(e) => handleChange(e)}
						className={style.input}
					/>
					{errors.summary && <p>{errors.summary}</p>}
				</div>
				<div>
					<label className={style.label}>Image: </label>
					<input
						type="text"
						name="image"
						value={input.image}
						placeholder="image URL"
						onChange={(e) => handleChange(e)}
						className={style.input}
					/>
				</div>
				<div>
					<label className={style.label}>Health Score: </label>
					<input
						type="number"
						name="healthScore"
						value={input.healthScore}
						onChange={(e) => handleChange(e)}
						className={style.input}
					/>
					{errors.healthScore && <p>{errors.healthScore}</p>}
				</div>
				<div>
					<label className={style.label}>Intructions: </label>
					<textarea
						type="textarea"
						name="instructions"
						value={input.instructions}
						onChange={(e) => handleChange(e)}
						className={style.textarea}
					/>
				</div>
				<label className={style.label}>Select diets </label>
				<select onChange={(e) => handleSelect(e)} className={style.select}>
					{diets.map((d, index) => (
						<option key={index} value={d.name}>
							{d.name}
						</option>
					))}
				</select>
				<ul className={style.ul}>
					<li className={style.li}>
						{input.diets.map((e) => e[0].toUpperCase() + e.slice(1) + ", ")}
					</li>
				</ul>
				{input.diets.map((e) => (
					<div>
						<p className={style.p}>{e}</p>
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
};
