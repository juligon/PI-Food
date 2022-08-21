import React from "react";

export default function Pagination({ recipesPerPage, allRecipes, pagination }) {
    const pageNumbers = [];

    //divide todas las recetas por la cantidad de recetas por pagina
    //y los pushea al array pageNumbers
    for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++ ) {
        pageNumbers.push(i + 1); 
        
    }

    //el map los renderiza cada numero por separado
    return (
			<nav>
				<ul>
					{pageNumbers?.map((number) => (
						<li>
							<a onClick={() => pagination(number)}>{number}</a>
						</li>
					))}
				</ul>
			</nav>
		);
};