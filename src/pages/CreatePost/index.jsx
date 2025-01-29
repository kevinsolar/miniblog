import styles from "./CreatePost.module.css";

import { useState } from "react";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [img, setImg] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState("");
	const [formError, setFormError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<section id="postar">
			<div className="title">
				<h1>Criar post</h1>
				<p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
			</div>

			<form onSubmit={handleSubmit} className={styles.create_post}>
				<label>
					<span>Titulo:</span>
					<input
						type="text"
						name="title"
						required
						placeholder="Pense num bom titulo"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</label>
				<label>
					<span>link/url da imagem:</span>
					<input
						type="text"
						name="image"
						required
						placeholder="Insira o link da imagem que você quer para seu post"
						onChange={(e) => setImg(e.target.value)}
						value={img}
					/>
				</label>
				<label>
					<span>Conteudo:</span>
					<textarea
						name="body"
						required
						placeholder="Insira o conteudo do post"
						onChange={(e) => setBody(e.target.value)}
						value={body}
					></textarea>
				</label>
				<label>
					<span>Tags:</span>
					<input
						type="text"
						name="tags"
						required
						placeholder="Insira as Tags para o post, separadas por virgula."
						onChange={(e) => setTags(e.target.value)}
						value={tags}
					/>
				</label>

            <button className="btn">Postar</button>
				{/* {!loading && <button className="btn">Postar</button>}
				{loading && (
					<button className="btn" disabled>
						Aguarde...
					</button>
				)}

				{error && <p className="error">{error}</p>} */}
			</form>
		</section>
	);
};

export default CreatePost;
