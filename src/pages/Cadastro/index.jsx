import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Cadastro.module.css";

import { useState, useEffect } from "react";

const Cadastro = () => {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

   const { createUser, error: authError, loading } = useAuthentication();//renomeamos o error, pois já temos um error aqui no frontend.

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError("");

		const user = {
			displayName,
			email,
			password,
		};

		if (password !== confirmPassword) {
			setError("As senhas precisam ser iguais!");

			return;
		}

      const res = await createUser(user)

		console.log(res);
	};

   useEffect(() => {
      if(authError) {
         setError(authError);
      }
   }, [authError])

	return (
		<section id="cadastro">
			<div className="title">
				<h1>Cadastre-se para postar</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Nome</span>
					<input
						type="text"
						name="displayName"
						required
						placeholder="Nome de usuário"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
					/>
				</label>
				<label>
					<span>E-mail</span>
					<input
						type="email"
						name="email"
						required
						placeholder="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<span>Senha</span>
					<input
						type="password"
						name="password"
						required
						placeholder="Crie uma senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label>
					<span>Confirme sua senha</span>
					<input
						type="password"
						name="confirmPassword"
						required
						placeholder="Confirme sua senha"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>


				{!loading && <button className="btn">Cadastrar</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}

            {error && <p className="error">{error}</p>}
			</form>
		</section>
	);
};

export default Cadastro;
