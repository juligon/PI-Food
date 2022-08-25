import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getRecipesByTitle } from "../actions";
import logo from "./Logo/LogoPi.png";
import style from "./NavBar.module.css";

export default function NavBar() {
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
							className={style.input}
							value={title}
							type="text"
							placeholder="Find a recipe..."
							onChange={(e) => handleInputChange(e)}
						/>
					</li>
					<li className={style.li}>
						<button
							className={style.button}
							type="submit"
							onClick={(e) => handleSubmit(e)}
						>
							search
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
