import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../actions";
import style from "./Details.module.css";

export default function Details() {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch, id]);

	const recipe = useSelector((state) => state.details);

	return (
		<div className={style.container}>
			{recipe.length > 0 ? (
				<div>
					<img
						src={recipe[0].image}
						alt="Not found"
						className={style.image}
					/>
					<h3 className={style.title}>{recipe[0].title}</h3>
					<h5 className={style.items}>
						Health Score: {recipe[0].healthScore ? recipe[0].healthScore : 0}
					</h5>
					<h5 className={style.summary}>
						Summary: <p>{recipe[0].summary?.replace(/<[^>]+>/g, "")}</p>
					</h5>
					<h5 className={style.items}>
						Diets: {recipe[0].diets?.map((e) => e).join(", ")}
					</h5>
					<h5 className={style.items}>
						Dish type: {recipe[0].dishTypes?.map((e) => e).join(", ")}
					</h5>
					<p className={style.instructions}>
						Intructions:
						{recipe[0].analyzedInstructions?.steps.map((e) => {
							<li>
								{e.number}. {e.step}
							</li>;
						})}
					</p>
				</div>
			) : (
				<p className={style.loading}>Loading...</p>
			)}
			<Link to="/home">
				<button className={style.button}>Go back!</button>
			</Link>
		</div>
	);
}
