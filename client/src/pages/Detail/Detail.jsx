import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, cleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";

export default function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
		dispatch(cleanDetail());
	}, [dispatch, id]);

	const recipe = useSelector((state) => state.detail);

	return (
		<div className={style.container}>
			{recipe.length > 0 ? (
				<div>
					<img src={recipe[0].image} alt="Not found" className={style.image} />
					<h3 className={style.title}>{recipe[0].title}</h3>
					<h5 className={style.items}>
						Health Score: {recipe[0].healthScore ? recipe[0].healthScore : 0}
					</h5>
					<h5 className={style.summary}>
						Summary: <p>{recipe[0].summary?.replace(/<[^>]+>/g, "")}</p>
					</h5>
					<h5 className={style.items}>
						Diets: {recipe[0].diets?.map((e) => e.name).join(", ")}
					</h5>
					<h5 className={style.items}>
						Dish type: {recipe[0].dishTypes?.map((e) => e.name).join(", ")}
					</h5>
					<p className={style.instructions}>
						Intructions:
						<ol>
							{Array.isArray(recipe[0].instructions)
								? recipe[0].instructions.map((e) => e.steps.map((f) => 
									<li>{f.step}</li>)
								) : recipe[0].instructions}
						</ol>
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
