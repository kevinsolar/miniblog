import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav>
			<NavLink to="/">
				Mini <span>Blog</span>
			</NavLink>

			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/sobre">Sobre</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
