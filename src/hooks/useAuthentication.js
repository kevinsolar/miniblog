import { db } from "../firebase/config";

//Importando funções que iremos precisar.
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile, //Para atualizarmos o perfil do usuario.
	signOut,
} from "firebase/auth";
// Primeiro utilizaremos a criação do usuario para depois atualizarmos o perfil do usuario

import { useState, useEffect } from "react";

export const useAuthentication = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	//cleanup
	//deal with memory leak -> memory leak é quando temos o problema de mudar de página ou algo do tipo e ainda mantermos as informações que tinhamos preenchido ou enviado em algum momento anterior/ pagina anterior, mas que não era pra acontecer.
	const [cancelled, setCancelled] = useState(false);

	const auth = getAuth(); // Isso não significa que o usuario está autenticado, mas que posso utilizar ele para realizar funções de autenticação a partir dele.

	function checkIfIsCancelled() {
		if (cancelled) {
			return;
		}
	}

	const createUser = async (data) => {
		checkIfIsCancelled();
		//Criamos a função de cleanup antes, aqui utilizamos ela para fazer seu papel.

		setLoading(true);
		setError(null);

		//Fazemos o try-catch para tentar criar o usuario, caso não der certo, validamos os erros.
		try {
			//Aqui pegamos o usuario que chega da função
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);

			//Após receber o usuário, então vamos atualizar o perfil do usuario
			await updateProfile(user, {
				displayName: data.displayName,
				//* Podemos passar o displayName e o photoURL
			});

			//Ao finalizar a função, colocamos o setLoading para falso, pois já terminou de carregar/realizar a função.
			setLoading(false);

			//retorno o usuario
			return user;
		} catch (error) {
			console.log(error.message);
			console.log(typeof error.message);

			let systemErrorMessage;
			if (error.message.includes("Password")) {
				systemErrorMessage =
					"A senha precisa conter pelo menos 6 caracteres.";
			} else if (error.message.includes("email-already")) {
				systemErrorMessage = "E-mail já cadastrado.";
			} else {
				systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
			}

			//Ao finalizar a função, colocamos o setLoading para falso, pois já terminou de carregar/realizar a função.
			setLoading(false);
			// Caso tenha erro e de acordo com o erro, passaremos a mensagem referente ao erro.
			setError(systemErrorMessage);
		}
	};

	// fazer Logout / sair do usuario atual.
	const logout = () => {
		// cuidamos primeiro do nosso memory leak
		checkIfIsCancelled();

		//chamamos a função do firebase para fazer o signOut e passamos como parametro o usuario autenticado.
		signOut(auth);
	};

	//Utilizamos esse useEffect com o plano de que ele execute uma vez só, para colocar o cancelado como true, assim que sairmos da página.
	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	//Criamos então o retorno das coisas que criamos
	return {
		auth,
		createUser,
		error,
		loading,
      logout,
	};
};
