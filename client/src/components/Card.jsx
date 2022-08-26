import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ title, diets, image, id }) {
	return (
		<div className={style.card}>
			<Link to={`recipes/${id}`} className={style.link} >
				<h4 className={style.title}>{title}</h4>
			</Link>
			{diets?.map((e) => (
				<p className={style.diets} key={e}>
					{e[0].toUpperCase() + e.slice(1)}
				</p>
			))}
			<img src={image} alt="Image not found" className={style.image} />
		</div>
	);
}
