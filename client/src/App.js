import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import CreateRecipe from "./pages/Create/CreateRecipe";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/recipes/:id" component={Detail} />
				<Route exact path="/recipe" component={CreateRecipe} />
			</Switch>
		</div>
	);
}

export default App;
