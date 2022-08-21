import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
		<div>
			<h1>Let The Hunger Games Begin!</h1>
			<Link to="/home">
				<button>START</button>
			</Link>
		</div>
	);
};
