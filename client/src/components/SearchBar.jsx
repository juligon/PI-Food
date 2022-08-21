import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../actions";

export default function SearchBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value); //valor que tiene el input
		console.log(name);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getRecipesByName(name));
		setName("");
	}

	return (
		<div>
            <input
                value={name}
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
