import styles from "./Cadastro.module.css";

import { useState, useEffect } from "react";

const Cadastro = () => {
	return (
		<section id="cadastro">
			<div className="title">
				<h1>Cadastre-se para postar</h1>
			</div>
			<form>
				<label>
					<span>Nome</span>
					<input
						type="text"
						name="displayName"
						required
						placeholder="Nome de usuário"
					/>
				</label>
				<label>
					<span>E-mail</span>
					<input type="email" name="email" required placeholder="E-mail" />
				</label>
				<label>
					<span>Senha</span>
					<input
						type="password"
						name="password"
						required
						placeholder="Crie uma senha"
					/>
				</label>
				<label>
					<span>Confirme sua senha</span>
					<input
						type="password"
						name="confrimPassword"
						required
						placeholder="Confirme sua senha"
					/>
				</label>

				<button className="btn">Cadastrar</button>
			</form>
		</section>
	);
};

export default Cadastro;
