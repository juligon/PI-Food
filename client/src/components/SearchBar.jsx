import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByTitle } from "../actions";

export default function SearchBar() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setTitle(e.target.value); //valor que tiene el input
		console.log(title);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getRecipesByTitle(title));
		setTitle("");
	}

	return (
		<div>
			<input
				value={title}
				type="text"
				placeholder="Recipe..."
				onChange={(e) => handleInputChange(e)}
			/>
			<button type="submit" onClick={(e) => handleSubmit(e)}>
				Search
			</button>
		</div>
	);
}
