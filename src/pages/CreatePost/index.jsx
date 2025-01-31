import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [img, setImg] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState("");
	const [formError, setFormError] = useState("");

   const { user } = useAuthValue()

	const { insertDocument, response } = useInsertDocument("posts");

   const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");

		//validate image URL
      try {
         new URL(img)
      } catch (error) {
         setFormError("A imagem precisa ser uma URL")
      }

		//criar o array de tags
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

		//checar todos os valores
      if(!title || !img || !body || !tags) {
         setFormError("Preencha todos os campos, por favor.")
      }

      if (formError) return;

		insertDocument({
			title,
			img,
			body,
			tagsArray,
         uid: user.uid,
         createdBy: user.displayName,
		});

      //redirect home
      navigate("/");

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

				{!response.loading && <button className="btn">Postar</button>}
				{response.loading && (
					<button className="btn" disabled>
						Aguarde...
					</button>
				)}

				{response.error && <p className="error">{response.error}</p>}
				{formError && <p className="error">{formError}</p>}
			</form>
		</section>
	);
};

export default CreatePost;
