import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth"; //Essa importacao que mapeia se a autenticacao do usario ocorreu tudo certo.

//HOOKS
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//CONTEXT
import { AuthProvider } from "./context/AuthContext";

//PAGES
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";

function App() {
	const [user, setUser] = useState(undefined); //Comecando sem usuario com undefined
	const { auth } = useAuthentication(); //chamamos nosso auth do useAuth... para nao precisar fazer novamente aqui.

	const loadingUser = user === undefined;
	// Atribuo ao estado de loading do usuario a comparacao de user com undefined, entao se for undefined ele esta carregando de alguma maneira. Evita de mostrar algo antes que o usuario esteja realmente logado.

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	if (loadingUser) {
		return <p>Carregando...</p>;
	}

	return (
		<div className="App">
			<AuthProvider value={{ user }}>
				<BrowserRouter>
					<Navbar />
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/sobre" element={<Sobre />} />
                     <Route path="/search" element={<Search />} />
							{/* Para impossibilitar as pessoas de entrar na página de login, já estando logadas,
                     vamos fazer uma verificação, caso não tenha o usuário, então abrirá a página de Login,
                     mas caso o usuário já esteja autenticado pela aplicação, então vamos fazer um
                     redirect para a Home, utilizando o Navigate com to="/" */}
							<Route
								path="/login"
								element={!user ? <Login /> : <Navigate to="/" />}
							/>
							{/* Mesma coisa de cima com o cadastro */}
							<Route
								path="/cadastro"
								element={!user ? <Cadastro /> : <Navigate to="/" />}
							/>

							{/*
                     Aqui vamos fazer ao contrário, pois só será possivel fazer o post e ver a Dashboard,
                     quem já estiver logado.
                     */}
							<Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
							<Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
