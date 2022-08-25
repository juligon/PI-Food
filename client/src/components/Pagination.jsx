import React from "react";
import style from "./Pagination.module.css"

export default function Pagination({ recipesPerPage, allRecipes, pagination }) {
    const pageNumbers = [];

    //divide todas las recetas por la cantidad de recetas por pagina
    //y los pushea al array pageNumbers
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++ ) {
        pageNumbers.push(i); 
        
    }

    //el map los renderiza cada numero por separado
    return (
			<nav>
				<ul className={style.pagination}>
					{pageNumbers?.map((number) => (
						<li key={number} className={style.li}>
							<a onClick={() => pagination(number)}>{number}</a>
						</li>
					))}
				</ul>
			</nav>
		);
};