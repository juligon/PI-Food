import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../actions";

export default function Details() {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch, id]);

	const details = useSelector((state) => state.details);

	return (
		<div>
			{details.length > 0 ? (
				<div>
					<h3>{details[0].title}</h3>
					<h5>
						Health Score: {details[0].healthScore ? details[0].healthScore : 0}
					</h5>
					<h5>
						Summary: <p>{details[0].summary?.replace(/<[^>]+>/g, "")}</p>
					</h5>
					<img src={details[0].image} alt="Image not found" />
					<h5>Diets: {details[0].diets?.map((e) => e)}</h5>
					<h5>Dish type: {details[0].dishTypes?.map((d) => d)}</h5>
					<p>
						Intructions:{" "}
						{details[0].analyzedInstructions?.steps.map((e, i) => (
							<li key={i}>
								{e.number}.{e.steps}
							</li>
						))}
					</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
			<Link to="/home">
				<button>GO BACK</button>
			</Link>
		</div>
	);
}
