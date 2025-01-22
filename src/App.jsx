import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<Sobre />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
