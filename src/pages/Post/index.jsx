import styles from './Posts.module.css'

//hooks
import { useParams } from "react-router";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
   const { id } = useParams();
   const { document: post, loading } = useFetchDocument("posts", id);

   return (
      <div className={styles.post_container}>
         {loading && (
            <h1>Carregando...</h1>
         )}
         {post && (
            <>
               <div className={styles.banner}>
                  <img src={post.img} alt={post.title} />
               </div>
               <div className={styles.title}>
                  <h1>{post.title}</h1>
               </div>
               <div className={styles.content}>
                  <p>{post.body}</p>
                  <h3>Tags:</h3>
                  <div className={styles.tags}>
                     {post.tagsArray.map((tag) => (
                        <p key={tag}>
                           <span>#</span>
                           {tag}
                        </p>
                     ))}
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default Post;
