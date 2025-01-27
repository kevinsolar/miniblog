import styles from "./Navbar.module.css";
import { NavLink } from "react-router";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const Navbar = () => {
	const { user } = useAuthValue();
	const { logout } = useAuthentication();

	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={styles.brand}>
				Mini <span>Blog</span>
			</NavLink>

			<ul className={styles.link_list}>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? styles.active : "")}
					>
						Home
					</NavLink>
				</li>
				{
					//Vamos verificar se o usuario esta logado para apresentar ou nao as opcoes de login e cadastro.
					!user && (
						<>
							<li>
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive ? styles.active : ""
									}
								>
									Login
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/cadastro"
									className={({ isActive }) =>
										isActive ? styles.active : ""
									}
								>
									Cadastrar
								</NavLink>
							</li>
						</>
					)
				}
				{
					//Verificando agora se o usuario esta logado.
					user && (
						<>
							<li>
								<NavLink
									to="/posts/create"
									className={({ isActive }) =>
										isActive ? styles.active : ""
									}
								>
									Novo Post
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/dashboard"
									className={({ isActive }) =>
										isActive ? styles.active : ""
									}
								>
									Dashboard
								</NavLink>
							</li>
						</>
					)
				}
				<li>
					<NavLink
						to="/sobre"
						className={({ isActive }) => (isActive ? styles.active : "")}
					>
						Sobre
					</NavLink>
				</li>

				{user && (
					<li>
						<button onClick={logout}>Sair</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
