import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
	return (
		<div className={style.landing}>
			<h1 className={style.title}>LET THE HUNGER GAMES BEGIN!</h1>
			<Link to="/home">
				<button className={style.button}>Start</button>
			</Link>
		</div>
	);
};
