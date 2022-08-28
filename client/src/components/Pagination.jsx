import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({
	recipesPerPage,
	allRecipes,
	pagination,
	currentPage,
}) {
	const pageNumbers = [];

	//divide todas las recetas por la cantidad de recetas por pagina
	//y los pushea al array pageNumbers
	for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
		pageNumbers.push(i);
	}

	//el map los renderiza cada numero por separado
	return (
		<div>
			<ul className={style.pagination}>
				{pageNumbers.length > 1 && (
					<li className={style.li} key="prev">
						<a
							onClick={() => {
								if (currentPage > 1) {
									pagination(currentPage - 1);
								}
							}}
						>
							&lt;
						</a>
					</li>
				)}

				{pageNumbers?.map((number) => (
					<li key={number} className={style.li}>
						<a onClick={() => pagination(number)}>{number}</a>
					</li>
				))}
				{pageNumbers.length > 1 && (
					<li className={style.li} key="next">
						<a
							onClick={() => {
								if (currentPage < pageNumbers.length) {
									pagination(currentPage + 1);
								}
							}}
						>
							&gt;
						</a>
					</li>
				)}
			</ul>
		</div>
	);
}
