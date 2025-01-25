import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";//Essa importacao que mapeia se a autenticacao do usario ocorreu tudo certo.

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

function App() {

   const [user, setUser] = useState(undefined)//Comecando sem usuario com undefined
   const { auth } = useAuthentication();//chamamos nosso auth do useAuth... para nao precisar fazer novamente aqui.

   const loadingUser = user === undefined
   // Atribuo ao estado de loading do usuario a comparacao de user com undefined, entao se for undefined ele esta carregando de alguma maneira. Evita de mostrar algo antes que o usuario esteja realmente logado.

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         setUser(user)
      })
   }, [auth])

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
                     <Route path="/login" element={<Login />} />
                     <Route path="/cadastro" element={<Cadastro />} />
                     <Route path="/posts/create" element={<CreatePost />} />
                     <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
               </div>
               <Footer />
            </BrowserRouter>
         </AuthProvider>
      </div>
   );
}

export default App;
