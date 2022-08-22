import React from "react";

export default function Card({ title, diets, image }) {
	return (
		<div>
			<h3>{title}</h3>
			{diets.map((e) => (
				<h5>
					{e.name}
				</h5>
			))}
			<img src={image} alt="Image not found" width="200px" height="250px" />
		</div>
	);
}
