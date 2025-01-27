import { Link } from "react-router";
import styles from "./Sobre.module.css";

const Sobre = () => {
	return (
		<div className={styles.about}>
			<h2>Sobre nós</h2>
         <p>Este projeto consiste em um blog feito com React + Firebase</p>

         <Link to="/posts/create" className="btn">Novo post</Link>
		</div>
	);
};

export default Sobre;
