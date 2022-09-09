import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByTitle } from "../../redux/actions";
import style from "./NavBar.module.css";

export default function NavBar() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setTitle(e.target.value); //valor que tiene el input
		console.log(title)
	}

	function handleSubmit(e) {
		try {
			if (title.length) {
				e.preventDefault();
				dispatch(getRecipesByTitle(title));
				setTitle("");
			} else {
				alert('The field is empty!')
			}
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<header>
			<nav className={style.nav}>
				<ul className={style.ul}>
					<li className={style.li}>
						<a href="/">Landing Page</a>
					</li>
					<li className={style.li}>
						<a href="/home">Recipes</a>
					</li>
					<li className={style.li}>
						<a href="/recipe">Create your recipe</a>
					</li>
					<li className={style.li}>
						<input
							value={title}
							type="text"
							placeholder="Find a recipe..."
							onChange={(e) => handleInputChange(e)}
							className={style.input}
						/>
					</li>
					<li className={style.li}>
						<button
							className={style.button}
							type="submit"
							onClick={(e) => handleSubmit(e)}
						>
							Search
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
