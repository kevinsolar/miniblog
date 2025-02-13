import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useNavigate, useParams } from "react-router";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
   const { id } = useParams();
   const { document: post } = useFetchDocument("posts", id)

   const [title, setTitle] = useState("");
   const [img, setImg] = useState("");
   const [body, setBody] = useState("");
   const [tags, setTags] = useState("");
   const [formError, setFormError] = useState("");

   useEffect(() => {
      if (post) {
         setTitle(post.title);
         setBody(post.body);
         setImg(post.img);

         const textTags = post.tagsArray.join(", ");
         setTags(textTags);
      }
   }, [post])

   const { user } = useAuthValue()

   const { updateDocument, response } = useUpdateDocument("posts");

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
      if (!title || !img || !body || !tags) {
         setFormError("Preencha todos os campos, por favor.")
      }

      if (formError) return;

      const data = {
         title,
         img,
         body,
         tagsArray,
         uid: user.uid,
         createdBy: user.displayName,
      }

      updateDocument(id, data);

      //redirect home
      navigate("/");

   };

   return (
      <section id="postar">
         {post && (
            <>
               <div className="title">
                  <h1>Editando post: {post.title}</h1>
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
                  <p className={styles.txt_pvw}>Essa é a previsualização da imagem atual:</p>
                  <img
                     className={styles.img_preview}
                     src={post.img}
                     alt={post.title}
                  />
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

                  {!response.loading && <button className="btn">Atualizar</button>}
                  {response.loading && (
                     <button className="btn" disabled>
                        Aguarde...
                     </button>
                  )}

                  {response.error && <p className="error">{response.error}</p>}
                  {formError && <p className="error">{formError}</p>}
               </form>
            </>
         )}
      </section>
   );
};

export default EditPost;
