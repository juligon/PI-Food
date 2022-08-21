import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import CreateRecipe from "./components/CreateRecipe";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/recipes/:id" component={Details} />
					<Route exact path="/recipe" component={CreateRecipe} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
