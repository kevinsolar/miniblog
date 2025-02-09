import styles from "./Dashboard.module.css";

import { Link } from "react-router";

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
   const { user } = useAuthValue()
   const uid = user.uid

   //posts do usuario
   const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

   const deleteDocument = (id) => {

   }

   if (loading) {
      return <p>Carregando...</p>
   }

   return (
      <div>
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
                  <p>Tem posts!</p>
               </div>
               {posts && posts.map((post) => <div key={post.id}>
                  <h3>{post.title}</h3>
                  <div>
                     <Link to={`/posts/${post.id}`} className="btn">
                        Ver
                     </Link>
                     <Link to={`/posts/edit/${post.id}`} className="btn">
                        Editar
                     </Link>
                     <button onClick={() => deleteDocument(id)} className="btn btn-danger">Excluir</button>
                  </div>
               </div>)}
            </>
         )}

      </div>
   )
};

export default Dashboard;
