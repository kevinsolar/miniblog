//hooks
import { useParams } from "react-router";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
	const { id } = useParams();
	const { document: post, loading } = useFetchDocument("posts", id);

	return (
		<div>
         {loading && (
            <h1>Carregando...</h1>
         )}
			{post && (
				<>
					<h1>{post.title}</h1>
				</>
			)}
		</div>
	);
};

export default Post;
