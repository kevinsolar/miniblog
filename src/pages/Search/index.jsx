//hooks
import { Link } from "react-router";
import PostDetail from "../../components/PostDetails";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
   const query = useQuery();
   const search = query.get("q");

   const { documents: posts } = useFetchDocuments("posts")

	return (
		<div>
			<h1>Posts encontrados:</h1>

         <div>
            {posts && posts.length === 0 && (
               <>
                  <p>Não foram encontrados posts com sua busca... </p>
                  <Link to="/" className="btn btn-dark">
                     Voltar
                  </Link> 
               </>
            )}
            {posts && posts.map((post) => (
               <PostDetail key={post.id} post={post} />
            ))}
         </div>
		</div>
	);
};

export default Search;
