import React from "react";
import style from "./Card.module.css";

export default function Card({ title, diets, image, id }) {
	return (
		<div className={style.card} key={id}>
			<h4 className={style.title}>{title}</h4>
			{diets?.map((e, index) => (
				<p key={index} className={style.diets}>
					{e.name}
				</p>
			))}
			<img src={image} alt="Image not found" className={style.image} />
		</div>
	);
}
