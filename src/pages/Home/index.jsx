import styles from "./Home.module.css";

//Hooks
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//Componentes
import PostDetail from "../../components/PostDetails";
import { Search } from "lucide-react";

const Home = () => {
	const [query, setQuery] = useState("");
	const { documents: posts, loading } = useFetchDocuments("posts");

   //utilizando o useNavigate a partir de uma variavel.
   const navigate = useNavigate();

   //Tratando a forma que vai se comportar o botão de pesquisa.
	const handleSubmit = (e) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<section id="home" className={styles.home}>
			<h1 className={styles.title}>Veja os nossos posts mais recentes</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Ou busque por tags..."
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
				<button type="submit" className="btn btn-dark">
					<Search />
				</button>
			</form>
			<div>
				<h1>Posts:</h1>
				{loading && <p>Carregando...</p>}
				{posts &&
					posts.map((post) => <PostDetail key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.not_found}>
						<p>Não foram encontrados posts</p>
						<Link to="/posts/create" className="btn">
							Criar um post
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};

export default Home;
