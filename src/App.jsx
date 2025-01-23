import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<Sobre />} />
						<Route path="/login" element={<Login />} />
						<Route path="/cadastro" element={<Cadastro />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
