import styles from "./Dashboard.module.css";

import { Link } from "react-router";

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
   const { user } = useAuthValue()
   const uid = user.uid

   //posts do usuario
   const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

   //criamos a constante com o objeto de deleteDoc do hook, passando a collection do banco de dados -> "posts" para nosso hook
   const { deleteDocument } = useDeleteDocument("posts");

   if (loading) {
      return <p>Carregando...</p>
   }

   return (
      <div className={styles.dashboard}>
         <h2>Dashboard</h2>
         <p>Gerencie os seus posts</p>
         {posts && posts.length === 0 ? (
            <div>
               <p>Não foram encontrados posts</p>
               <Link to="/posts/create" className="btn">Criar primeiro post</Link>
            </div>
         ) : (
            <>
               <div>
                  <p>Aqui você pode ver, alterar ou excluir os posts que já foram feitos por você!</p>
               </div>
               {posts && posts.map((post) => <div key={post.id} className={styles.post}>
                  <h3>{post.title}</h3>
                  <div className={styles.list_buttons}>
                     <Link to={`/posts/${post.id}`} className="btn">
                        Ver
                     </Link>
                     <Link to={`/posts/edit/${post.id}`} className="btn">
                        Editar
                     </Link>
                     <button onClick={() => deleteDocument(post.id)} className="btn btn-danger">Excluir</button>
                  </div>
               </div>)}
            </>
         )}

      </div>
   )
};

export default Dashboard;
