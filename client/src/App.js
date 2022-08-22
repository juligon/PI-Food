import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import CreateRecipe from "./components/CreateRecipe";

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
