import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateRecipe from "./components/Create/CreateRecipe";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/recipes/:id" component={Details} />
				<Route exact path="/recipe" component={CreateRecipe} />
			</Switch>
		</div>
	);
}

export default App;
