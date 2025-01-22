import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<Sobre />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
